import React from "react";
import { ParticipantQuestion, SingleQuestion as SingleQuestionInterface } from "../store/@types/context";
import Wrapper from "../assets/wrappers/SingleQuestion";
import useAppContext from "../store/appContext";

interface SingleQuestionProps {
  question: SingleQuestionInterface | ParticipantQuestion;
  index: number;
  id: object;
  extraDetails?: boolean;
  setAnswer?: boolean;
  answer?: string,
  number?: number
}

const SingleQuestion: React.FC<SingleQuestionProps> = ({
  id,
  question,
  index,
  extraDetails,
  setAnswer,
  answer,
  number
}) => {
  const {
    editQuizDetails: { questions, details },
    setEditQuestion,
    deleteQuestion,
    editQuiz,
    setQuestionAnswer
  } = useAppContext();

  const editQuestion = (id: object) => {
    const question = questions?.find((item) => item._id === id);
    if (question) {
      setEditQuestion(question, true);
      localStorage.setItem("questionId", JSON.stringify(question._id));
    }
  };
  const deleteSingleQuestion = (id: object) => {
    deleteQuestion(id);
    if (details) editQuiz(details?._id);
  };

  return (
    <Wrapper>
      <div className="question-header">
        <p className="question-tag">Question {number ? number : index + 1}</p>
        {extraDetails && (
          <div>
            <button
              className="btn question-edit-btn alert-success"
              onClick={() => editQuestion(id)}
            >
              ✍Edit
            </button>
            <button
              className="btn question-delete-btn alert-danger"
              onClick={() => deleteSingleQuestion(id)}
            >
              🗑Delete
            </button>
          </div>
        )}
      </div>
      <div className="question-footer">
        <span className="question-type">
          📝Question Type: {question.type.split("-").join(" ")}
        </span>
        <span className="question-point">⚪ Point: {question.points}</span>
      </div>
      <h5 className="question-content">{question.question}</h5>
      <ul className="question-options">
        {question.options.map((item, index) => {
          return (
            <li
              key={index}
              className={`question-options-item ${
                (question.correctAnswer || answer === item) && "correct-answer"
              }`}
             onClick={() => setAnswer && setQuestionAnswer(id, item)}
            >
              {item}
            </li>
          );
        })}
      </ul>
    </Wrapper>
  );
};

export default SingleQuestion;