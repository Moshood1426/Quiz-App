import React, { useContext, useReducer, createContext } from "react";
import reducer from "./reducer";
import axios from "axios";
import {
  ContextType,
  registerArgs,
  ContextProps,
  Action,
  LoginResponse,
  User,
  InitialState,
  GetAllQuizArgs,
  GetAllQuizResponse,
  GetQuizQuestionsResponse,
  GetSingleQuizResponse,
  editQuizArg,
  questionEdit,
  PublishQuizDetails,
  SingleQuestion,
  SingleQuiz,
} from "./@types/context";
import ActionType from "./actions";

const user = localStorage.getItem("user");
const authorizeParticipant = localStorage.getItem("participant");

const initialState: InitialState = {
  showAlert: false,
  alertType: "",
  alertText: "",
  isLoading: false,
  user: user ? JSON.parse(user) : null,
  quiz: null,
  totalQuizNum: 0,
  manageSingleQuiz: false,
  singleQuizDetails: null,
  singleQuizQuestions: [],
  singleQuizParticipants: [],
  quizParticipantsLoading: false,
  numOfQuestions: 0,
  editCurrentQuiz: false,
  editSingleQuizDetails: { details: null, questions: null },
  editingQuestion: false,
  questionEdit: {
    type: "",
    question: "",
    correctAnswer: "",
    options: [],
    points: 1,
  },
  validateParticipant: authorizeParticipant
    ? JSON.parse(authorizeParticipant)
    : null,
  participantInfo: null,
  participantQuestions: null,
  limit: 5,
  page: 1,
  quizWithSubmission: [],
  submissionParticipant: { quizId: null, participants: [] },
  displayResult: false,
};

const AppContext = createContext<ContextType | null>(null);

