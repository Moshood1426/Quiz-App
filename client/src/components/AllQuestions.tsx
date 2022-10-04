import React, { useEffect, useState } from "react";
import Wrapper from "../assets/wrappers/AllQuestions";
import {
  ParticipantQuestion,
  SingleQuestion as SingleQuestionType,
} from "../store/@types/context";
import useAppContext from "../store/appContext";
import Loading from "./Loading";
import SingleQuestion from "./SingleQuestions";

interface AllQuestionsProps {
  startAddingQuestion?: (arg: boolean) => void;
  quizDetails: SingleQuestionType[] | ParticipantQuestion[];
  extraDetails?: boolean;
  addQuestion?: boolean;
}

const AllQuestions: React.FC<AllQuestionsProps> = ({
  startAddingQuestion,
  quizDetails,
  extraDetails,
  addQuestion,
}) => {
  const [totalPoints, setTotalPoints] = useState(0);

  const {
    numOfQuestions,
    editCurrentQuiz,
    isLoading,
  } = useAppContext();

  useEffect(() => {
    if (quizDetails) setTotalPoints(() => calculateTotalPoints(quizDetails));
  }, [quizDetails]);

  const calculateTotalPoints = (
    arg: SingleQuestionType[] | ParticipantQuestion[]
  ) => {
    const result = arg
      .map((item) => {
        return item.points;
      })
      .reduce((acc, item) => {
        return (acc += item);
      }, 0);

    return result;
  };

  return (
    <Wrapper>
      <div className="all-questions-header">
        <h3>
          All Questions{" "}
          <span className="num-of-questions">
            {quizDetails
              ? quizDetails.length
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
        {isLoading /*!editingQuestion || addQuestion === (false || undefined)*/ ? (
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
