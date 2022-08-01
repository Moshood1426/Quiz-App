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
  quiz: SingleQuiz[];
  totalQuizNum: number;
  activities: Activity[];
  manageSingleQuiz: boolean;
  singleQuizDetails: SingleQuiz | null;
  singleQuizQuestions: SingleQuestion[];
  numOfQuestions: number;
  editCurrentQuiz: boolean;
  editQuizDetails: {
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
}

export interface ContextType extends InitialState {
  register: (reqObj: registerArgs) => Promise<void>;
  login: (reqObj: registerArgs) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  validateInput: () => void;
  getAllQuiz: (reqObj: GetAllQuizArgs) => Promise<void>;
  startManageQuiz: (quizId: object) => void;
  endManageQuiz: () => void;
  editQuiz: (quizId: object) => Promise<void>;
  setQuestionType: (
    type: "true-false" | "multiple-choice" | "fill-in-gap" | ""
  ) => void;
  deleteQuiz: (quizId: object) => Promise<void>;
  executeEditQuiz: (quizId: object, quizObj: editQuizArg) => Promise<boolean>;
  setEditQuestion: (questionObj: questionEdit, edit?: boolean) => void
  cancelEditQuestion: () => void
  createQuestion: () => Promise<boolean>
  editQuestion: () => Promise<void>
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
  startDate?: Date;
  noOfQuestions: number;
  privacy: boolean;
  noOfSubmissions: number;
  allowNonParticipants: boolean;
  participants: Participants[];
  createdBy: object;
  _id: object;
  createdAt: Date;
  updatedAt: Date;
  __v: Number;
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
  email: string;
  startedtTest: string;
  submitted: string;
}

export interface SingleQuestion {
  type:  "multiple-choice" | "true-false" | "fill-in-gap";
  question: string;
  options: string[];
  correctAnswer: string;
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
