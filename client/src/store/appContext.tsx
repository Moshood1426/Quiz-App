import React, { useContext, useReducer, createContext } from "react";
import reducer from "./reducer";
import axios from "axios";
import {
  ContextType,
  registerArgs,
  ContextProps,
  Action,
  User,
  InitialState,
  GetAllQuizArgs,
  editQuizArg,
  questionEdit,
  PublishQuizDetails,
  SingleQuestion,
  resetPasswordArgs,
} from "./@types/context";
import {
  LoginResponse,
  CreateQuizResponse,
  GetQuizQuestionsResponse,
  GetSingleQuizResponse,
  GetAllQuizResponse,
  GetAllParticipantResponse,
  GetQuizSubmissionResponse,
  GetSingleQuizSubmissionRes,
  GetDBQuestionsResponse,
  EditQuizDetailsResponse,
  CheckResultsResponse,
} from "./@types/axiosResponse";
import ActionType from "./actions";
import { shuffleArray } from "../utils/actions";

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
  participantQuizDetails: null,
  participantInfo: null,
  participantQuestions: null,
  singleAnswerLoading: false,
  questionsAnswered: 0,
  limit: 1,
  page: 1,
  quizWithSubmission: [],
  submissionParticipant: { quizId: null, participants: [] },
  displayResult: false,
  participantResult: {
    quizTitle: "",
    quizCode: "",
    pointsObtained: 0,
    pointsObtainable: 0,
    percentage: 0,
    remarks: "",
    firstName: "",
    lastName: "",
    identifier: "",
  },
};

const AppContext = createContext<ContextType | null>(null);

