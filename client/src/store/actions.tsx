enum ActionType {
  VALIDATE_INPUT = "VALIDATE_INPUT",
  CLEAR_ALERT = "CLEAR_ALERT",
  
  AUTH_USER_BEGIN = "LOGIN_USER_BEGIN",
  AUTH_USER_SUCCESS = "LOGIN_USER_SUCCESS",
  AUTH_USER_FAILED = "LOGIN_USER_FAILED",

  CREATE_QUIZ_BEGIN = "CREATE_QUIZ_BEGIN",
  CREATE_QUIZ_SUCCESS = "CREATE_QUIZ_SUCCESS",
  CREATE_QUIZ_FAILED = "CREATE_QUIZ_FAILED",

  GET_PARTICIPANT_BEGIN = "GET_PARTICIPANT_BEGIN",
  GET_PARTICIPANT_SUCCESS = "GET_PARTICIPANT_SUCCESS",
  GET_PARTICIPANT_FAILED = "GET_PARTICIPANT_FAILED",

  ADD_PARTICIPANT_BEGIN = "ADD_PARTICIPANT_BEGIN",
  ADD_PARTICIPANT_SUCCESS = "ADD_PARTICIPANT_SUCCESS",
  ADD_PARTICIPANT_FAILED = "ADD_PARTICIPANT_FAILED",

  DELETE_PARTICIPANT_BEGIN = "DELETE_PARTICIPANT_BEGIN",
  DELETE_PARTICIPANT_SUCCESS = "DELETE_PARTICIPANT_SUCCESS",
  DELETE_PARTICIPANT_FAILED = "DELETE_PARTICIPANT_FAILED",

  GET_QUIZ_BEGIN = "GET_QUIZ_BEGIN",
  GET_QUIZ_SUCCESS = "GET_QUIZ_SUCCESS",

  GET_SINGLE_QUIZ_BEGIN = "GET_SINGLE_QUIZ_BEGIN",
  GET_SINGLE_QUIZ_SUCCESS = "GET_SINGLE_QUIZ_SUCCESS",
  GET_SINGLE_QUIZ_FAILED = "GET_SINGLE_QUIZ_FAILED",

  MANAGE_SINGLE_QUIZ_START = "MANAGE_SINGLE_QUIZ_START",
  MANAGE_SINGLE_QUIZ_END = "MANAGE_SINGLE_QUIZ_END",

  GET_QUIZ_QUESTIONS_SUCCESS = "GET_QUIZ_QUESTIONS_SUCCESS",

  EDIT_QUIZ_BEGIN = "EDIT_QUIZ_BEGIN",
  EDIT_QUIZ_SUCCESS = "EDIT_QUIZ_SUCCESS",
  EDIT_QUIZ_END = "EDIT_QUIZ_END",

  EDIT_QUIZ_DETAILS_BEGIN = "EDIT_QUIZ_DETAILS_BEGIN",
  EDIT_QUIZ_DETAILS_SUCCESS = "EDIT_QUIZ_DETAILS_SUCCESS",
  EDIT_QUIZ_DETAILS_FAILED = "EDIT_QUIZ_DETAILS_FAILED",

  DELETE_QUIZ_BEGIN = "DELETE_QUIZ_BEGIN",
  DELETE_QUIZ_SUCCESS = "DELETE_QUIZ_SUCCESS",
  DELETE_QUIZ_FAILED = "DELETE_QUIZ_FAILED",

  SET_QUESTION_TYPE = "SET_QUESTION_TYPE",
  SET_EDIT_QUESTION = "SET_EDIT_QUESTION",
  CANCEL_EDIT_QUESTION = "CANCEL_EDIT_QUESTION",

  CREATE_QUESTION_BEGIN = "CREATE_QUESTION_BEGIN",
  CREATE_QUESTION_SUCCESS = "CREATE_QUESTION_SUCCESS",
  CREATE_QUESTION_FAILED = "CREATE_QUESTION_FAILED",

  EDIT_QUESTION_BEGIN = "EDIT_QUESTION_BEGIN",
  EDIT_QUESTION_SUCCESS = "EDIT_QUESTION_SUCCESS",
  EDIT_QUESTION_FAILED = "EDIT_QUESTION_FAILED",

  DELETE_QUESTION_BEGIN = "DELETE_QUESTION_BEGIN",
  DELETE_QUESTION_SUCCESS = "DELETE_QUESTION_SUCCESS",
  DELETE_QUESTION_FAILED = "DELETE_QUESTION_FAILED",

  PUBLISH_QUIZ_FAILED = "PUBLISH_QUIZ_FAILED",

  GET_TEST_BEGIN = "GET_TEST_BEGIN",
  GET_TEST_SUCCESS = "GET_TEST_SUCCESS",
  GET_TEST_FAILED = "GET_TEST_FAILED",

  AUTHORIZE_PARTICIPANT_BEGIN = "AUTHORIZE_PARTICIPANT_BEGIN",
  AUTHORIZE_PARTICIPANT_SUCCESS = "AUTHORIZE_PARTICIPANT_SUCCESS",
  AUTHORIZE_PARTICIPANT_FAILED = "AUTHORIZE_PARTICIPANT_FAILED",

  GET_PARTICIPANT_QUIZ_INFO_BEGIN = "GET_PARTICIPANT_QUIZ_INFO_BEGIN",
  GET_PARTICIPANT_QUIZ_INFO_SUCCESS = "GET_PARTICIPANT_QUIZ_INFO_SUCCESS",

  SET_QUESTION_ANSWER_BEGIN="SET_QUESTION_ANSWER_BEGIN",
  SET_QUESTION_ANSWER_SUCCESS="SET_QUESTION_ANSWER_SUCCESS",

  SET_FILL_GAP_ANSWER = "SET_FILL_GAP_ANSWER",
  CHANGE_PAGE_BEGIN = "CHANGE_PAGE_BEGIN",
  CHANGE_PAGE_SUCCESS = "CHANGE_PAGE_SUCCESS",

  SET_QUESTION_ANSWER = "SET_QUESTION_ANSWER",
  LOGOUT_PARTICIPANT = "LOGOUT_PARTICIPANT",

  GET_ALL_QUIZ_SUBMISSION_BEGIN = "GET_QUIZ_WITH_SUBMISSION_BEGIN",
  GET_ALL_QUIZ_SUBMISSION_SUCCESS = "GET_QUIZ_WITH_SUBMISSION_SUCCESS",

  GET_SINGLE_QUIZ_SUBMISSION_BEGIN = "GET_SUBMISSION_PARTICIPANT_BEGIN",
  GET_SINGLE_QUIZ_SUBMISSION_SUCCESS = "GET_SUBMISSION_PARTICIPANT_SUCCESS",

  RESET_SINGLE_QUIZ_SUBMISSION = "RESET_SINGLE_QUIZ_SUBMISSION",

  RESET_SUBMISSION_PARTICIPANT = "RESET_SUBMISSION_PARTICIPANT",
  DISPLAY_RESULT = "DISPLAY_RESULT",
  RESET_DISPLAY_RESULT = "RESET_DISPLAY_RESULT",

  EXPLORE_QUIZ_API_BEGIN = "EXPLORE_QUIZ_API_BEGIN",
  EXPLORE_QUIZ_API_SUCCESS = "EXPLORE_QUIZ_API_SUCCESS",

  UPDATE_USER_BEGIN = "UPDATE_USER_BEGIN",
  UPDATE_USER_FAILED = "UPDATE_USER_FAILED",
  UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS",

  UPDATE_PASSWORD_BEGIN = "UPDATE_PASSWORD_BEGIN",
  UPDATE_PASSWORD_SUCCESS = "UPDATE_PASSWORD_SUCCESS",
  UPDATE_PASSWORD_FAILED = "UPDATE_PASSWORD_FAILED",

  DELETE_ACCOUNT_BEGIN = "DELETE_ACCOUNT_BEGIN",
  DELETE_ACCOUNT_SUCCESS = "DELETE_ACCOUNT_SUCCESS",

  LOGOUT_USER="LOGOUT_USER"
}

export default ActionType;
