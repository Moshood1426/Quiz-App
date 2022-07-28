import React from "react";
import questionImg from "../../assets/images/set-questions.png";
import reviewImg from "../../assets/images/review-answers.png";
import feedbackImg from "../../assets/images/drop-feedback.png";
import Wrapper from "../../assets/wrappers/Process";

const Process = () => {
  return (
    <Wrapper>
      <div className="process">
        <div className="process-img-div">
          <img src={questionImg} alt="setting questions" />
        </div>
        <h4>Set Questions</h4>
        <p>Lorem ipsum dolor sit amet, tur adipiscing elit, sed </p>
      </div>
      <div className="process">
        <div className="process-img-div">
          <img src={reviewImg} alt="setting questions" />
        </div>
        <h4>Review Answers</h4>
        <p>Lorem ipsum dolor sit amet, tur adipiscing elit, sed </p>
      </div>
      <div className="process process-feedback">
        <div className="process-img-div">
          <img src={feedbackImg} alt="setting questions" />
        </div>
        <h4>Drop Feedback</h4>
        <p>Lorem ipsum dolor sit amet, tur adipiscing elit, sed </p>
      </div>
      <span className="avatar"></span>
    </Wrapper>
  );
};

export default Process;
