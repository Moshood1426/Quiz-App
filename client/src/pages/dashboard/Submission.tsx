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
    getAllQuizSubmission,
    resetSubmissionParticipant,
    resetSingleQuizSubmission,
    displayResult,
    getResults,
    participantQuestions,
  } = useAppContext();

  useEffect(() => {
    getAllQuizSubmission();
    //eslint-disable-next-line
  }, []);

  //renders a single participant result alongside their answers
  if (displayResult) {
    return (
      <Wrapper>
        <div className="take-test-container">
          <p className="go-back" onClick={resetSubmissionParticipant}>
            {"<<"} go back
          </p>
          <div className="quiz-content">
            <ParticipantDetails />
            <div className="quiz-questions">
              <AllQuestions quizDetails={participantQuestions!} />
            </div>
          </div>
        </div>
      </Wrapper>
    );
  }

  //renders result of all participant for a single quiz in tabular format
  if (submissionParticipant.quizId !== null) {
    const singleSubmission = quizWithSubmission.find(
      (item) => item._id === submissionParticipant.quizId
    );

    return (
      <Wrapper>
        <div className="submission-header">
          <h3 className="title">Submission</h3>
          <span onClick={resetSingleQuizSubmission}>{"<<"} go back</span>
        </div>

        <SingleSubmission item={singleSubmission!} />

        {isLoading ? (
          <Loading />
        ) : quizWithSubmission.length < 1 ? (
          <p className="no-submission">
            No submission has been received for any quiz
          </p>
        ) : (
          <table className="participant-table">
            <thead>
              <th>S/N</th>
              <th>Name</th>
              <th>Identifier</th>
              <th>Details</th>
            </thead>
            <tbody>
              {submissionParticipant.participants.map((item, index) => {
                return (
                  <tr key={index}>
                    <td data-label="S/N">{index + 1}</td>
                    <td data-label="Name">
                      {item.firstName + " " + item.lastName}
                    </td>
                    <td data-label="Identifier">{item.identifier}</td>

                    <td
                      data-label="Details"
                      onClick={() => getResults(item._id)} //sets displayResult to true and renders first condition
                      className="view-details"
                    >
                      view details
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
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
