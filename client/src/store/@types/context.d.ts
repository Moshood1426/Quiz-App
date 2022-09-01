export interface registerArgs {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
}

export interface InitialState {
  showAlert: boolean;
  alertType: string;
  alertText: string;
  isLoading: boolean;
  user: User | null;
  quiz: SingleQuiz[] | null;
  totalQuizNum: number;
  manageSingleQuiz: boolean;
  singleQuizDetails: SingleQuiz | null;
  singleQuizQuestions: SingleQuestion[];
  numOfQuestions: number;
  editCurrentQuiz: boolean;
  editSingleQuizDetails: {
    questions: SingleQuestion[] | null;
    details: SingleQuiz | null;
  };
  editingQuestion: boolean;
  questionEdit: {
    type: "true-false" | "multiple-choice" | "fill-in-gap" | "";
    question: "";
    correctAnswer: "";
    options: string[];
    points: 1;
  };
  validateParticipant: AuthorizeParticipant | null;
  participantInfo: SingleParticipant | null;
  participantQuestions: ParticipantQuestion[] | null;
  limit: number;
  page: number;
  quizWithSubmission: QuizWithSubmission[];
  submissionParticipant: {
    quizId: object | null;
    participants: SingleParticipant[];
  };
  displayResult: boolean;
}

export interface AuthorizeParticipant {
  quizId: object;
  participantId: object;
}

export interface ContextType extends InitialState {
  register: (reqObj: registerArgs) => Promise<void>;
  login: (reqObj: registerArgs) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  validateInput: (arg?: string) => void;
  createQuiz: (quizTitle, quizCode) => Promise<boolean>;
  getAllQuiz: (reqObj: GetAllQuizArgs) => Promise<void>;
  startManageQuiz: (quizId: object) => void;
  endManageQuiz: () => void;
  editQuiz: (quizId: object) => Promise<void>;
  endEditQuiz: () => void;
  setQuestionType: (
    type: "true-false" | "multiple-choice" | "fill-in-gap" | ""
  ) => void;
  deleteQuiz: (quizId: object) => Promise<void>;
  editQuizDetails: (quizId: object, quizObj: editQuizArg) => Promise<boolean>;
  setEditQuestion: (questionObj: questionEdit, edit?: boolean) => void;
  cancelEditQuestion: () => void;
  createQuestion: () => Promise<boolean>;
  editQuestion: () => Promise<boolean>;
  deleteQuestion: (quizId: object) => Promise<void>;
  publishQuiz: (
    quizId: object,
    publishQuizDetails: PublishQuizDetails
  ) => Promise<boolean>;
  getTestBegin: (quizCode: string) => Promise<void>;
  authorizeParticipant: (reqObj: {
    quizId: object;
    privacy: boolean;
    identifier: string;
    firstName?: string;
    lastName?: string;
  }) => Promise<void>;
  getParticipantQuizInfo: () => Promise<void>;
  setQuestionAnswer: (questionId: object, answer: string) => void;
  changeQuestionPage: (page: number) => void;
  endTest: () => void;
  getAllQuizSubmission: () => void;
  getSingleQuizSubmission: (quizId: object) => Promise<void>;
  resetSubmissionParticipant: () => void;
  getResults: (participantId: object) => void;
  resetDisplayResult: () => void;
  exploreQuizAPI: (data: {
    quizCode: string;
    quizTitle: string;
    type: string;
    difficulty: string;
    category: number;
    amount: number;
  }) => Promise<boolean>;
}

export interface editQuizArg {
  quizTitle: string;
  quizCode: string;
  privacy: string;
}

export interface ContextProps {
  children: React.ReactNode;
}

export interface Action {
  type: ActionType;
  payload?: any;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export type LoginResponse = {
  user: User;
};

export type LoginError = {
  data: {
    msg: string;
  };
};

export interface GetAllQuizArgs {
  title: string;
  sort: "a-z" | "z-a" | "all" | "latest" | "oldest";
  code: string;
  privacy: "all" | "private" | "public";
  type?: "all" | "moderated" | "quick";
  sortOptions?: string[];
  typeOptions?: string[];
  privacyOptions?: string[];
}

export interface GetAllQuizResponse {
  numOfQuiz: number;
  quiz: SingleQuiz[];
  activities: Activity[];
}

export interface QuizWithSubmission {
  _id: object;
  startDate: Date;
  endDate: Date;
  quizTitle: string;
  quizCode: string;
  noOfSubmissions: number;
}

export interface GetSingleQuizResponse {
  quiz: SingleQuiz[];
}

export interface GetQuizQuestionsResponse {
  totalQuestions: number;
  questions: SingleQuestion[];
}

interface SingleQuiz {
  quizTitle: string;
  quizCode: string;
  quizType: string;
  startDate: Date;
  endDate: Date;
  noOfQuestions: number;
  privacy: boolean;
  noOfSubmissions: number;
  allowNonParticipants: boolean;
  published: boolean;
  participants: Participants[];
  createdBy: object;
  _id: object;
  createdAt: Date;
  updatedAt: Date;
  __v: Number;
}

export interface SingleParticipant {
  _id: object;
  firstName: string;
  lastName: string;
  quizId: object;
  startedTest: boolean;
  submitted: boolean;
  identifier: string;
  answers: { _id: object; questionId: object; answer: string }[];
}

interface Activity {
  action: string;
  for: object;
  createdBy: object;
  _id: object;
  createdAt: string;
  updatedAt: string;
  __v: Number;
}

interface Participants {
  identifier: string;
  startedTest: boolean;
  submitted: boolean;
  _id: object;
}

export interface PublishQuizDetails {
  anytime: boolean;
  startDate: Date | string;
  endDate: Date | string;
}

export interface SingleQuestion {
  type: "multiple-choice" | "true-false" | "fill-in-gap";
  question: string;
  options: string[];
  correctAnswer: string;
  answer?: string;
  points: number;
  forQuiz: object;
  createdBy: object;
  _id: object;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

interface ParticipantQuestion {
  type: "multiple-choice" | "true-false" | "fill-in-gap";
  question: string;
  options: string[];
  answer: string;
  correctAnswer?: string;
  points: number;
  forQuiz: object;
  createdBy: object;
  _id: object;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface questionEdit {
  type: "" | "multiple-choice" | "true-false" | "fill-in-gap";
  question: string;
  options: string[];
  correctAnswer: string;
  points: number;
}
