import React from "react";
import Wrapper from "../assets/wrappers/AddQuestionContent";
import Logo from "./Logo";
import FormSelectItem from "./FormSelectItem";
import useAppContext from "../store/appContext";
import Options from "./Options";
import { questionEdit } from "../store/@types/context";
import Alert from "./Alert";

interface AddQuestionContentProps {
  startAddingQuestion: (arg: boolean) => void;
}

const AddQuestionContent: React.FC<AddQuestionContentProps> = ({
  startAddingQuestion,
}) => {
  const {
    showAlert,
    isLoading,
    editSingleQuizDetails,
    questionEdit,
    editingQuestion,
    setEditQuestion,
    setQuestionType,
    cancelEditQuestion,
    createQuestion,
    editQuestion,
    editQuiz,
  } = useAppContext();

  const handleChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const value = event.target.value;
    const name = event.target.name;
    if (questionEdit.type !== "") {
      const obj: questionEdit = { ...questionEdit, [name]: value };
      const editing = editingQuestion ? true : false;
      setEditQuestion(obj, editing);
    }
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    if (
      value === "true-false" ||
      value === "multiple-choice" ||
      value === "fill-in-gap"
    ) {
      setQuestionType(value);
    }
  };

  const cancelAddQuestion = () => {
    const alert = window.confirm(
      "Are you sure you want to leave changes without saving?"
    );
    if (alert) {
      startAddingQuestion(false);
      setQuestionType("");
      if (editingQuestion) {
        cancelEditQuestion();
        localStorage.removeItem("questionId");
      }
    } else {
      console.log("cancelled");
    }
  };

  const saveQuestion = async () => {
    if (isLoading) return;

    const result = editingQuestion
      ? await editQuestion()
      : await createQuestion();
    if (result) {
      startAddingQuestion(false);
      if (editSingleQuizDetails.details)
        editQuiz(editSingleQuizDetails.details?._id);
    }
  };

  return (
    <Wrapper>
      <div className="add-question-logo">
        <Logo />
      </div>
      <div className="add-ques-container">
        <div className="add-question-sub-header">
          <p className="question-number">Question 6</p>
          <div className="add-question-sub-header-li">
            <div>
              <input
                type="number"
                min="1"
                max="10"
                name="points"
                value={questionEdit.points}
                onChange={(event) => handleChange(event)}
                className="number-input"
              />
              <span>points</span>
            </div>
            <FormSelectItem
              options={["true-false", "multiple-choice", "fill-in-gap"]}
              name="type"
              value={questionEdit.type}
              onChange={(event) => handleSelectChange(event)}
              dontLabel={true}
            />
          </div>
        </div>
      </div>
      <div className="ques-content-container">
        {showAlert && <Alert />}
        <div>
          <label htmlFor="question" className="formLabel">
            Enter Question Below{" "}
          </label>
          <textarea
            name="question"
            value={questionEdit.question}
            onChange={(event) => handleChange(event)}
            rows={5}
            cols={5}
            className="formInput textarea"
          />
        </div>
        <div className="options">
          <Options />
        </div>
      </div>
      <div
        className={isLoading ? "save disabled-save" : "save"}
        onClick={saveQuestion}
      >
        <span>💾 Save</span>
      </div>
      <div className="cancel" onClick={cancelAddQuestion}>
        <span>❌ Cancel</span>
      </div>
    </Wrapper>
  );
};

export default AddQuestionContent;
