import React from "react";
import Wrapper from "../assets/wrappers/TestQuestions";
import SingleQuestionWrapper from "../assets/wrappers/SingleQuestion";
import useAppContext from "../store/appContext";
import SingleQuestion from "./SingleQuestions";
import FormItem from "./FormItem";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";

const TestQuestions = () => {
  const {
    participantQuestions,
    questionsAnswered,
    changeQuestionPage,
    numOfQuestions,
    limit,
    page,
    setQuestionAnswer,
  } = useAppContext();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const questionId = new String(event.target.name);
    const value = event.target.value;
    setQuestionAnswer(questionId, value);
  };

  const numOfPages = Math.ceil(numOfQuestions / limit);
  const pages = Array.from({ length: numOfPages }, (v, i) => i + 1);

  return (
    <Wrapper>
      <div className="all-questions-header">
        <h3>
          All Questions <span>{questionsAnswered + "/" + numOfQuestions}</span>
        </h3>
        <p className="all-questions-points">
          Total points: <span className="total-points">30</span>
        </p>
      </div>
      <div>
        {participantQuestions &&
          participantQuestions.map((item, index) => {
            if (item.type === "fill-in-gap") {
              return (
                <SingleQuestionWrapper key={item._id.toString()}>
                  <div className="question-header">
                    <p className="question-tag">
                      Question {limit * (page - 1) + index + 1}
                    </p>
                  </div>
                  <div className="question-footer">
                    <span className="question-type">
                      📝Question Type: {item.type.split("-").join(" ")}
                    </span>
                    <span className="question-point">
                      ⚪ Point: {item.points}
                    </span>
                  </div>
                  <h5 className="question-content">{item.question}</h5>
                  <FormItem
                    type="text"
                    name={item._id.toString()}
                    onChange={handleChange}
                    value={item.answer}
                    placeholder={"enter answer here"}
                  />
                </SingleQuestionWrapper>
              );
            } else {
              return (
                <SingleQuestion
                  key={item._id.toString()}
                  question={item}
                  index={index}
                  id={item._id}
                  setAnswer={true}
                  answer={item.answer}
                  number={limit * (page - 1) + index + 1}
                />
              );
            }
          })}
      </div>
      <div className="quiz-page-list">
        <button className="prev-btn">
          <HiChevronDoubleLeft />
          prev
        </button>
        <div className="btn-container">
          {pages.map((item, index) => {
            return (
              <button
                type="button"
                className={item === page ? "pageBtn active" : "pageBtn"}
                key={index}
                onClick={() => changeQuestionPage(item)}
              >
                {item}
              </button>
            );
          })}
        </div>
        <button className="next-btn">
          next
          <HiChevronDoubleRight />
        </button>
      </div>
    </Wrapper>
  );
};

export default TestQuestions;
