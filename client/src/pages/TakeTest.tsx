import React, { useEffect } from "react";
import Wrapper from "../assets/wrappers/TakeTest";
import Logo from "../components/Logo";
import useAppContext from "../store/appContext";
import Loading from "../components/Loading";
import { TestQuestions } from "../components";

const TakeTest = () => {
  const { isLoading, numOfQuestions,page, limit, getParticipantQuizInfo } =
    useAppContext();

  useEffect(() => {
    getParticipantQuizInfo();
  }, []);

  return (
    <Wrapper>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="take-test-container">
          <div className="img-div">
            <Logo />
          </div>
          <div className="take-test-welcome">
            Welcome to today's quiz, Moshood.
          </div>
          <div className="quiz-content">
            <div className="quiz-details">
              <div>
                <span className="quiz-details-title">Student name:</span>
                <h4>Steven Wagner</h4>
              </div>
              <div>
                <span className="quiz-details-title">identifier:</span>
                <h4>2003012013</h4>
              </div>
              <div>
                <span className="quiz-details-title">Quiz title</span>
                <h4>Biology 2021/2022</h4>
              </div>
              <div>
                <span className="quiz-details-title">Duration</span>
                <h4>20 mins</h4>
              </div>
              <div>
                <span className="quiz-details-title">Start Date</span>
                <h4>Moshood Abdullahi</h4>
              </div>
              <div>
                <span className="quiz-details-title">End Date</span>
                <h4>Moshood Abdullahi</h4>
              </div>
            </div>
            <div className="quiz-questions">
              <TestQuestions />
            </div>
          </div>
        </div>
      )}
    </Wrapper>
  );
};

export default TakeTest;
