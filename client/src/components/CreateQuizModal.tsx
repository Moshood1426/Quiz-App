import React, { useState } from "react";
import Card from "./Card";
import FormItem from "./FormItem";
import Wrapper from "../assets/wrappers/CreateQuizModal";
import Logo from "./Logo";

interface CreateQuizModalProps {
  toggleDisplay: () => void;
}

const initialState = {
  quizTitle: "",
  quizCode: ""
};

const CreateQuizModal: React.FC<CreateQuizModalProps> = ({ toggleDisplay }) => {
  const [formData, setFormData] = useState(initialState);
  // const [ quizType, setQuizType ] = useState("moderated-quiz")

  const handleChange = () => {};

  return (
    <Wrapper>
      <div className="img-div">
        <Logo />
      </div>
      <p className="sub-title">Some description if needed</p>
      <Card>
        <h4 className="form-title">Create Moderated Test</h4>
        <form>
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
          <FormItem
            label={true}
            labelText="Quiz Title"
            name={"quizTitle"}
            placeholder={"enter your quiz title"}
            type={"text"}
            value={formData.quizTitle}
            onChange={handleChange}
          />
          <button className="btn submitBtn">Submit</button>
          <span
            className="go-back"
            onClick={() => {
              toggleDisplay();
            }}
          >
            Go back
          </span>
        </form>
      </Card>
    </Wrapper>
  );
};

export default CreateQuizModal;
