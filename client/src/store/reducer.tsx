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
      alertText: action.payload.text
        ? action.payload.text
        : "Kindly input necesary values",
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
      manageSingleQuiz: true,
      editCurrentQuiz: false,
      editQuizDetails: { details: null, questions: null },
    };
  }
  if (action.type === ActionType.GET_SINGLE_QUIZ_SUCCESS) {
    return {
      ...state,
      isLoading: false,
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
  if (action.type === ActionType.EDIT_QUIZ_BEGIN) {
    return {
      ...state,
      isLoading: true,
      editCurrentQuiz: true,
    };
  }
  if (action.type === ActionType.EDIT_QUIZ_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      editQuizDetails: action.payload,
    };
  }
  if (action.type === ActionType.EXECUTE_EDIT_QUIZ_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === ActionType.EXECUTE_EDIT_QUIZ_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      editCurrentQuiz: false,
      editQuizDetails: { details: null, questions: null },
    };
  }
  if (action.type === ActionType.EXECUTE_EDIT_QUIZ_FAILED) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.message.msg,
    };
  }
  if (action.type === ActionType.DELETE_QUIZ_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === ActionType.DELETE_QUIZ_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      manageSingleQuiz: false,
      singleQuizDetails: null,
      singleQuizQuestions: [],
      numOfQuestions: 0,
    };
  }
  if (action.type === ActionType.SET_QUESTION_TYPE) {
    const options =
      action.payload === "true-false"
        ? ["true", "false"]
        : action.payload === "multiple-choice"
        ? ["", "", "", ""]
        : [""];

    return {
      ...state,
      questionEdit: {
        ...state.questionEdit,
        type: action.payload,
        options: options,
        correctAnswer: "",
      },
    };
  }
  if (action.type === ActionType.SET_EDIT_QUESTION) {
    return {
      ...state,
      editingQuestion: action.payload.edit ? true : false,
      questionEdit: {
        type: action.payload.type,
        question: action.payload.question,
        correctAnswer: action.payload.correctAnswer,
        options: action.payload.options,
        points: action.payload.points,
      },
    };
  }
  if (action.type === ActionType.CANCEL_EDIT_QUESTION) {
    return {
      ...state,
      editingQuestion: false,
      questionEdit: {
        type: "",
        question: "",
        correctAnswer: "",
        options: [],
        points: 1,
      },
    };
  }
  if (action.type === ActionType.CREATE_QUESTION_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === ActionType.CREATE_QUESTION_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      questionEdit: {
        type: "",
        question: "",
        correctAnswer: "",
        options: [],
        points: 1,
      },
    };
  }
  if (action.type === ActionType.CREATE_QUESTION_FAILED) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.message.msg,
    };
  }
  if (action.type === ActionType.EDIT_QUESTION_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === ActionType.EDIT_QUESTION_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      editingQuestion: false,
      questionEdit: {
        type: "",
        question: "",
        correctAnswer: "",
        options: [],
        points: 1,
      },
    };
  }
  if (action.type === ActionType.EDIT_QUESTION_FAILED) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.message.msg,
    };
  }
  if (action.type === ActionType.DELETE_QUESTION_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === ActionType.DELETE_QUESTION_SUCCESS) {
    return {
      ...state,
      isLoading: false,
    };
  }
  if (action.type === ActionType.PUBLISH_QUIZ_FAILED) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.message,
    };
  }
  if (action.type === ActionType.GET_TEST_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === ActionType.GET_TEST_FAILED) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === ActionType.AUTHORIZE_PARTICIPANT_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === ActionType.AUTHORIZE_PARTICIPANT_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      validateParticipant: action.payload,
    };
  }
  if (action.type === ActionType.AUTHORIZE_PARTICIPANT_FAILED) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  throw new Error(`no such action : ${action.type}`);
};

export default reducer;
