import React from "react";
import Wrapper from "../assets/wrappers/ViewSingleQuiz";
import SingleQuiz from "./SingleQuiz";
import useAppContext from "../store/appContext";
import QuizActivities from "./QuizActivities";
import AllQuestions from "./AllQuestions";
import Loading from "./Loading";

const ViewSingleQuiz: React.FC = () => {
  const { singleQuizDetails, isLoading, endManageQuiz } = useAppContext();
  return (
    <Wrapper>
      {(isLoading || !singleQuizDetails) ? (
        <Loading />
      ) : (
        <>
          <span className="cancel-btn" onClick={() => endManageQuiz()}>
            ❌
          </span>
          <div className="content-container">
            <div className="content">
              <div className="content-main">
                {singleQuizDetails && (
                  <SingleQuiz quiz={singleQuizDetails} extraDetails={true} />
                )}
                {!isLoading && <AllQuestions />}
              </div>
              <div>
                <QuizActivities />
                <div></div>
              </div>
            </div>
          </div>
        </>
      )}
    </Wrapper>
  );
};

export default ViewSingleQuiz;
