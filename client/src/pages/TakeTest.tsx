import React, { useEffect } from "react";
import Wrapper from "../assets/wrappers/TakeTest";
import { Navigate } from "react-router-dom";
import Logo from "../components/Logo";
import useAppContext from "../store/appContext";
import Loading from "../components/Loading";
import { TestQuestions } from "../components";

const TakeTest = () => {
  const { isLoading, validateParticipant, endTest, getParticipantQuizInfo } =
    useAppContext();

  useEffect(() => {
    if (!validateParticipant) {
      <Navigate to="/start-test" />;
      return;
    }
    getParticipantQuizInfo();
    //eslint-disable-next-line
  }, []);

  return (
    <Wrapper>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="take-test-container">
          <div className="img-div">
            <Logo />
            <button className="btn" onClick={endTest}>
              End Test
            </button>
          </div>

          <div className="quiz-content">
            <div className="take-test-welcome">
              <h5 className="welcome-text-title">
                Welcome to today's quiz, Moshood.
              </h5>
              <p className="welcome-text-subtitle">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim ve
              </p>
              <ul className="instruction">
                Instructions
                <li className="instruction-item">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt
                </li>
                <li className="instruction-item">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt
                </li>
                <li className="instruction-item">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt
                </li>
              </ul>
            </div>
            <div className="quiz-details">
              <div>
                <span className="quiz-details-title">Student name:</span>
                <h5>Steven Wagner</h5>
              </div>
              <div>
                <span className="quiz-details-title">identifier:</span>
                <h5>2003012013</h5>
              </div>
              <div>
                <span className="quiz-details-title">Quiz title</span>
                <h5>Biology 2021/2022</h5>
              </div>
              <div>
                <span className="quiz-details-title">Duration</span>
                <h5>20 mins</h5>
              </div>
              <div>
                <span className="quiz-details-title">Start Date</span>
                <h5>Moshood Abdullahi</h5>
              </div>
              <div>
                <span className="quiz-details-title">End Date</span>
                <h5>Moshood Abdullahi</h5>
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
