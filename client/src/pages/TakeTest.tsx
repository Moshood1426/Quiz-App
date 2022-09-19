import React, { useEffect } from "react";
import Wrapper from "../assets/wrappers/TakeTest";
import { Navigate } from "react-router-dom";
import Logo from "../components/Logo";
import useAppContext from "../store/appContext";
import Loading from "../components/Loading";
import { TestQuestions } from "../components";
import moment from "moment";

const TakeTest = () => {
  const {
    isLoading,
    validateParticipant,
    participantQuizDetails,
    participantInfo,
    endTest,
    getParticipantQuizInfo,
  } = useAppContext();

  useEffect(() => {
    if (!validateParticipant) {
     // <Navigate to="/start-test" />;
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
                <h5>
                  {participantInfo?.firstName + " " + participantInfo?.lastName}
                </h5>
              </div>
              <div>
                <span className="quiz-details-title">identifier:</span>
                <h5>{participantInfo?.identifier}</h5>
              </div>
              <div>
                <span className="quiz-details-title">Quiz title</span>
                <h5>{participantQuizDetails?.quizTitle}</h5>
              </div>
              <div>
                <span className="quiz-details-title">Duration</span>
                <h5>20 mins</h5>
              </div>
              <div>
                <span className="quiz-details-title">Start Date</span>
                <h5>
                  {participantQuizDetails?.startDate
                    ? moment(participantQuizDetails?.startDate).format("lll")
                    : "anytime"}
                </h5>
              </div>
              <div>
                <span className="quiz-details-title">End Date</span>
                <h5>
                  {participantQuizDetails?.endDate
                    ? moment(participantQuizDetails?.endDate).format("lll")
                    : "anytime"}
                </h5>
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
