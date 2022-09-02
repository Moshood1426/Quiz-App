import React from "react";
import Wrapper from "../assets/wrappers/Activities";

const QuizActivities = () => {
  return (
    <Wrapper>
      <div className="side-bar-item">
        <h5 className="side-bar-title">What is Quizzal</h5>
        <p className="side-bar-subtitle">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim ve
        </p>
      </div>

      <div className="side-bar-item">
        <h5 className="side-bar-title">Making the most of quizzal</h5>
        <ul>
          <li>
            Create a moderated quiz where you define all questions or explore
            amazing questions from our API
          </li>
          <li>
            Select a fitting time for your students and publish the quiz so your
            students can take the test
          </li>
          <li>
            Access students performance and release their results for viewing
          </li>
        </ul>
      </div>
    </Wrapper>
  );
};

export default QuizActivities;
