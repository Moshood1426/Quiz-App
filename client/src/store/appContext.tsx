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
  SingleQuiz,
  SingleQuestion,
  editQuizArg,
  questionEdit,
} from "./@types/context";
import ActionType from "./actions";

const user = localStorage.getItem("user");

const initialState: InitialState = {
  showAlert: false,
  alertType: "",
  alertText: "",
  isLoading: false,
  user: user ? JSON.parse(user) : null,
  quiz: [],
  totalQuizNum: 0,
  activities: [],
  manageSingleQuiz: false,
  singleQuizDetails: null,
  singleQuizQuestions: [],
  numOfQuestions: 0,
  editCurrentQuiz: false,
  editQuizDetails: { details: null, questions: null },
  editingQuestion: false,
  questionEdit: {
    type: "",
    question: "",
    correctAnswer: "",
    options: [],
    points: 1,
  },
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

  const validateInput = () => {
    dispatch({ type: ActionType.VALIDATE_INPUT });
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
          activities: data.activities,
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

  const executeEditQuiz = async (quizId: object, quizObj: editQuizArg) => {
    dispatch({ type: ActionType.EXECUTE_EDIT_QUIZ_BEGIN });
    try {
      await axios.patch(`api/v1/quiz/${quizId}`, { ...quizObj });
      dispatch({ type: ActionType.EXECUTE_EDIT_QUIZ_SUCCESS });
      return true;
    } catch (error) {
      let message;
      if (axios.isAxiosError(error)) {
        message = error.response?.data;
      } else {
        message = { msg: "An unexpected error occurred" };
      }
      dispatch({
        type: ActionType.EXECUTE_EDIT_QUIZ_FAILED,
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
      forQuiz: state.editQuizDetails.details?._id,
    };
    console.log(questionObj)
    dispatch({ type: ActionType.CREATE_QUESTION_BEGIN });
    try {
      await axios.post("api/v1/question", questionObj);
      dispatch({type: ActionType.CREATE_QUESTION_SUCCESS})
      return true
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
      clearAlert()
      return false
    }
  };

  const editQuestion = async() => {
    const questionId = localStorage.getItem("questionId")!
    const questionObj = { ...state.questionEdit, questionId: JSON.parse(questionId) }
    try {
      console.log(questionObj)
    } catch (error) {
      
    }
  }

  return (
    <AppContext.Provider
      value={{
        ...state,
        register,
        validateInput,
        login,
        forgotPassword,
        getAllQuiz,
        startManageQuiz,
        endManageQuiz,
        editQuiz,
        setQuestionType,
        deleteQuiz,
        executeEditQuiz,
        setEditQuestion,
        cancelEditQuestion,
        createQuestion,
        editQuestion
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
