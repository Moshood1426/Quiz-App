import React from "react";
import Wrapper from "../assets/wrappers/EditQuizDetails";
import useAppContext from "../store/appContext";
import Alert from "./Alert";
import FormItem from "./FormItem";
import FormSelectItem from "./FormSelectItem";

interface EditQuizDetailsProps {
  formData: {
    quizCode: string;
    quizTitle: string;
    privacy: string;
    quizType: string;
    quizTypeOptions: string[];
    privacyOptions: string[];
  };
  handleChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  saveChanges: (event: React.FormEvent) => void;
}

const EditQuizDetails: React.FC<EditQuizDetailsProps> = ({
  formData,
  handleChange,
  saveChanges,
}) => {
  const { showAlert, isLoading } = useAppContext();

  return (
    <Wrapper>
      <div className="edit-quiz-details">
        {showAlert && <Alert />}
        <h4 className="edit-quiz-details-title">Quiz Details</h4>

        <form className="edit-quiz-details-form" onSubmit={saveChanges}>
          <FormItem
            label={true}
            labelText="Quiz Title"
            name={"quizTitle"}
            placeholder={"enter your quiz title"}
            type={"text"}
            value={formData.quizTitle}
            onChange={(event) => handleChange(event)}
          />
          <FormItem
            label={true}
            labelText="Quiz Code"
            name={"quizCode"}
            placeholder={"enter your unique quiz code"}
            type={"text"}
            value={formData.quizCode}
            onChange={(event) => handleChange(event)}
          />
          <FormSelectItem
            name={"privacy"}
            labelText="Privacy"
            value={formData.privacy}
            onChange={(event) => handleChange(event)}
            options={formData.privacyOptions}
          />
          <FormSelectItem
            name={"quizType"}
            labelText="quiz type"
            value={formData.quizType}
            onChange={handleChange}
            options={formData.quizTypeOptions}
            disabled={true}
          />
          <button
            disabled={isLoading}
            className="btn alert-success edit-save-btn"
            type="submit"
          >
            Save
          </button>
        </form>
      </div>
    </Wrapper>
  );
};

export default EditQuizDetails;
