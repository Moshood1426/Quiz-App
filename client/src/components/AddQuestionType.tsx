import React, { useState } from "react";
import option from "../assets/images/option.png";
import gap from "../assets/images/gap.png";
import boolean from "../assets/images/test.png";
import Wrapper from "../assets/wrappers/AddQuestionType";
import useAppContext from "../store/appContext";

const AddQuestionType = () => {
  const { setQuestionType } = useAppContext();

  return (
    <Wrapper>
      <h4 className="card-title">Select Question Type</h4>

      <div className="add-ques">
        <div
          className="add-ques-type"
          onClick={() => setQuestionType("multiple-choice")}
        >
          <div className="add-ques-type-image">
            <img src={option} alt="setting questions" />
          </div>
          <h5>
            <span className="emoji">📝</span>Multiple Choice
          </h5>
        </div>

        <div
          className="add-ques-type"
          onClick={() => setQuestionType("fill-in-gap")}
        >
          <div className="add-ques-type-image">
            <img src={gap} alt="setting questions" />
          </div>
          <h5>
            <span className="emoji">📝</span>Fill The Gap
          </h5>
        </div>

        <div
          className="add-ques-type"
          onClick={() => setQuestionType("true-false")}
        >
          <div className="add-ques-type-image">
            <img src={boolean} alt="setting questions" />
          </div>
          <h5>
            <span className="emoji">📝</span>True/False
          </h5>
        </div>
      </div>

      {/* {descImage !== "" && (
        <div className="description">
          <img src={descImage} alt="description"/>
        </div>
      )} */}
    </Wrapper>
  );
};

export default AddQuestionType;
