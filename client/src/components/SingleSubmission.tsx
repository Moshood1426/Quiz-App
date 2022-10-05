import React, { useState, useEffect } from "react";
import { QuizWithSubmission } from "../store/@types/context";
import Wrapper from "../assets/wrappers/SingleSubmission";
import useAppContext from "../store/appContext";
import { getSubmissionTime } from "../utils/actions";

interface SingleSubmissionProps {
  item: QuizWithSubmission;
  extraDetails?: boolean;
}

const SingleSubmission: React.FC<SingleSubmissionProps> = ({
  item,
  extraDetails,
}) => {
  const [buttonText, setButtonText] = useState("");
  const {
    getSingleQuizSubmission,
    releaseResult,
    withdrawResult,
    submissionParticipant,
    isLoading,
  } = useAppContext();

  //get single quiz with all submission received
  const getParticipant = (quizId: object) => {
    if (submissionParticipant.quizId === null) {
      getSingleQuizSubmission(quizId);
    }
  };

  useEffect(() => {
    setButtonText(item.releaseResults ? "Withdraw result" : "Release result");
  }, [item]);

  return (
    <Wrapper>
      <p className="quiz-code">{item.quizCode}</p>
      <div className="quiz-time">
        {getSubmissionTime(item.startDate, item.endDate)}
      </div>
      <h4 className="quiz-title">{item.quizTitle}</h4>
      <p
        className="quiz-submission-num"
        onClick={() => getParticipant(item._id)}
      >
        {item.noOfSubmissions} submission{item.noOfSubmissions > 1 && "s"}{" "}
        received
      </p>
      {extraDetails && (
        <button
          className="btn results-btn"
          onClick={() =>
            !item.releaseResults
              ? releaseResult(item._id)
              : withdrawResult(item._id)
          }
          disabled={isLoading}
        >
          {buttonText}
        </button>
      )}
    </Wrapper>
  );
};

export default SingleSubmission;
