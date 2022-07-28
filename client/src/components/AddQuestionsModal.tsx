import React from "react";
import Wrapper from "../assets/wrappers/AddQuestionsModal";
import AddQuestionType from "./AddQuestionType";
import useAppContext from "../store/appContext";
import AddQuestionContent from "./AddQuestionContent";

interface AddQuestionsModalProps {
  startAddingQuestion: (arg: boolean) => void;
}

const AddQuestionsModal: React.FC<AddQuestionsModalProps> = ({
  startAddingQuestion,
}) => {
  const {
    questionEdit: { type },
    setQuestionType,
  } = useAppContext();

  return (
    <Wrapper>
      <div
        className="background-div"
        onClick={
          !type
            ? () => {
                startAddingQuestion(false);
                setQuestionType("");
              }
            : () => {}
        }
      ></div>
      {type ? (
        <AddQuestionContent startAddingQuestion={startAddingQuestion} />
      ) : (
        <AddQuestionType />
      )}
    </Wrapper>
  );
};

export default AddQuestionsModal;
