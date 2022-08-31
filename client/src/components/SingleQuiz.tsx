import React from "react";
import Wrapper from "../assets/wrappers/SingleQuiz";
import Moment from "react-moment";
import { getTime } from "../utils/actions";
import { SingleQuiz as SingleQuizInterface } from "../store/@types/context";
import useAppContext from "../store/appContext";
import { useNavigate } from "react-router-dom";

interface SingleQuizProps {
  quiz: SingleQuizInterface;
  extraDetails?: boolean;
}

const SingleQuiz: React.FC<SingleQuizProps> = ({ quiz, extraDetails }) => {
  const navigate = useNavigate();
  const { startManageQuiz, deleteQuiz, singleQuizDetails } = useAppContext();

  const editQuiz = () => {
    navigate(`/${singleQuizDetails?._id}`);
  };

  const deleteSingleQuiz = () => {
    const alert = window.confirm("Are you sure you want to delete quiz?");
    if (alert) {
      navigate("/manage-quiz");
      if (singleQuizDetails) deleteQuiz(singleQuizDetails._id);
    }
  };

  return (
    <Wrapper>
      <div
        className={`single-quiz-logo ${
          quiz.quizType === "moderated" ? "moderated-logo" : "quick-logo"
        }`}
      >
        <span>{quiz.quizTitle[0]}</span>
      </div>
      <div className="single-quiz-content">
        <div className="single-quiz-header">
          <div>
            <span className="single-quiz-type">{quiz.quizType}</span>
            <h4>{quiz.quizTitle}</h4>
          </div>
          <Moment fromNow className="single-quiz-time">
            {quiz.createdAt}
          </Moment>
        </div>
        {extraDetails && (
          <div className="single-quiz-code">
            <p>
              Quiz code:{" "}
              <span className="single-quiz-code-value">{quiz.quizCode}</span>
            </p>
          </div>
        )}
        <div className="single-quiz-subheader">
          <p>
            📝{" "}
            {`${quiz.noOfQuestions} question${
              quiz.noOfQuestions > 1 ? "s" : ""
            }`}
          </p>
          <p>
            📓{" "}
            {`${quiz.noOfSubmissions} submission${
              quiz.noOfSubmissions > 1 ? "s" : ""
            }`}
          </p>
          {/* <p>
            📓{" "}
            {`${quiz.participants.length} participants${
             quiz.participants.length > 1 ? "s" : ""
            }`}
          </p> */}
        </div>
        <div className="single-quiz-footer">
          <div className="single-quiz-date">
            {quiz.published ? (
              <div>{getTime(quiz.startDate, quiz.endDate)}</div>
            ) : (
              <p className="single-quiz-date-time">⏰ not published</p>
            )}
          </div>
          <div>
            {extraDetails ? (
              <div>
                <button className="btn single-quiz-edit-btn" onClick={editQuiz}>
                  ✍Edit
                </button>
                <button
                  className="btn single-quiz-delete-btn"
                  onClick={deleteSingleQuiz}
                >
                  🗑Delete
                </button>
              </div>
            ) : (
              <button
                className="btn single-quiz-delete-btn view-details"
                onClick={() => startManageQuiz(quiz._id)}
              >
                👁️View Details
              </button>
            )}
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default SingleQuiz;
