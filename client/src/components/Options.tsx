import React, { useState } from "react";
import Wrapper from "../assets/wrappers/Options";
import useAppContext from "../store/appContext";
import FormItem from "./FormItem";

type MultipleChoiceState = [
  {
    a: string;
    b: string;
    c: string;
    d: string;
  },
  { answer: string }
];

const Options = () => {
  const { questionEdit, setEditQuestion } = useAppContext();
  const [fillGap, setFillGap] = useState([""]);

  function handleMultipleChoiceChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const name = parseInt(event.target.name);
    const value = event.target.value;
    const options = questionEdit.options.map((item, index) =>
      index === name ? (item = value) : item
    );
    const questionObj = { ...questionEdit, options };
    setEditQuestion(questionObj);
  }

  const handleCorrectAnswer = (event: React.ChangeEvent<HTMLInputElement>) => {
    const questionObj = { ...questionEdit, correctAnswer: event.target.value };
    setEditQuestion(questionObj);
  };

  const handleFillGapChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const questionObj = {
      ...questionEdit,
      correctAnswer: event.target.value,
      options: [event.target.value],
    };
    setEditQuestion(questionObj);
  };

  /*
  questionEdit.options.map((item, index) => {
    return (
      <div className="multiple-choice" key={index}>
   
  */

  if (questionEdit.type === "multiple-choice") {
    return (
      <Wrapper>
        <div className="multiple-choice-container">
          {questionEdit.options.map((item, index) => {
            return (
              <div className="multiple-choice" key={index}>
                <input
                  type="radio"
                  name="multipleChoice"
                  value={item}
                  onChange={handleCorrectAnswer}
                  className="multiple-choice-radio"
                  checked={
                    questionEdit.correctAnswer === item && item ? true : false
                  }
                />
                <label htmlFor={item} className="multiple-choice-label">
                  <FormItem
                    type="text"
                    name={index.toString()}
                    value={item}
                    onChange={handleMultipleChoiceChange}
                    placeholder="kindly add an answer"
                  />
                </label>
              </div>
            );
          })}
        </div>
      </Wrapper>
    );
  }

  if (questionEdit.type === "fill-in-gap") {
    return (
      <Wrapper>
        <div className="fill-gap-container">
          <div className="fill-gap-input">
            <FormItem
              name="fillGap"
              type="input"
              value={questionEdit.correctAnswer}
              onChange={handleFillGapChange}
              placeholder="enter answer"
            />
          </div>
        </div>
      </Wrapper>
    );
  }

  if (questionEdit.type === "true-false") {
    return (
      <Wrapper>
        <div className="true-false-container">
          {questionEdit.options.map((item, index) => {
            return (
              <div key={index} className="true-false">
                <input
                  type="radio"
                  name="trueFalse"
                  value={item}
                  onChange={handleCorrectAnswer}
                  //checked={questionEdit.correctAnswer ? true : false}
                />
                <label htmlFor={item} className="true-false-label">
                  {item}
                </label>
              </div>
            );
          })}
        </div>
      </Wrapper>
    );
  }

  return <div>Question type not selected</div>;
};

export default Options;
