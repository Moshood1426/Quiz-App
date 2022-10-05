import React, { useState, useEffect } from "react";
import Wrapper from "../assets/wrappers/TestQuestions";
import SingleQuestionWrapper from "../assets/wrappers/SingleQuestion";
import useAppContext from "../store/appContext";
import SingleQuestion from "./SingleQuestions";
import FormItem from "./FormItem";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import moment from "moment";
import { paginationGenerator, getTestTimeLeft } from "../utils/actions";

const TestQuestions = () => {
  const [timeLeft, setTimeLeft] = useState<string | number>("0:00");

  const {
    participantQuizDetails,
    participantQuestions,
    questionsAnswered,
    changeQuestionPage,
    numOfQuestions,
    limit,
    page,
    setQuestionAnswer,
    pickAnswer,
    endTest,
    singleAnswerLoading,
  } = useAppContext();

  useEffect(() => {
    const endDate = participantQuizDetails?.endDate!;
    const startDate = participantQuizDetails?.startDate!;

    const timer = setInterval(() => {
      const currentDate = new Date();
      setTimeLeft(() => getTestTimeLeft(currentDate, startDate, endDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [participantQuizDetails]);

  //checks the timer and end test once time ends
  useEffect(() => {
    if (typeof timeLeft === "number" && timeLeft < 1) {
      endTest();
    }
    //eslint-disable-next-line
  }, [timeLeft]);

  const numOfPages = Math.ceil(numOfQuestions / limit);
  const pages = paginationGenerator(page, numOfQuestions);

  return (
    <Wrapper>
      <div className="all-questions-header">
        <h3>
          All Questions <span>{questionsAnswered + "/" + numOfQuestions}</span>
        </h3>
        <p className="all-questions-points">
          Duration:
          <span className="total-points">
            {moment("1900-01-01 00:00:00")
              .add(timeLeft, "seconds")
              .format("HH:mm:ss")}
          </span>
        </p>
      </div>
      <div>
        {participantQuestions &&
          participantQuestions.map((item, index) => {
            if (item.type === "fill-in-gap") {
              return (
                <>
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
                      onChange={(event) => pickAnswer(event.target.value)}
                      value={item.answer}
                      placeholder={"enter answer here"}
                    />
                  </SingleQuestionWrapper>
                  <button
                    className="alert alert-success submit-answer"
                    onClick={() => setQuestionAnswer()}
                    disabled={singleAnswerLoading}
                  >
                    Submit
                  </button>
                </>
              );
            } else {
              return (
                <div key={item._id.toString()}>
                  <SingleQuestion
                    question={item}
                    index={index}
                    id={item._id}
                    setAnswer={true}
                    answer={item.answer}
                    number={limit * (page - 1) + index + 1}
                  />
                  <button
                    className="alert alert-success submit-answer"
                    onClick={() => setQuestionAnswer()}
                  >
                    Submit
                  </button>
                </div>
              );
            }
          })}
      </div>
      <div className="quiz-page-list">
        <button
          className="prev-btn"
          onClick={() => changeQuestionPage(page > 1 ? page - 1 : numOfPages)}
        >
          <HiChevronDoubleLeft />
          prev
        </button>
        <div className="btn-container">
          {pages.map((item, index) => {
            const newPage = typeof item === "number" ? item : null;
            return (
              <span
                className={item === page ? "pageBtn active" : "pageBtn"}
                key={index}
                onClick={() =>
                  !singleAnswerLoading && newPage && changeQuestionPage(newPage)
                }
              >
                {item}
              </span>
            );
          })}
        </div>
        <button
          className="next-btn"
          onClick={() => changeQuestionPage(page < numOfPages ? page + 1 : 1)}
        >
          next
          <HiChevronDoubleRight />
        </button>
      </div>
    </Wrapper>
  );
};

export default TestQuestions;
