import React from "react";
import moment from "moment";
import { QuizWithSubmission } from "../store/@types/context";
import Wrapper from "../assets/wrappers/SingleSubmission"

interface SingleSubmissionProps {
    item: QuizWithSubmission
}

const SingleSubmission: React.FC<SingleSubmissionProps> = ({item}) => {
  return (
    <Wrapper>
      <p className="quiz-code">{item.quizCode}</p>
      <p className="quiz-time">
        {moment(item.startDate).format("lll")} -{" "}
        {moment(item.endDate).format("lll")}
      </p>
      <h4 className="quiz-title">{item.quizTitle}</h4>
      <p className="quiz-submission-num">{item.noOfSubmissions} submission received</p>
    </Wrapper>
  );
};

export default SingleSubmission;
