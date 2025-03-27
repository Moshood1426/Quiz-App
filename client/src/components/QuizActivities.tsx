import React from "react";
import Wrapper from "../assets/wrappers/Activities";

const QuizActivities = () => {
  return (
    <Wrapper>
      <div className="side-bar-item">
        <h5 className="side-bar-title">What is Quizzal ?</h5>
        <p className="side-bar-subtitle">
          Quizzal is a powerful quiz creation tool that helps educators design
          customized assessments with ease. Whether generating questions from
          our extensive database or adding your own, Quizzal simplifies the
          process, allowing you to create structured, engaging quizzes in
          minutes.
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
