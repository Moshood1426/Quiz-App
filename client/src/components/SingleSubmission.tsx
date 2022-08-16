import React from "react";
import moment from "moment";
import { QuizWithSubmission } from "../store/@types/context";
import Wrapper from "../assets/wrappers/SingleSubmission";
import useAppContext from "../store/appContext";

interface SingleSubmissionProps {
  item: QuizWithSubmission;
}

const SingleSubmission: React.FC<SingleSubmissionProps> = ({ item }) => {
  const { getSubmissionParticipant, submissionParticipant } = useAppContext();
  const getParticipant = (quizId: object) => {
    if(submissionParticipant.quizId === null) getSubmissionParticipant(quizId);
  };
  return (
    <Wrapper>
      <p className="quiz-code">{item.quizCode}</p>
      <p className="quiz-time">
        {moment(item.startDate).format("lll")} -{" "}
        {moment(item.endDate).format("lll")}
      </p>
      <h4 className="quiz-title">{item.quizTitle}</h4>
      <p
        className="quiz-submission-num"
        onClick={() => getParticipant(item._id)}
      >
        {item.noOfSubmissions} submission received
      </p>
    </Wrapper>
  );
};

export default SingleSubmission;