const AppProvider: React.FC<ContextProps> = ({ children }) => {
  const [state, dispatch] = useReducer<
    React.Reducer<typeof initialState, Action>
  >(reducer, initialState);

  const authFetch = axios.create({
    baseURL: "api/v1",
    withCredentials: true,
  });

  /* authFetch.interceptors.request.use(
    (request) => {
    },
    (error) => {
      Promise.reject(error);
    }
  ); */

  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401) {
        //logoutUser()
      }
      Promise.reject(error);
    }
  );

  const validateInput = (text?: string) => {
    dispatch({ type: ActionType.VALIDATE_INPUT, payload: { text: text } });
    clearAlert();
  };

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: ActionType.CLEAR_ALERT });
    }, 2000);
  };

  const addUserToLocalStorage = (user: User) => {
    localStorage.setItem("user", JSON.stringify(user));
  };

  //register functionality
  const register = async (reqObj: registerArgs) => {
    dispatch({ type: ActionType.AUTH_USER_BEGIN });
    try {
      const { data } = await axios.post<LoginResponse>(
        "/api/v1/auth/register",
        reqObj
      );
      dispatch({ type: ActionType.AUTH_USER_SUCCESS, payload: data.user });
      addUserToLocalStorage(data.user);
    } catch (error) {
      let message;
      if (axios.isAxiosError(error)) {
        message = error.response?.data;
      } else {
        message = { msg: "An unexpected error occurred" };
      }
      dispatch({ type: ActionType.AUTH_USER_FAILED, payload: { message } });
    }
    clearAlert();
  };

  //login functionality
  const login = async (reqObj: registerArgs) => {
    dispatch({ type: ActionType.AUTH_USER_BEGIN });
    try {
      const { data } = await axios.post<LoginResponse>(
        "/api/v1/auth/login",
        reqObj
      );
      dispatch({ type: ActionType.AUTH_USER_SUCCESS, payload: data.user });
      addUserToLocalStorage(data.user);
    } catch (error) {
      let message;
      if (axios.isAxiosError(error)) {
        message = error.response?.data;
      } else {
        message = { msg: "An unexpected error occurred" };
      }
      dispatch({ type: ActionType.AUTH_USER_FAILED, payload: { message } });
    }
    clearAlert();
  };

  //forgot-password functionality
  const forgotPassword = async (email: string) => {
    console.log(email);
  };

  //create quiz functionality
  const createQuiz = async (quizTitle: string, quizCode: string) => {
    dispatch({ type: ActionType.CREATE_QUIZ_BEGIN });
    const reqObj = { quizCode, quizTitle, quizType: "moderated" };
    console.log(reqObj);
    try {
      const { data } = await axios.post("/api/v1/quiz", reqObj);
      dispatch({ type: ActionType.CREATE_QUIZ_SUCCESS, payload: data.quiz });
      return true;
    } catch (error) {
      let message: any;
      if (axios.isAxiosError(error)) {
        message = error.response?.data;
      } else {
        message = { msg: "An unexpected error occurred" };
      }
      console.log(message.msg);
      dispatch({
        type: ActionType.CREATE_QUIZ_FAILED,
        payload: message.msg,
      });
      clearAlert();
      return false;
    }
  };

  //get-all-quiz functionality
  const getAllQuiz = async (reqObj: GetAllQuizArgs) => {
    const { title, code, type, sort, privacy } = reqObj;

    dispatch({ type: ActionType.GET_QUIZ_BEGIN });
    try {
      const { data } = await authFetch.get<GetAllQuizResponse>(
        `/quiz?title=${title}&code=${code}&type=${type}&sort=${sort}&privacy=${privacy}`
      );
      dispatch({
        type: ActionType.GET_QUIZ_SUCCESS,
        payload: {
          quiz: data.quiz,
          totalQuizNum: data.numOfQuiz,
        },
      });
    } catch (error) {
      let message;
      if (axios.isAxiosError(error)) {
        message = error.response?.data;
      } else {
        message = { msg: "An unexpected error occurred" };
      }
      console.log(message);
    }
  };

  const startManageQuiz = async (quizId: object) => {
    await getSingleQuiz(quizId);
  };

  const endManageQuiz = () => {
    dispatch({ type: ActionType.MANAGE_SINGLE_QUIZ_END });
  };

  //get single quiz and its questions functionality
  const getSingleQuiz = async (quizId: object) => {
    dispatch({ type: ActionType.GET_SINGLE_QUIZ_BEGIN });

    try {
      //fetching quiz
      const { data: quiz } = await authFetch.get<GetSingleQuizResponse>(
        `/quiz/${quizId}`
      );
      dispatch({
        type: ActionType.GET_SINGLE_QUIZ_SUCCESS,
        payload: quiz.quiz,
      });
      //fetching quiz questions
      const { data } = await authFetch.get<GetQuizQuestionsResponse>(
        `/question/${quizId}`
      );
      dispatch({
        type: ActionType.GET_QUIZ_QUESTIONS_SUCCESS,
        payload: {
          questions: data.questions,
          totalQuestions: data.totalQuestions,
        },
      });
      getAllParticipant(quizId);
    } catch (error) {
      let message: any;
      if (axios.isAxiosError(error)) {
        message = error.response?.data;
      } else {
        message = { msg: "An unexpected error occurred" };
      }
      dispatch({
        type: ActionType.GET_SINGLE_QUIZ_FAILED,
        payload: message.msg,
      });
    }
  };

  const addParticipant = async (reqObj: {
    firstName: string;
    lastName: string;
    identifier: string;
    quizId: object;
  }) => {
    dispatch({ type: ActionType.ADD_PARTICIPANT_BEGIN });
    const { firstName, lastName, identifier, quizId } = reqObj;
    try {
      const { data } = await axios.post(`/api/v1/participant/${quizId}`, {
        firstName,
        lastName,
        identifier,
      });
      getAllParticipant(quizId);
    } catch (error) {
      let message: any;
      if (axios.isAxiosError(error)) {
        message = error.response?.data;
      } else {
        message = { msg: "An unexpected error occurred" };
      }
      dispatch({
        type: ActionType.ADD_PARTICIPANT_FAILED,
        payload: message.msg,
      });
    }
  };

  const getAllParticipant = async (quizId: object) => {
    dispatch({ type: ActionType.GET_PARTICIPANT_BEGIN });
    try {
      const { data } = await axios.get(`/api/v1/participant/${quizId}`);

      dispatch({
        type: ActionType.GET_PARTICIPANT_SUCCESS,
        payload: data.participant,
      });
    } catch (error) {
      let message: any;
      if (axios.isAxiosError(error)) {
        message = error.response?.data;
      } else {
        message = { msg: "An unexpected error occurred" };
      }
      dispatch({
        type: ActionType.GET_PARTICIPANT_FAILED,
        payload: message.msg,
      });
    }
  };

  const deleteParticipant = async (quizId: object, participantId: object) => {
    dispatch({ type: ActionType.DELETE_PARTICIPANT_BEGIN });
    try {
      const { data } = await axios.delete(
        `/api/v1/participant/${quizId}?participantId=${participantId}`
      );
      getAllParticipant(quizId);
      dispatch({
        type: ActionType.DELETE_PARTICIPANT_SUCCESS,
        payload: data.msg,
      });
    } catch (error) {
      let message: any;
      if (axios.isAxiosError(error)) {
        message = error.response?.data;
      } else {
        message = { msg: "An unexpected error occurred" };
      }
      dispatch({
        type: ActionType.DELETE_PARTICIPANT_FAILED,
        payload: message.msg,
      });
    }
  };

  const editQuiz = async (quizId: object) => {
    dispatch({ type: ActionType.EDIT_QUIZ_BEGIN });

    try {
      const { data: quiz } = await authFetch.get<GetSingleQuizResponse>(
        `/quiz/${quizId}`
      );
      const { data } = await authFetch.get<GetQuizQuestionsResponse>(
        `/question/${quizId}`
      );

      dispatch({
        type: ActionType.EDIT_QUIZ_SUCCESS,
        payload: { questions: data.questions, details: quiz.quiz },
      });
    } catch (error) {
      console.log(error);
      //logoutUser()
    }
  };

  const endEditQuiz = () => {
    dispatch({ type: ActionType.EDIT_QUIZ_END });
  };

  const editQuizDetails = async (quizId: object, quizObj: editQuizArg) => {
    dispatch({ type: ActionType.EDIT_QUIZ_DETAILS_BEGIN });
    try {
      await axios.patch(`api/v1/quiz/${quizId}`, { ...quizObj });
      dispatch({ type: ActionType.EDIT_QUIZ_DETAILS_SUCCESS });
      return true;
    } catch (error) {
      let message;
      if (axios.isAxiosError(error)) {
        message = error.response?.data;
      } else {
        message = { msg: "An unexpected error occurred" };
      }
      dispatch({
        type: ActionType.EDIT_QUIZ_DETAILS_FAILED,
        payload: { message },
      });
      clearAlert();
      return false;
    }
  };

  const deleteQuiz = async (quizId: object) => {
    dispatch({ type: ActionType.DELETE_QUIZ_BEGIN });

    try {
      await authFetch.delete(`/quiz/${quizId}`);
      dispatch({ type: ActionType.DELETE_QUIZ_SUCCESS });
    } catch (error) {
      console.log(error);
      //logoutUser()
    }
  };

  const setQuestionType = (
    type: "true-false" | "multiple-choice" | "fill-in-gap" | ""
  ) => {
    dispatch({ type: ActionType.SET_QUESTION_TYPE, payload: type });
  };

  const setEditQuestion = (questionObj: questionEdit, edit?: boolean) => {
    dispatch({
      type: ActionType.SET_EDIT_QUESTION,
      payload: { ...questionObj, edit: edit ? true : false },
    });
  };

  const cancelEditQuestion = () => {
    dispatch({ type: ActionType.CANCEL_EDIT_QUESTION });
  };

  const createQuestion = async () => {
    const questionObj = {
      ...state.questionEdit,
      forQuiz: state.editSingleQuizDetails.details?._id,
    };
    dispatch({ type: ActionType.CREATE_QUESTION_BEGIN });
    try {
      await axios.post("api/v1/question", questionObj);
      dispatch({ type: ActionType.CREATE_QUESTION_SUCCESS });
      return true;
    } catch (error) {
      let message: any;
      if (axios.isAxiosError(error)) {
        message = error.response?.data;
      } else {
        message = { msg: "An unexpected error occurred" };
      }
      dispatch({
        type: ActionType.CREATE_QUESTION_FAILED,
        payload: { message },
      });
      clearAlert();
      return false;
    }
  };

  const editQuestion = async () => {
    const questionId = JSON.parse(localStorage.getItem("questionId")!);
    const questionObj = { ...state.questionEdit };
    dispatch({ type: ActionType.EDIT_QUESTION_BEGIN });
    try {
      await axios.patch(`/api/v1/question/${questionId}`, { ...questionObj });
      dispatch({ type: ActionType.EDIT_QUESTION_SUCCESS });
      return true;
    } catch (error) {
      let message: any;
      if (axios.isAxiosError(error)) {
        message = error.response?.data;
      } else {
        message = { msg: "An unexpected error occurred" };
      }
      dispatch({
        type: ActionType.EDIT_QUESTION_FAILED,
        payload: { message },
      });
      clearAlert();
      return false;
    }
  };

  const deleteQuestion = async (quizId: object) => {
    dispatch({ type: ActionType.DELETE_QUESTION_BEGIN });
    try {
      await authFetch.delete(`/question/${quizId}`);
      dispatch({ type: ActionType.DELETE_QUESTION_SUCCESS });
    } catch (error) {
      console.log(error);
      //logoutUser()
    }
  };

  const publishQuiz = async (
    quizId: object,
    publishQuizDetails: PublishQuizDetails
  ) => {
    try {
      await axios.patch(`/api/v1/quiz/publish/${quizId}`, {
        ...publishQuizDetails,
      });
      return true;
    } catch (error) {
      let message: any;
      if (axios.isAxiosError(error)) {
        message = error.response?.data;
      } else {
        message = { msg: "An unexpected error occurred" };
      }
      dispatch({
        type: ActionType.PUBLISH_QUIZ_FAILED,
        payload: { message },
      });
    }
    clearAlert();
    return false;
  };

  const getTestBegin = async (quizCode: string) => {
    dispatch({ type: ActionType.GET_TEST_BEGIN });

    try {
      const { data } = await axios.get<GetSingleQuizResponse>(
        `/api/v1/participant?quizCode=${quizCode}`
      );
      dispatch({
        type: ActionType.GET_SINGLE_QUIZ_SUCCESS,
        payload: data.quiz,
      });
    } catch (error) {
      let message: any;
      if (axios.isAxiosError(error)) {
        message = error.response?.data;
      } else {
        message = { msg: "An unexpected error occurred" };
      }
      dispatch({
        type: ActionType.GET_TEST_FAILED,
        payload: message,
      });
      clearAlert();
    }
  };

  const authorizeParticipant = async (reqObj: {
    quizId: object;
    privacy: boolean;
    identifier: string;
    firstName?: string;
    lastName?: string;
  }) => {
    dispatch({ type: ActionType.AUTHORIZE_PARTICIPANT_BEGIN });

    try {
      const { data } = await axios.post("/api/v1/participant", { ...reqObj });
      dispatch({
        type: ActionType.AUTHORIZE_PARTICIPANT_SUCCESS,
        payload: data.user,
      });
      localStorage.setItem("participant", JSON.stringify(data.user));
    } catch (error) {
      let message;
      if (axios.isAxiosError(error)) {
        message = error.response?.data;
      } else {
        message = { msg: "An unexpected error occurred" };
      }
      dispatch({
        type: ActionType.AUTHORIZE_PARTICIPANT_FAILED,
        payload: message,
      });
      clearAlert();
    }
  };

  const getParticipantQuizInfo = async () => {
    const limit = state.limit;
    const page = state.page;
    dispatch({ type: ActionType.GET_PARTICIPANT_QUIZ_INFO_BEGIN });
    try {
      const { data } = await authFetch.get(
        `/participant/take-test?limit=${limit}&page=${page}&result=all`
      );
      const { quiz, questions, totalQuestions, participant } = data;
      const participantQuestions = questions.map((item: SingleQuestion) => {
        if (participant.answers.length < 1) return { ...item, answer: "" };
        const result = participant.answers.find(
          (answer: { questionId: object; _id: object; answer: string }) =>
            answer.questionId === item._id
        );
        if (!result) return { ...item, answer: "" };
        return { ...item, answer: result.answer };
      });
      dispatch({
        type: ActionType.GET_PARTICIPANT_QUIZ_INFO_SUCCESS,
        payload: {
          numOfQuestions: totalQuestions,
          quiz,
          participantQuestions,
          participant,
        },
      });
    } catch (error) {
      console.log(error);
      //logoutUser()
    }
  };

  const setQuestionAnswer = async (questionId: object, answer: string) => {
    const result = state.participantQuestions?.map((item) => {
      if (item._id == questionId) {
        return { ...item, answer };
      }
      return { ...item };
    });

    try {
      await axios.post("/api/v1//participant/take-test", {
        answers: { questionId, answer },
      });
      dispatch({
        type: ActionType.SET_FILL_GAP_ANSWER,
        payload: result,
      });
    } catch (error) {
      console.log(error);
      //endTest()
    }
  };

  const changeQuestionPage = async (page: number) => {
    if (page === state.page) return;
    // dispatch({ type: ActionType.CHANGE_PAGE_BEGIN, payload: page });
    try {
      const { data } = await authFetch.get(
        `/participant/take-test?limit=${state.limit}&page=${page}&result=questions`
      );
      const { questions, participant } = data;
      const participantQuestions = questions.map((item: SingleQuestion) => {
        if (participant.answers.length < 1) return { ...item, answer: "" };
        const result = participant.answers.find(
          (answer: { questionId: object; _id: object; answer: string }) =>
            answer.questionId === item._id
        );
        if (!result) return { ...item, answer: "" };
        return { ...item, answer: result.answer };
      });
      dispatch({
        type: ActionType.CHANGE_PAGE_SUCCESS,
        payload: {
          participantQuestions,
          page: page,
        },
      });
    } catch (error) {
      console.log(error);
      //endTest()
    }
  };

  const endTest = async () => {
    try {
      await axios.patch("/api/v1/participant/take-test");
    } catch (error) {
      console.log(error);
    }
    localStorage.removeItem("participant");
    dispatch({ type: ActionType.LOGOUT_PARTICIPANT });
  };

  const getAllQuizSubmission = async () => {
    dispatch({ type: ActionType.GET_ALL_QUIZ_SUBMISSION_BEGIN });

    try {
      const { data } = await authFetch.get(`/quiz?forSubmission=true`);
      dispatch({
        type: ActionType.GET_ALL_QUIZ_SUBMISSION_SUCCESS,
        payload: { quiz: data.quiz },
      });
    } catch (error) {
      console.log(error);
      //logoutUser()
    }
  };

  const getSingleQuizSubmission = async (quizId: object) => {
    dispatch({ type: ActionType.GET_SINGLE_QUIZ_SUBMISSION_BEGIN });

    try {
      const { data } = await axios.get(`/api/v1/submission/${quizId}`);
      dispatch({
        type: ActionType.GET_SINGLE_QUIZ_SUBMISSION_SUCCESS,
        payload: {
          quizId,
          participant: data.participant,
          questions: data.questions,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const resetSubmissionParticipant = () => {
    dispatch({ type: ActionType.RESET_SUBMISSION_PARTICIPANT });
  };

  const getResults = (participantId: object) => {
    //checking for the current participant details
    const participant = state.submissionParticipant.participants.find(
      (item) => (item._id = participantId)
    );

    //mapping the quiz questions to add client answers
    const result = state.participantQuestions?.map((item) => {
      const test = participant?.answers.find(
        (answer) => answer.questionId === item._id
      );
      if (test) {
        return { ...item, answer: test.answer };
      } else {
        return { ...item, answer: "" };
      }
    });

    //dispatching client answers to be added to singleQuizQuestions
    dispatch({ type: ActionType.DISPLAY_RESULT, payload: { result } });
  };

  const resetDisplayResult = () => {
    dispatch({ type: ActionType.RESET_DISPLAY_RESULT });
  };

  const shuffleArray = (array: (string | number)[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const exploreQuizAPI = async (data: {
    quizCode: string;
    quizTitle: string;
    type: string;
    difficulty: string;
    category: number;
    amount: number;
  }) => {
    dispatch({ type: ActionType.EXPLORE_QUIZ_API_BEGIN });
    const { quizCode, quizTitle, type, difficulty, category, amount } = data;

    //conjuring the URL together
    let url = `https://opentdb.com/api.php?encode=url3986&amount=${amount}`;
    if (category > 8) {
      url = url + `&category=${category}`;
    }
    if (type !== "any type") {
      const result = type === "Multiple Choice" ? "multiple" : "boolean";
      url += `&type=${result}`;
    }
    if (difficulty !== "any difficulty") {
      url += `&difficulty=${difficulty}`;
    }

    try {
      //creating quiz from DB
      interface CreateQuizResponse {
        msg: string;
        quiz: SingleQuiz;
      }
      const { data: quiz } = await axios.post<CreateQuizResponse>(
        "/api/v1/quiz",
        {
          quizCode,
          quizTitle,
          quizType: "quick",
        }
      );
      const quizId = quiz.quiz._id;

      //creating quiz questions
      interface GetQuestionsResponse {
        response_code: number;
        results: {
          category: string;
          type: string;
          difficulty: string;
          question: string;
          correct_answer: string;
          incorrect_answers: string[];
        }[];
      }
      const { data: questions } = await axios.get<GetQuestionsResponse>(url);

      //formatting result from DB to fit questions Schema request on backend
      const result = questions.results.map((item) => {
        const options = item.incorrect_answers.map((item) =>
          decodeURIComponent(item)
        );
        const correctAnswer = decodeURIComponent(item.correct_answer);
        let result = {
          correctAnswer: correctAnswer,
          options: shuffleArray([...options, correctAnswer]),
          points: 1,
          question: decodeURIComponent(item.question),
          type: item.type === "multiple" ? "multiple-choice" : "true-false",
        };
        return result;
      });

      //creating questions for test with result
      const { data } = await axios.post("api/v1/question", {
        forQuiz: quizId,
        multipleData: result,
      });
      startManageQuiz(quizId);
      dispatch({ type: ActionType.EXPLORE_QUIZ_API_SUCCESS });
      return true;
    } catch (error) {
      let message: any;
      if (axios.isAxiosError(error)) {
        message = error.response?.data;
      } else {
        message = { msg: "An unexpected error occurred" };
      }
      dispatch({
        type: ActionType.CREATE_QUESTION_FAILED,
        payload: { message },
      });
      clearAlert();
      return false;
    }
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        register,
        validateInput,
        login,
        forgotPassword,
        createQuiz,
        getAllQuiz,
        addParticipant,
        getAllParticipant,
        deleteParticipant,
        startManageQuiz,
        endManageQuiz,
        editQuiz,
        endEditQuiz,
        setQuestionType,
        deleteQuiz,
        editQuizDetails,
        setEditQuestion,
        cancelEditQuestion,
        createQuestion,
        editQuestion,
        deleteQuestion,
        publishQuiz,
        getTestBegin,
        authorizeParticipant,
        getParticipantQuizInfo,
        setQuestionAnswer,
        changeQuestionPage,
        endTest,
        getAllQuizSubmission,
        getSingleQuizSubmission,
        resetSubmissionParticipant,
        getResults,
        resetDisplayResult,
        exploreQuizAPI,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext) as ContextType;
};

export default useAppContext;
export { AppProvider, initialState };
