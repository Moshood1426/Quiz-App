import React from "react";
import Wrapper from "../assets/wrappers/AllQuestions";
import { SingleQuestion as SingleQuestionType } from "../store/@types/context";
import useAppContext from "../store/appContext";
import Loading from "./Loading";
import SingleQuestion from "./SingleQuestions";

interface AllQuestionsProps {
  startAddingQuestion?: (arg: boolean) => void;
  extraDetails?: boolean;
}

const AllQuestions: React.FC<AllQuestionsProps> = ({
  startAddingQuestion,
  extraDetails,
}) => {
  const {
    singleQuizQuestions,
    numOfQuestions,
    editCurrentQuiz,
    editQuizDetails,
    isLoading,
  } = useAppContext();

  const calculateTotalPoints = (arg: SingleQuestionType[]) => {
    return arg.reduce((acc, item) => {
      return (acc += item.points);
    }, 0);
  };

  const totalPoints = calculateTotalPoints(singleQuizQuestions);

  const quizDetails = editCurrentQuiz
    ? editQuizDetails.questions!
    : singleQuizQuestions;

  return (
    <Wrapper>
      <div className="all-questions-header">
        <h3>
          All Questions{" "}
          <span className="num-of-questions">
            {editCurrentQuiz
              ? editQuizDetails.questions?.length
              : numOfQuestions}
          </span>
        </h3>
        <p className="all-questions-points">
          Total points:{" "}
          <span className="total-points">{totalPoints} points</span>
        </p>
        {editCurrentQuiz && (
          <div className="add-new-questions">
            <div
              className="add-new-ques-child"
              onClick={() => startAddingQuestion && startAddingQuestion(true)}
            >
              <span className="span">Add Questions</span>
            </div>
          </div>
        )}
      </div>
      <div className="questions-container">
        {isLoading ? (
          <Loading />
        ) : quizDetails.length < 1 ? (
          <p className="no-questions">
            No questions set for this quiz. Click edit quiz to start setting
            questions.
          </p>
        ) : (
          quizDetails.map((item, index) => {
            return (
              <SingleQuestion
                key={item._id.toString()}
                question={item}
                index={index}
                extraDetails={extraDetails}
                id={item._id}
              />
            );
          })
        )}
      </div>
    </Wrapper>
  );
};

export default AllQuestions;
