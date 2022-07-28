import ActionType from "./actions";
import { initialState } from "./appContext";
import { Action } from "./@types/context";

const reducer: React.Reducer<typeof initialState, Action> = (state, action) => {
  //return {...state}
  if (action.type === ActionType.VALIDATE_INPUT) {
    return {
      ...state,
      showAlert: true,
      alertType: "danger",
      alertText: "Kindly input necesary values",
    };
  }
  if (action.type === ActionType.CLEAR_ALERT) {
    return {
      ...state,
      showAlert: false,
      alertType: "",
      alertText: "",
    };
  }
  if (action.type === ActionType.AUTH_USER_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === ActionType.AUTH_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      user: action.payload,
    };
  }
  if (action.type === ActionType.AUTH_USER_FAILED) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertText: action.payload.message.msg,
      alertType: "danger",
    };
  }
  if (action.type === ActionType.GET_QUIZ_BEGIN) {
    return {
      ...state,
      isLoading: true,
      editCurrentQuiz: false,
      editQuizDetails: { details: null, questions: null },
    };
  }
  if (action.type === ActionType.GET_QUIZ_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      quiz: action.payload.quiz,
      activities: action.payload.activities,
      totalQuizNum: action.payload.totalQuizNum,
    };
  }
  if (action.type === ActionType.GET_SINGLE_QUIZ_BEGIN) {
    return {
      ...state,
      isLoading: true,
      editCurrentQuiz: false,
      editQuizDetails: { details: null, questions: null },
    };
  }
  if (action.type === ActionType.GET_SINGLE_QUIZ_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      manageSingleQuiz: true,
      singleQuizDetails: action.payload,
    };
  }
  if (action.type === ActionType.GET_SINGLE_QUIZ_FAILED) {
    return {
      ...state,
      isLoading: false,
      manageSingleQuiz: true,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload,
    };
  }
  if (action.type === ActionType.GET_QUIZ_QUESTIONS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      singleQuizQuestions: action.payload.questions,
      numOfQuestions: action.payload.totalQuestions,
    };
  }
  if (action.type === ActionType.MANAGE_SINGLE_QUIZ_END) {
    return {
      ...state,
      manageSingleQuiz: false,
      singleQuizDetails: null,
      singleQuizQuestions: [],
      numOfQuestions: 0,
      showAlert: false,
      alertText: "",
      alertType: "",
    };
  }
  if (action.type === ActionType.EDIT_QUIZ) {
    //const editQuiz = localStorage.getItem("edit_quiz")
    return {
      ...state,
      isLoading: false,
      editCurrentQuiz: true,
      editQuizDetails: action.payload,
    };
  }
  if (action.type === ActionType.DELETE_QUIZ_BEGIN) {
    return {
      ...state,
      isLoading: true
    }
  }
  if(action.type === ActionType.DELETE_QUIZ_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      manageSingleQuiz: false,
      singleQuizDetails: null,
      singleQuizQuestions: [],
      numOfQuestions: 0,
    }
  }
  if(action.type === ActionType.SET_QUESTION_TYPE) {
    return {
      ...state,
      questionEdit: {...state.questionEdit, type: action.payload}
    }
  }
  throw new Error(`no such action : ${action.type}`);
};

export default reducer;
