import React from "react";
import { SingleQuestion as SingleQuestionInterface } from "../store/@types/context";
import Wrapper from "../assets/wrappers/SingleQuestion";
import useAppContext from "../store/appContext";

interface SingleQuestionProps {
  question: SingleQuestionInterface;
  index: number;
  id: object;
  extraDetails?: boolean;
}

const SingleQuestion: React.FC<SingleQuestionProps> = ({
  id,
  question,
  index,
  extraDetails,
}) => {
  const {
    editQuizDetails: { questions },
    setEditQuestion,
  } = useAppContext();

  const editQuestion = (id: object) => {
    const question = questions?.find((item) => item._id === id);
    if (question) setEditQuestion(question, true);
  };
  const deleteQuestion = () => {};

  return (
    <Wrapper>
      <div className="question-header">
        <p className="question-tag">Question {index + 1}</p>
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
              onClick={() => deleteQuestion()}
            >
              🗑Delete
            </button>
          </div>
        )}
      </div>
      <div className="question-footer">
        <span className="question-type">📝Question Type: {question.type.split("-").join(" ")}</span>
        <span className="question-point">⚪ Point: {question.points}</span>
      </div>
      <h5 className="question-content">{question.question}</h5>
      <ul className="question-options">
        {question.options.map((item, index) => {
          return (
            <li
              key={index}
              className={`question-options-item ${
                question.correctAnswer === item && "correct-answer"
              }`}
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
