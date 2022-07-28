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
  const { questionEdit } = useAppContext();
  const [multipleChoice, setMultipleChoice] = useState<MultipleChoiceState>([
    {
      a: "option A",
      b: "option B",
      c: "option C",
      d: "option D",
    },
    { answer: "" },
  ]);
  const [trueFalse, setTrueFalse] = useState({
    answer: true,
    options: ["true", "false"],
  });
  const [fillGap, setFillGap] = useState([""]);

  function handleMultipleChoiceChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    setMultipleChoice((item) => [item[0], { answer: event.target.value }]);
  }

  function handleMultipleChoiceOptions(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    setMultipleChoice((item) => [
      { ...item[0], [event.target.name]: event.target.value },
      item[1],
    ]);
  }

  const handleTrueFalseChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.value === "true") {
      setTrueFalse((item) => ({ ...item, answer: true }));
    } else {
      setTrueFalse((item) => ({ ...item, answer: false }));
    }
  };

  const handleFillGapChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    for (let i = 0; i < fillGap.length; i++) {
      if (i.toString() === event.target.name) {
        setFillGap((item) => {
          return item.map((val, index) => {
            if (index === i) {
              return (val = event.target.value);
            } else {
              return val;
            }
          });
        });
      }
    }
  };

  const addRemoveAnswer = (arg: "add" | "remove") => {
    if (arg === "add") {
      if (fillGap.length < 4) {
        setFillGap((item) => [...item, ""]);
      } else {
        throw new Error("cant add more than 4 answers");
      }
    } else {
      if (fillGap.length > 1) {
        setFillGap(fillGap.slice(0, fillGap.length - 1));
      } else {
        throw new Error("cant have less than 1 answer");
      }
    }
  };

  function renderMultipleChoice() {
    let result = [];
    for (let item in multipleChoice[0]) {
      result.push(
        <div className="multiple-choice" key={item}>
          <input
            type="radio"
            name="multipleChoice"
            value={multipleChoice[0][item as keyof typeof multipleChoice[0]]}
            onChange={handleMultipleChoiceChange}
            className="multiple-choice-radio"
          />
          <label htmlFor={item} className="multiple-choice-label">
            <FormItem
              type="text"
              name={item}
              value={multipleChoice[0][item as keyof typeof multipleChoice[0]]}
              onChange={handleMultipleChoiceOptions}
              placeholder="kindly add an answer"
            />
          </label>
        </div>
      );
    }
    return result;
  }

  if (questionEdit.type === "multiple-choice") {
    return (
      <Wrapper>
        <div className="multiple-choice-container">
          {renderMultipleChoice()}
        </div>
      </Wrapper>
    );
  }

  if (questionEdit.type === "fill-in-gap") {
    return (
      <Wrapper>
        <div className="fill-gap-container">
          <div className="fill-gap-input">
            {fillGap.map((item, index) => {
              return (
                <FormItem
                  name={index.toString()}
                  type="input"
                  value={item}
                  onChange={handleFillGapChange}
                  placeholder="enter answer"
                  key={index}
                />
              );
            })}
          </div>
          <div className="add-remove-answer">
            <span onClick={() => addRemoveAnswer("add")}>➕ Add Option</span>
            <span onClick={() => addRemoveAnswer("remove")}>
              ➖ Remove Option
            </span>
          </div>
        </div>
      </Wrapper>
    );
  }

  if (questionEdit.type === "true-false") {
    return (
      <Wrapper>
        <div className="true-false-container">
          {trueFalse.options.map((item, index) => {
            return (
              <div key={index} className="true-false">
                <input
                  type="radio"
                  name="trueFalse"
                  value={item}
                  onChange={handleTrueFalseChange}
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
