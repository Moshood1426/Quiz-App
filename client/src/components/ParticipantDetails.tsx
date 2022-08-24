import React from "react";
import Wrapper from "../assets/wrappers/ParticipantDetails";

const ParticipantDetails = () => {
  return (
    <Wrapper>
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
    </Wrapper>
  );
};

export default ParticipantDetails;
