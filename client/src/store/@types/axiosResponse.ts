import { User, SingleQuiz, SingleQuestion, SingleParticipant } from "./context";

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
    participant: SingleParticipant[]
}
