import React, { useEffect } from "react";
import Wrapper from "../../assets/wrappers/Submission";
import Loading from "../../components/Loading";
import useAppContext from "../../store/appContext";
import { AllSubmission } from "../../components";
import SingleSubmission from "../../components/SingleSubmission";
import AllQuestions from "../../components/AllQuestions";
import { ParticipantDetails } from "../../components";

const Submission = () => {
  const {
    quizWithSubmission,
    isLoading,
    submissionParticipant,
    getQuizWithSubmission,
    resetSubmissionParticipant,
    displayResult,
    getResults,
    participantQuestions,
  } = useAppContext();

  useEffect(() => {
    getQuizWithSubmission();
    //eslint-disable-next-line
  }, []);

  //renders a single participant result alongside their answers
  if (displayResult) {
    return (
      <Wrapper>
        <div className="take-test-container">
          <div className="submission-header">
            <span onClick={resetSubmissionParticipant}>{"<<"} go back</span>
          </div>
          <div className="quiz-content">
            <ParticipantDetails />
            <div className="quiz-questions">
              <AllQuestions />
            </div>
          </div>
        </div>
      </Wrapper>
    );
  }

  //renders all participant result in tabular format
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

  //renders all quiz with submissions
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
