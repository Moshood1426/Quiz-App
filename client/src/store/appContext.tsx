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
} from "./@types/context";
import ActionType from "./actions";

const user = localStorage.getItem("user");
const editQuiz = localStorage.getItem("edit_quiz");

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
  editCurrentQuiz: editQuiz ? true : false,
  editQuizDetails: editQuiz
    ? JSON.parse(editQuiz)
    : { details: null, questions: null },
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
    }, 1500);
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

  const editQuiz = (details: SingleQuiz, questions: SingleQuestion[]) => {
    dispatch({ type: ActionType.EDIT_QUIZ, payload: { details, questions } });
    localStorage.setItem("edit_quiz", JSON.stringify({ details, questions }));
  };

  const setQuestionType = (
    type: "true-false" | "multiple-choice" | "fill-in-gap" | ""
  ) => {
    dispatch({ type: ActionType.SET_QUESTION_TYPE, payload: type });
  };

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
