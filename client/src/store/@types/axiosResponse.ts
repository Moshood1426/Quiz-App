import {
  User,
  SingleQuiz,
  SingleQuestion,
  SingleParticipant,
  ParticipantQuestion,
} from "./context";

export type LoginResponse = {
  user: User;
};

export type CreateQuizResponse = { msg: string; quiz: SingleQuiz };

export interface GetAllQuizResponse {
  numOfQuiz: number;
  quiz: SingleQuiz[];
}

export interface GetSingleQuizResponse {
  quiz: SingleQuiz[];
}

export interface GetQuizQuestionsResponse {
  totalQuestions: number;
  questions: SingleQuestion[];
}

export interface GetAllParticipantResponse {
  participant: SingleParticipant[];
}

export interface GetQuizSubmissionResponse {
  quiz: SingleQuiz;
}

export interface GetSingleQuizSubmissionRes {
  participant: SingleParticipant[];
  questions: ParticipantQuestion[];
}

export interface GetDBQuestionsResponse {
  data: {
    response_code: number;
    results: {
      category: string;
      type: string;
      difficulty: string;
      question: string;
      correct_answer: string;
      incorrect_answers: string[];
    }[];
  };
}

export interface EditQuizDetailsResponse {
  quizDetails: SingleQuiz;
}

export interface CheckResultsResponse {
  participant: SingleParticipant;
  quiz: SingleQuiz;
  questions: SingleQuestion[];
}
