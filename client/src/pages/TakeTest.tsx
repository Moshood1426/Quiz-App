import React, { useEffect, useState } from "react";
import Wrapper from "../assets/wrappers/TakeTest";
import Logo from "../components/Logo";
import useAppContext from "../store/appContext";
import Loading from "../components/Loading";
import { TestQuestions } from "../components";
import moment from "moment";
import { getTestDuration} from "../utils/actions";

const TakeTest = () => {
  const [duration, setDuration] = useState<string | number>(0);
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

  useEffect(() => {
    const endDate = participantQuizDetails?.endDate!;
    const startDate = participantQuizDetails?.startDate!;

    setDuration(() => getTestDuration(startDate, endDate));
  }, [participantQuizDetails]);

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
                Welcome for {participantQuizDetails?.quizTitle}, Moshood.
              </h5>

              <ul className="instruction">
                Before you begin...
                <li className="instruction-item">
                  Questions may come in different format(true-false, fill gap,
                  multiple choice). Kindly answer all questions
                </li>
                <li className="instruction-item">
                  Test may be scheduled to finish any time. Kindly pay attention
                  to the duration of the test.
                </li>
                <li className="instruction-item">
                  Uncompleted test would be submitted automatically after time
                  elapse
                </li>
                <li className="instruction-item">
                  Right beside all questions is the number of questions you
                  answered slash total number of questions.
                </li>
                <li className="instruction-item">
                  All your progress is saved and you can continue test from
                  where you stopped in case of network failure.
                </li>
              </ul>
              <p className="welcome-text-subtitle">
                We at Quizzal wish you the very best as you begin your test.
              </p>
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
                <h5>
                  {moment("1900-01-01 00:00:00")
                    .add(duration, "seconds")
                    .format("HH:mm:ss")}
                </h5>
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
