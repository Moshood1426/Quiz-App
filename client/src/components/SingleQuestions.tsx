import React from "react";
import { SingleQuestion as SingleQuestionInterface } from "../store/@types/context";
import Wrapper from "../assets/wrappers/SingleQuestion";

interface SingleQuestionProps {
  question: SingleQuestionInterface;
  index: number;
}

const SingleQuestion: React.FC<SingleQuestionProps> = ({ question, index }) => {
  return (
    <Wrapper>
      <p className="question-tag">Question {index + 1}</p>
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
