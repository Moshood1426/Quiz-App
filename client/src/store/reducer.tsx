import ActionType from "./actions";
import { InitialState } from "./@types/context";
import { Action } from "./@types/context";
import { initialState } from "./appContext";

const reducer: React.Reducer<InitialState, Action> = (state, action) => {
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
  if (
    action.type === ActionType.FORGOT_PASSWORD_BEGIN ||
    action.type === ActionType.RESET_PASSWORD_BEGIN
  ) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (
    action.type === ActionType.FORGOT_PASSWORD_SUCCESS ||
    action.type === ActionType.RESET_PASSWORD_SUCCESS
  ) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertText: action.payload.message,
      alertType: "success",
    };
  }
  if (
    action.type === ActionType.FORGOT_PASSWORD_FAILED ||
    action.type === ActionType.RESET_PASSWORD_FAILED
  ) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertText: action.payload.message.msg,
      alertType: "danger",
    };
  }
  if (action.type === ActionType.CREATE_QUIZ_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === ActionType.CREATE_QUIZ_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      manageSingleQuiz: true,
      editCurrentQuiz: false,
      editQuizDetails: { details: null, questions: null },
      singleQuizDetails: action.payload,
    };
  }
  if (action.type === ActionType.CREATE_QUIZ_FAILED) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload,
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
      totalQuizNum: action.payload.totalQuizNum,
    };
  }
  if (action.type === ActionType.ADD_PARTICIPANT_BEGIN) {
    return {
      ...state,
      quizParticipantsLoading: true,
    };
  }
  if (action.type === ActionType.ADD_PARTICIPANT_SUCCESS) {
    return {
      ...state,
      quizParticipantsLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "Participant added succesfully",
    };
  }
  if (action.type === ActionType.ADD_PARTICIPANT_FAILED) {
    return {
      ...state,
      quizParticipantsLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload,
    };
  }
  if (action.type === ActionType.DELETE_PARTICIPANT_BEGIN) {
    return {
      ...state,
      quizParticipantsLoading: true,
    };
  }
  if (action.type === ActionType.DELETE_PARTICIPANT_SUCCESS) {
    return {
      ...state,
      quizParticipantsLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload,
    };
  }
  if (action.type === ActionType.DELETE_PARTICIPANT_FAILED) {
    return {
      ...state,
      quizParticipantsLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload,
    };
  }
  if (action.type === ActionType.GET_PARTICIPANT_BEGIN) {
    return {
      ...state,
      quizParticipantsLoading: false,
    };
  }
  if (action.type === ActionType.GET_PARTICIPANT_SUCCESS) {
    return {
      ...state,
      quizParticipantsLoading: false,
      singleQuizParticipants: action.payload,
    };
  }
  if (action.type === ActionType.GET_PARTICIPANT_FAILED) {
    return {
      ...state,
      quizParticipantsLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload,
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
      singleQuizParticipants: [],
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
      editSingleQuizDetails: action.payload,
    };
  }
  if (action.type === ActionType.EDIT_QUIZ_END) {
    return {
      ...state,
      isLoading: false,
      editCurrentQuiz: false,
      editSingleQuizDetails: { questions: null, details: null },
    };
  }
  if (action.type === ActionType.EDIT_QUIZ_DETAILS_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === ActionType.EDIT_QUIZ_DETAILS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      editSingleQuizDetails: {
        ...state.editSingleQuizDetails,
        details: action.payload,
      },
    };
  }
  if (action.type === ActionType.EDIT_QUIZ_DETAILS_FAILED) {
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
      manageSingleQuiz: false,
      singleQuizDetails: null,
      singleQuizQuestions: [],
      numOfQuestions: 0,
    };
  }
  if (action.type === ActionType.DELETE_QUIZ_SUCCESS) {
    return {
      ...state,
      isLoading: false,
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
  if (action.type === ActionType.RELEASE_RESULT_BEGIN) {
    return {
      ...state,
      isLoading: true,
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
  if (action.type === ActionType.GET_TEST_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      participantQuizDetails: action.payload,
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
  if (action.type === ActionType.GET_PARTICIPANT_QUIZ_INFO_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === ActionType.GET_PARTICIPANT_QUIZ_INFO_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      participantQuizDetails: action.payload.quiz,
      numOfQuestions: action.payload.numOfQuestions,
      participantQuestions: action.payload.participantQuestions,
      participantInfo: action.payload.participant,
      questionsAnswered: action.payload.questionsAnswered,
    };
  }
  if (action.type === ActionType.PICK_ANSWER) {
    return {
      ...state,
      participantQuestions: [
        {
          ...state.participantQuestions![0],
          answer: action.payload,
        },
      ],
    };
  }
  if (action.type === ActionType.SET_QUESTION_ANSWER_BEGIN) {
    return {
      ...state,
      singleAnswerLoading: true,
    };
  }
  if (action.type === ActionType.SET_QUESTION_ANSWER_SUCCESS) {
    return {
      ...state,
      singleAnswerLoading: false,
      questionsAnswered: action.payload.questionsAnswered,
    };
  }
  if (action.type === ActionType.CHANGE_PAGE_SUCCESS) {
    return {
      ...state,
      participantQuestions: action.payload.participantQuestions,
      page: action.payload.page,
    };
  }
  if (action.type === ActionType.LOGOUT_PARTICIPANT) {
    return {
      ...state,
      singleQuizDetails: null,
      numOfQuestions: 0,
      validateParticipant: null,
      participantInfo: null,
      participantQuestions: null,
      participantQuizDetails: null,
      limit: 5,
      page: 1,
    };
  }
  if (action.type === ActionType.GET_ALL_QUIZ_SUBMISSION_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === ActionType.GET_ALL_QUIZ_SUBMISSION_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      quizWithSubmission: action.payload.quiz,
    };
  }
  if (action.type === ActionType.GET_SINGLE_QUIZ_SUBMISSION_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === ActionType.GET_SINGLE_QUIZ_SUBMISSION_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      submissionParticipant: {
        quizId: action.payload.quizId,
        participants: action.payload.participant,
      },
      participantQuestions: action.payload.questions,
    };
  }
  if (action.type === ActionType.RESET_SINGLE_QUIZ_SUBMISSION) {
    return {
      ...state,
      isLoading: false,
      displayResult: false,
      participantQuestions: null,
      submissionParticipant: {
        quizId: null,
        participants: [],
      },
    };
  }
  if (action.type === ActionType.RESET_SUBMISSION_PARTICIPANT) {
    return {
      ...state,
      displayResult: false,
      participantQuestions: action.payload,
    };
  }
  if (action.type === ActionType.DISPLAY_RESULT) {
    return {
      ...state,
      displayResult: true,
      participantQuestions: action.payload.questions,
      participantInfo: action.payload.participant,
    };
  }
  if (action.type === ActionType.RESET_DISPLAY_RESULT) {
    return {
      ...state,
      displayResult: false,
    };
  }
  if (action.type === ActionType.EXPLORE_QUIZ_API_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === ActionType.EXPLORE_QUIZ_API_SUCCESS) {
    return {
      ...state,
      isLoading: false,
    };
  }
  if (action.type === ActionType.UPDATE_USER_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === ActionType.UPDATE_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      user: action.payload,
      showAlert: true,
      alertType: "success",
      alertText: "User profile updated succesfully",
    };
  }
  if (action.type === ActionType.UPDATE_USER_FAILED) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.message.msg,
    };
  }
  if (action.type === ActionType.UPDATE_PASSWORD_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === ActionType.UPDATE_PASSWORD_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "password updated succesfully",
    };
  }
  if (action.type === ActionType.UPDATE_PASSWORD_FAILED) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.message.msg,
    };
  }
  if (action.type === ActionType.DELETE_ACCOUNT_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === ActionType.LOGOUT_USER) {
    return {
      ...initialState,
    };
  }

  if (action.type === ActionType.CHECK_RESULTS_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === ActionType.CHECK_RESULTS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      participantResult: {
        ...action.payload,
      },
    };
  }

  if (action.type === ActionType.CHECK_RESULTS_FAILED) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload,
    };
  }

  if (action.type === ActionType.RESET_CHECK_RESULTS) {
    return {
      ...state,
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
  }
  /* if (action.type === ActionType.DELETE_ACCOUNT_SUCCESS) {
    return {
      
    }
  } */
  throw new Error(`no such action : ${action.type}`);
};

export default reducer;
