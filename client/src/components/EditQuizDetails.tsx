import React, { useState } from "react";
import Wrapper from "../assets/wrappers/EditQuizDetails";
import useAppContext from "../store/appContext";
import FormItem from "./FormItem";
import FormSelectItem from "./FormSelectItem";

const EditQuizDetails = () => {
  const {
    editQuizDetails: { details },
  } = useAppContext();

  const [formData, setFormData] = useState({
    quizCode: details?.quizCode!,
    quizTitle: details?.quizTitle!,
    privacy: details?.privacy ? "private" : "public",
    privacyOptions: ["private", "public"],
    quizType: details?.quizType!,
    quizTypeOptions: ["moderated", "quick"],
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((prevValue) => ({ ...prevValue, [name]: value }));
  };

  return (
    <Wrapper>
      <div className="edit-quiz-details">
        <h4 className="edit-quiz-details-title">Quiz Details</h4>
        <form className="edit-quiz-details-form">
          <FormItem
            label={true}
            labelText="Quiz Title"
            name={"quizTitle"}
            placeholder={"enter your quiz title"}
            type={"text"}
            value={formData.quizTitle}
            onChange={handleChange}
          />
          <FormItem
            label={true}
            labelText="Quiz Code"
            name={"quizCode"}
            placeholder={"enter your unique quiz code"}
            type={"text"}
            value={formData.quizCode}
            onChange={handleChange}
          />
          <FormSelectItem
            name={"privacy"}
            labelText="Privacy"
            value={formData.privacy}
            onChange={handleChange}
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
        </form>
      </div>
      <div className="add-participants">
        <form>
          <FormItem
            label={true}
            labelText="Add Participants"
            name={"quizCode"}
            placeholder={"enter student no. or gmail"}
            type={"text"}
            value={formData.quizCode}
            onChange={handleChange}
          />
          <button className="btn add-btn">Add</button>
        </form>
      </div>
    </Wrapper>
  );
};

export default EditQuizDetails;