const AppProvider: React.FC<ContextProps> = ({ children }) => {
  const [state, dispatch] = useReducer<
    React.Reducer<typeof initialState, Action>
  >(reducer, initialState);

  //setting up axios instance
  const authFetch = axios.create({
    baseURL: "/api/v1",
    withCredentials: true,
  });

  //axios instance interceptors
  // authFetch.interceptors.request.use(
  //   (config) => {
  //     //config.headers.common["Authorization"] = `Bearer ${state.token}`;
  //     return config;
  //   },
  //   (error) => {
  //     return Promise.reject(error);
  //   }
  // );

  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401) {
        logoutUser();
      }
      if (error.response.status === 500) {
        error.special = { msg: "Something went wrong" };
      }
      return Promise.reject(error);
    }
  );

  const handleAxiosError = (error: any): { msg: string } => {
    console.log(error);
    let message;
    if (axios.isAxiosError(error)) {
      interface Response {
        msg: string;
      }
      message = error.response?.data as Response;
    }
    if (error.special) {
      message = { msg: "Something went wrong, try again later" };
    }
    if (!message) {
      message = { msg: "An unexpected error occurred" };
    }
    return message;
  };

  //throws error if inputs are poorly filled
  const validateInput = (text?: string) => {
    dispatch({ type: ActionType.VALIDATE_INPUT, payload: { text: text } });
    clearAlert();
  };

  //cleanse alert text after 2 secs
  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: ActionType.CLEAR_ALERT });
    }, 2000);
  };

  //adds user to local storage for authentication
  const addUserToLocalStorage = (user: User) => {
    localStorage.setItem("user", JSON.stringify(user));
  };

  //register new user
  const register = async (reqObj: registerArgs) => {
    dispatch({ type: ActionType.AUTH_USER_BEGIN });
    try {
      const { data } = await authFetch.post<LoginResponse>(
        "/auth/register",
        reqObj
      );
      dispatch({ type: ActionType.AUTH_USER_SUCCESS, payload: data.user });
      addUserToLocalStorage(data.user);
    } catch (error) {
      const message = handleAxiosError(error);
      dispatch({ type: ActionType.AUTH_USER_FAILED, payload: { message } });
    }
    clearAlert();
  };

  //login functionality
  const login = async (reqObj: registerArgs) => {
    dispatch({ type: ActionType.AUTH_USER_BEGIN });
    try {
      const { data } = await authFetch.post<LoginResponse>(
        "/auth/login",
        reqObj
      );
      dispatch({ type: ActionType.AUTH_USER_SUCCESS, payload: data.user });
      addUserToLocalStorage(data.user);
    } catch (error) {
      const message = handleAxiosError(error);
      dispatch({ type: ActionType.AUTH_USER_FAILED, payload: { message } });
    }
    clearAlert();
  };

  //forgot-password functionality
  const forgotPassword = async (email: string) => {
    dispatch({ type: ActionType.FORGOT_PASSWORD_BEGIN });

    try {
      interface ForgotPasswordRes {
        msg: string;
      }
      const { data } = await authFetch.post<ForgotPasswordRes>(
        "/auth/forgot-password",
        { email }
      );

      dispatch({
        type: ActionType.FORGOT_PASSWORD_SUCCESS,
        payload: { message: data.msg },
      });
    } catch (error) {
      const message = handleAxiosError(error);
      dispatch({ type: ActionType.AUTH_USER_FAILED, payload: { message } });
    }
    clearAlert();
  };

  const resetPassword = async (reqObj: resetPasswordArgs) => {
    dispatch({ type: ActionType.RESET_PASSWORD_BEGIN });

    try {
      interface ResetPasswordRes {
        msg: string;
      }
      const { data } = await authFetch.post<ResetPasswordRes>(
        `/auth/reset-password?token=${reqObj.token}&email=${reqObj.email}`,
        { ...reqObj }
      );
      dispatch({
        type: ActionType.RESET_PASSWORD_SUCCESS,
        payload: { message: data.msg },
      });
    } catch (error) {
      const message = handleAxiosError(error);
      dispatch({
        type: ActionType.RESET_PASSWORD_FAILED,
        payload: { message },
      });
    }
    clearAlert();
  };

  //create moderated quiz functionality
  const createQuiz = async (quizTitle: string, quizCode: string) => {
    dispatch({ type: ActionType.CREATE_QUIZ_BEGIN });
    const reqObj = { quizCode, quizTitle, quizType: "moderated" };

    try {
      const { data } = await authFetch.post<CreateQuizResponse>(
        "/quiz",
        reqObj
      );

      dispatch({ type: ActionType.CREATE_QUIZ_SUCCESS, payload: data.quiz });
      return true;
    } catch (error) {
      const message = handleAxiosError(error);
      dispatch({
        type: ActionType.CREATE_QUIZ_FAILED,
        payload: message.msg,
      });
      clearAlert();
      return false;
    }
  };

  //get all quiz functionality
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
      const message = handleAxiosError(error);
      dispatch({ type: ActionType.AUTH_USER_FAILED, payload: { message } });
    }
  };

  //get single quiz and its questions
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
      const message = handleAxiosError(error);
      dispatch({
        type: ActionType.GET_SINGLE_QUIZ_FAILED,
        payload: message.msg,
      });
      clearAlert();
    }
  };

  //view single quiz details
  const startManageQuiz = async (quizId: object) => {
    await getSingleQuiz(quizId);
  };

  //end viewing of single quiz details
  const endManageQuiz = () => {
    dispatch({ type: ActionType.MANAGE_SINGLE_QUIZ_END });
  };

  //get all participant for single quiz
  const getAllParticipant = async (quizId: object) => {
    dispatch({ type: ActionType.GET_PARTICIPANT_BEGIN });

    try {
      const { data } = await authFetch.get<GetAllParticipantResponse>(
        `/participant/${quizId}`
      );

      dispatch({
        type: ActionType.GET_PARTICIPANT_SUCCESS,
        payload: data.participant,
      });
    } catch (error) {
      const message = handleAxiosError(error);
      dispatch({
        type: ActionType.GET_PARTICIPANT_FAILED,
        payload: message.msg,
      });
    }
    clearAlert();
  };

  //add participant to quiz
  const addParticipant = async (reqObj: {
    firstName: string;
    lastName: string;
    identifier: string;
    quizId: object;
  }) => {
    dispatch({ type: ActionType.ADD_PARTICIPANT_BEGIN });
    const { firstName, lastName, identifier, quizId } = reqObj;

    try {
      await authFetch.post(`/participant/${quizId}`, {
        firstName,
        lastName,
        identifier,
      });

      getAllParticipant(quizId);
      dispatch({ type: ActionType.ADD_PARTICIPANT_SUCCESS });
    } catch (error) {
      const message = handleAxiosError(error);
      dispatch({
        type: ActionType.ADD_PARTICIPANT_FAILED,
        payload: message.msg,
      });
    }
    clearAlert();
  };

  //delete participant from single quiz
  const deleteParticipant = async (quizId: object, participantId: object) => {
    dispatch({ type: ActionType.DELETE_PARTICIPANT_BEGIN });

    try {
      await authFetch.delete(
        `/participant/${quizId}?participantId=${participantId}`
      );
      getAllParticipant(quizId);
      dispatch({
        type: ActionType.DELETE_PARTICIPANT_SUCCESS,
        payload: "Participant deleted successfully",
      });
    } catch (error) {
      const message = handleAxiosError(error);
      dispatch({
        type: ActionType.DELETE_PARTICIPANT_FAILED,
        payload: message.msg,
      });
    }
    clearAlert();
  };

  //edit single quiz
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
      const message = handleAxiosError(error);
      dispatch({
        type: ActionType.GET_SINGLE_QUIZ_FAILED,
        payload: message.msg,
      });
      clearAlert();
    }
  };

  //edit quiz completed
  const endEditQuiz = () => {
    dispatch({ type: ActionType.EDIT_QUIZ_END });
  };

  //edit quiz details
  const editQuizDetails = async (quizId: object, quizObj: editQuizArg) => {
    dispatch({ type: ActionType.EDIT_QUIZ_DETAILS_BEGIN });

    try {
      const { data } = await authFetch.patch<EditQuizDetailsResponse>(
        `/quiz/${quizId}`,
        { ...quizObj }
      );

      dispatch({
        type: ActionType.EDIT_QUIZ_DETAILS_SUCCESS,
        payload: data.quizDetails,
      });
      return true;
    } catch (error) {
      const message = handleAxiosError(error);
      dispatch({
        type: ActionType.EDIT_QUIZ_DETAILS_FAILED,
        payload: { message },
      });
      clearAlert();
      return false;
    }
  };

  //delete single quiz
  const deleteQuiz = async (quizId: object) => {
    dispatch({ type: ActionType.DELETE_QUIZ_BEGIN });

    try {
      await authFetch.delete(`/quiz/${quizId}`);
      dispatch({ type: ActionType.DELETE_QUIZ_SUCCESS });
    } catch (error) {
      const message = handleAxiosError(error);
      dispatch({
        type: ActionType.EDIT_QUIZ_DETAILS_FAILED,
        payload: { message },
      });
      clearAlert();
    }
  };

  //set type of question to be added
  const setQuestionType = (
    type: "true-false" | "multiple-choice" | "fill-in-gap" | ""
  ) => {
    dispatch({ type: ActionType.SET_QUESTION_TYPE, payload: type });
  };

  //set single question to be edited
  const setEditQuestion = (questionObj: questionEdit, edit?: boolean) => {
    dispatch({
      type: ActionType.SET_EDIT_QUESTION,
      payload: { ...questionObj, edit: edit ? true : false },
    });
  };

  //cancel single question edit
  const cancelEditQuestion = () => {
    dispatch({ type: ActionType.CANCEL_EDIT_QUESTION });
  };

  //create single question
  const createQuestion = async () => {
    const questionObj = {
      ...state.questionEdit,
      forQuiz: state.editSingleQuizDetails.details?._id,
    };
    dispatch({ type: ActionType.CREATE_QUESTION_BEGIN });

    try {
      await authFetch.post("/question", questionObj);
      dispatch({ type: ActionType.CREATE_QUESTION_SUCCESS });
      return true;
    } catch (error) {
      const message = handleAxiosError(error);
      dispatch({
        type: ActionType.CREATE_QUESTION_FAILED,
        payload: { message },
      });
      clearAlert();
      return false;
    }
  };

  //edit single question
  const editQuestion = async () => {
    const questionId = JSON.parse(localStorage.getItem("questionId")!);
    const questionObj = { ...state.questionEdit };
    dispatch({ type: ActionType.EDIT_QUESTION_BEGIN });

    try {
      await authFetch.patch(`/question/${questionId}`, { ...questionObj });
      dispatch({ type: ActionType.EDIT_QUESTION_SUCCESS });
      return true;
    } catch (error) {
      const message = handleAxiosError(error);
      dispatch({
        type: ActionType.EDIT_QUESTION_FAILED,
        payload: { message },
      });
      clearAlert();
      return false;
    }
  };

  //delete single question
  const deleteQuestion = async (quizId: object) => {
    dispatch({ type: ActionType.DELETE_QUESTION_BEGIN });
    try {
      await authFetch.delete(`/question/${quizId}`);
      dispatch({ type: ActionType.DELETE_QUESTION_SUCCESS });
    } catch (error) {
      console.log(error);
    }
  };

  //publish single quiz
  const publishQuiz = async (
    quizId: object,
    publishQuizDetails: PublishQuizDetails
  ) => {
    try {
      await authFetch.patch(`/quiz/publish/${quizId}`, {
        ...publishQuizDetails,
      });
      return true;
    } catch (error) {
      const message = handleAxiosError(error);
      dispatch({
        type: ActionType.PUBLISH_QUIZ_FAILED,
        payload: { message },
      });
    }
    clearAlert();
    return false;
  };

  //get submissions for quiz
  const getAllQuizSubmission = async () => {
    dispatch({ type: ActionType.GET_ALL_QUIZ_SUBMISSION_BEGIN });

    try {
      const { data } = await authFetch.get<GetQuizSubmissionResponse>(
        `/quiz?forSubmission=true`
      );
      dispatch({
        type: ActionType.GET_ALL_QUIZ_SUBMISSION_SUCCESS,
        payload: { quiz: data.quiz },
      });
    } catch (error) {
      logoutUser();
    }
  };

  //get submissions for single quiz
  const getSingleQuizSubmission = async (quizId: object) => {
    dispatch({ type: ActionType.GET_SINGLE_QUIZ_SUBMISSION_BEGIN });

    try {
      const { data } = await authFetch.get<GetSingleQuizSubmissionRes>(
        `/submission/${quizId}`
      );
      dispatch({
        type: ActionType.GET_SINGLE_QUIZ_SUBMISSION_SUCCESS,
        payload: {
          quizId,
          participant: data.participant,
          questions: data.questions,
        },
      });
    } catch (error) {
      logoutUser();
    }
  };

  //go back to all quiz submission
  const resetSingleQuizSubmission = () => {
    dispatch({ type: ActionType.RESET_SINGLE_QUIZ_SUBMISSION });
  };

  //get results for single participant
  const getResults = (participantId: object) => {
    const { participantQuestions, submissionParticipant } = state;

    //checking for the current participant details
    const participant = submissionParticipant.participants.find(
      (item) => item._id === participantId
    );

    //mapping the quiz questions to add client answers
    const questions = state.participantQuestions?.map((item) => {
      const test = participant?.answers.find(
        (answer) => answer.questionId === item._id
      );
      if (test) {
        return { ...item, answer: test.answer };
      } else {
        return { ...item, answer: "" };
      }
    });

    const pointsObtainable = participantQuestions!.reduce((acc, item) => {
      return (acc += item.points);
    }, 0);

    const pointsObtained = questions!.reduce((acc, item) => {
      return item.answer === item.correctAnswer ? (acc += item.points) : acc;
    }, 0);

    //dispatching client answers to be added to singleQuizQuestions
    dispatch({
      type: ActionType.DISPLAY_RESULT,
      payload: {
        questions,
        participant: { ...participant, pointsObtainable, pointsObtained },
      },
    });
  };

  //release results
  const releaseResult = async (quizId: object) => {
    dispatch({ type: ActionType.RELEASE_RESULT_BEGIN });
    try {
      interface ReleaseResultRes {
        msg: string;
      }
      await authFetch.patch<ReleaseResultRes>(`/submission/${quizId}`);
      getAllQuizSubmission();
    } catch (error) {
      //logoutUser();
    }
  };

  const withdrawResult = async (quizId: object) => {
    dispatch({ type: ActionType.RELEASE_RESULT_BEGIN });
    try {
      interface ReleaseResultRes {
        msg: string;
      }
      await authFetch.patch<ReleaseResultRes>(
        `/submission/${quizId}?withdraw=true`
      );
      getAllQuizSubmission();
    } catch (error) {
      //logoutUser();
    }
  };

  //go back to all participant submission for single quiz
  const resetSubmissionParticipant = () => {
    const { participantQuestions } = state;
    const result = participantQuestions!.map((item) => ({
      ...item,
      answer: "",
    }));

    dispatch({
      type: ActionType.RESET_SUBMISSION_PARTICIPANT,
      payload: result,
    });
  };

  const resetDisplayResult = () => {
    dispatch({ type: ActionType.RESET_DISPLAY_RESULT });
  };

  //explore OpenTDI Database for quick quiz
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
    let url = `/api/v1/question/quick?amount=${amount}`;
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

    console.log(url);
    try {
      //get quiz questions from DB
      const {
        data: { data: questions },
      } = await axios.get<GetDBQuestionsResponse>(url);

      //formatting result from DB to fit questions Schema request on backend
      if (questions.results.length < 1) {
        dispatch({
          type: ActionType.CREATE_QUESTION_FAILED,
          payload: {
            message: {
              msg: ` ${amount} questions unavailable. Select any type and any difficulty for more chances of getting questions`,
            },
          },
        });
        clearAlert();
        return false;
      }
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

      //creating quiz from DB
      const { data: quiz } = await authFetch.post<CreateQuizResponse>("/quiz", {
        quizCode,
        quizTitle,
        quizType: "quick",
      });
      const quizId = quiz.quiz._id;

      //creating questions for test with result
      await authFetch.post("/question", {
        forQuiz: quizId,
        multipleData: result,
      });
      startManageQuiz(quizId);
      dispatch({ type: ActionType.EXPLORE_QUIZ_API_SUCCESS });
      return true;
    } catch (error) {
      const message = handleAxiosError(error);
      dispatch({
        type: ActionType.CREATE_QUESTION_FAILED,
        payload: { message },
      });
      clearAlert();
      return false;
    }
  };

  //update user profile
  const updateUser = async (reqObj: {
    firstName: string;
    lastName: string;
    email: string;
  }) => {
    dispatch({ type: ActionType.UPDATE_USER_BEGIN });

    try {
      const { data } = await authFetch.patch<LoginResponse>(
        "/auth/updateUser",
        reqObj
      );
      dispatch({ type: ActionType.UPDATE_USER_SUCCESS, payload: data.user });
      addUserToLocalStorage(data.user);
    } catch (error) {
      const message = handleAxiosError(error);
      dispatch({ type: ActionType.UPDATE_USER_FAILED, payload: { message } });
    }
    clearAlert();
  };

  //update password
  const updatePassword = async (reqObj: {
    newPassword: string;
    confirmNewPassword: string;
  }) => {
    dispatch({ type: ActionType.UPDATE_PASSWORD_BEGIN });

    try {
      const { data } = await authFetch.patch("/auth/updatePassword", reqObj);
      dispatch({ type: ActionType.UPDATE_PASSWORD_SUCCESS, payload: data.msg });
    } catch (error) {
      const message = handleAxiosError(error);
      dispatch({
        type: ActionType.UPDATE_PASSWORD_FAILED,
        payload: { message },
      });
    }
    clearAlert();
  };

  const deleteAccount = async () => {
    dispatch({ type: ActionType.DELETE_ACCOUNT_BEGIN });
    try {
      await authFetch.delete("/auth/deleteAccount");
      logoutUser();
    } catch (error) {
      logoutUser();
    }
  };

  /* 
    -- Participant Take Test Functionalities Begin --
  */

  const getTestBegin = async (quizCode: string) => {
    dispatch({ type: ActionType.GET_TEST_BEGIN });

    try {
      const { data } = await axios.get<GetSingleQuizResponse>(
        `/api/v1/participant?quizCode=${quizCode}`
      );
      dispatch({
        type: ActionType.GET_TEST_SUCCESS,
        payload: data.quiz,
      });
    } catch (error) {
      const message = handleAxiosError(error);
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
      const { data } = await axios.post(`/api/v1/participant`, {
        ...reqObj,
      });
      dispatch({
        type: ActionType.AUTHORIZE_PARTICIPANT_SUCCESS,
        payload: data.user,
      });
      localStorage.setItem("participant", JSON.stringify(data.user));
    } catch (error) {
      const message = handleAxiosError(error);
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
          questionsAnswered: data.questionsAnswered,
        },
      });
    } catch (error) {
      const message = handleAxiosError(error);
      dispatch({
        type: ActionType.AUTHORIZE_PARTICIPANT_FAILED,
        payload: message,
      });
      clearAlert();
    }
  };

  const pickAnswer = (answer: string) => {
    dispatch({ type: ActionType.PICK_ANSWER, payload: answer });
  };

  const setQuestionAnswer = async () => {
    dispatch({ type: ActionType.SET_QUESTION_ANSWER_BEGIN });

    const questionId = state.participantQuestions
      ? state.participantQuestions[0]._id
      : null;

    const answer = state.participantQuestions
      ? state.participantQuestions[0].answer
      : null;

    console.log(questionId, answer);

    if (!answer || !questionId) {
      validateInput(
        "Kindly select an answer or click next to access next question"
      );
      clearAlert();
      return;
    }

    try {
      const { data } = await axios.post(`/api/v1/participant/take-test`, {
        answers: { questionId, answer },
      });

      dispatch({
        type: ActionType.SET_QUESTION_ANSWER_SUCCESS,
        payload: {
          questionsAnswered: data.questionsAnswered,
        },
      });
      const number = state.page < state.numOfQuestions ? state.page + 1 : 1;
      changeQuestionPage(number);
    } catch (error) {
      const message = handleAxiosError(error);
      dispatch({
        type: ActionType.AUTHORIZE_PARTICIPANT_FAILED,
        payload: message,
      });
      clearAlert();
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
      console.log(data);
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
      const message = handleAxiosError(error);
      dispatch({
        type: ActionType.AUTHORIZE_PARTICIPANT_FAILED,
        payload: message,
      });
      clearAlert();
    }
  };

  const endTest = async () => {
    try {
      await axios.patch(`/api/v1/participant/take-test`);
    } catch (error) {
      console.log(error);
    }
    localStorage.removeItem("participant");
    dispatch({ type: ActionType.LOGOUT_PARTICIPANT });
  };

  const endSession = async () => {
    try {
      await authFetch.get("/auth/logout");
      logoutUser();
    } catch (error) {
      const message = handleAxiosError(error);
      dispatch({
        type: ActionType.GET_SINGLE_QUIZ_FAILED,
        payload: message.msg,
      });
      clearAlert();
    }
  };

  const logoutUser = () => {
    localStorage.removeItem("user");
    dispatch({ type: ActionType.LOGOUT_USER });
  };

  /* 
    -- Check Results Functionalities Begin --
  */

  const checkResults = async (quizCode: string, identifier: string) => {
    dispatch({ type: ActionType.CHECK_RESULTS_BEGIN });
    try {
      const { data } = await axios.post<CheckResultsResponse>(
        `/api/v1/participant/check-results`,
        {
          quizCode,
          identifier,
        }
      );
      const { participant, quiz, questions } = data;

      const result = questions.map((item) => {
        const test = participant.answers.find(
          (answer) => answer.questionId === item._id
        );
        if (test) {
          return { ...item, answer: test.answer };
        } else {
          return { ...item, answer: "" };
        }
      });

      const pointsObtainable = questions.reduce((acc, item) => {
        return (acc += item.points);
      }, 0);

      const pointsObtained = result.reduce((acc, item) => {
        return item.answer === item.correctAnswer ? (acc += item.points) : acc;
      }, 0);

      const percentage = Math.round((pointsObtained / pointsObtainable) * 100);

      const remarks =
        percentage > 75
          ? "Excellent"
          : percentage > 50
          ? "Very Good"
          : percentage > 35
          ? "Good"
          : "Try Harder";

      dispatch({
        type: ActionType.CHECK_RESULTS_SUCCESS,
        payload: {
          quizTitle: quiz.quizTitle,
          quizCode: quiz.quizCode,
          pointsObtained,
          pointsObtainable,
          percentage,
          remarks,
          firstName: participant.firstName,
          lastName: participant.lastName,
          identifier: participant.identifier,
        },
      });
    } catch (error) {
      const message = handleAxiosError(error);
      dispatch({
        type: ActionType.CHECK_RESULTS_FAILED,
        payload: message.msg,
      });
      clearAlert();
    }
  };

  const resetCheckResults = () => {
    dispatch({ type: ActionType.RESET_CHECK_RESULTS });
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        register,
        validateInput,
        login,
        forgotPassword,
        resetPassword,
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
        releaseResult,
        withdrawResult,
        resetSingleQuizSubmission,
        resetSubmissionParticipant,
        getResults,
        resetDisplayResult,
        exploreQuizAPI,
        updateUser,
        updatePassword,
        deleteAccount,
        logoutUser,
        pickAnswer,
        checkResults,
        resetCheckResults,
        endSession,
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
