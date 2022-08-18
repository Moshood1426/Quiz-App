import React, { useEffect } from "react";
import Wrapper from "../../assets/wrappers/Submission";
import Loading from "../../components/Loading";
import useAppContext from "../../store/appContext";
import { AllSubmission } from "../../components";
import SingleSubmission from "../../components/SingleSubmission";
import AllQuestions from "../../components/AllQuestions";

const Submission = () => {
  const {
    quizWithSubmission,
    isLoading,
    submissionParticipant,
    getQuizWithSubmission,
    resetSubmissionParticipant,
    getResults,
    displayResult
  } = useAppContext();

  useEffect(() => {
    getQuizWithSubmission();
    //eslint-disable-next-line
  }, []);

  if(displayResult) {
    return (
      <Wrapper>
        <div className="take-test-container">
        <div className="quiz-content">
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
              <AllQuestions />
            </div>
            </div>
        </div>
      </Wrapper>
    )
  }

  if (submissionParticipant.quizId !== null) {
    const singleSubmission = quizWithSubmission.find(
      (item) => item._id === submissionParticipant.quizId
    );
    return (
      <Wrapper>
        <div className="submission-header">
          <h3 className="title">Submission</h3>
          <span onClick={resetSubmissionParticipant}>{"<<"} go back</span>
        </div>
        <SingleSubmission item={singleSubmission!} />
        <div className="single-participant single-participant-title">
          <p>S/N</p>
          <p>Name</p>
          <p>Identifier</p>
        </div>
        {isLoading ? (
          <Loading />
        ) : quizWithSubmission.length < 1 ? (
          <p className="no-submission">
            No submission has been received for any quiz
          </p>
        ) : (
          submissionParticipant.participants.map((item, index) => {
            return (
              <div className="single-participant" key={index}>
                <p>{index + 1}</p>
                <p>{item.firstName + " " + item.lastName}</p>
                <p className="single-participant-identifier">
                  {item.identifier}
                </p>
                <p className="single-participant-identifier-small">
                  {item.identifier.slice(0, 1) +
                    "..." +
                    item.identifier.slice(
                      item.identifier.length - 10,
                      item.identifier.length
                    )}
                </p>
                <p
                  className="view-details"
                  onClick={() => getResults(item._id)}
                >
                  view details
                </p>
              </div>
            );
          })
        )}
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h3 className="title">Submission</h3>
      {isLoading ? (
        <Loading />
      ) : quizWithSubmission.length < 1 ? (
        <p className="no-submission">
          No submission has been received for any quiz
        </p>
      ) : (
        <AllSubmission />
      )}
    </Wrapper>
  );
};

export default Submission;
