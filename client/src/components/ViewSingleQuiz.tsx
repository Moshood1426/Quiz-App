import React from "react";
import Wrapper from "../assets/wrappers/ViewSingleQuiz";
import SingleQuiz from "./SingleQuiz";
import { SingleQuiz as SingleQuizInterface } from "../store/@types/context";
import useAppContext from "../store/appContext";
import QuizActivities from "./QuizActivities";
import AllQuestions from "./AllQuestions";

interface ViewSingleQuizProps {
  quiz: SingleQuizInterface;
}

const ViewSingleQuiz: React.FC<ViewSingleQuizProps> = ({ quiz }) => {
  const { singleQuizDetails, endManageQuiz } = useAppContext();
  return (
    <Wrapper>
      <span className="cancel-btn" onClick={() => endManageQuiz()}>
        ❌
      </span>
      <div className="content-container">
        <div className="content">
          <div className="content-main">
            {singleQuizDetails && (
              <SingleQuiz quiz={singleQuizDetails} extraDetails={true} />
            )}
            <AllQuestions />
          </div>
          <div>
            <QuizActivities />
            <div></div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default ViewSingleQuiz;
