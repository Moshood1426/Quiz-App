import React, { useState } from "react";
import Card from "./Card";
import FormItem from "./FormItem";
import Wrapper from "../assets/wrappers/CreateQuizModal";
import Logo from "./Logo";
import Alert from "./Alert";
import { useNavigate } from "react-router-dom";
import useAppContext from "../store/appContext";

interface CreateQuizModalProps {
  toggleDisplay: () => void;
  type: "quick" | "moderated";
}

const initialState = {
  quizTitle: "",
  quizCode: "",
};

const CreateQuizModal: React.FC<CreateQuizModalProps> = ({
  toggleDisplay,
  type,
}) => {
  const [formData, setFormData] = useState(initialState);
  const { showAlert, validateInput, createQuiz } = useAppContext();
  const navigate = useNavigate();

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData(() => ({ ...formData, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const { quizCode, quizTitle } = formData;
    if (!quizCode || !quizTitle) {
      validateInput("Kindly enter all essential details");
      return;
    }
    const result = await createQuiz(quizTitle, quizCode);
    if (result) {
      navigate("/");
    }
  };

  //create quick quiz
  if (type === "quick") {
    return (
      <Wrapper>
        <div className="img-div">
          <Logo />
        </div>
        <p className="sub-title">Some description if needed</p>

        <Card>
          <h4 className="form-title">Create Quick Quiz</h4>
          <p className="form-sub-title">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua
          </p>
          <button
            className="btn submitBtn"
            onClick={() => navigate("/explore")}
          >
            Start Exploring
          </button>
          <span
            className="go-back"
            onClick={() => {
              toggleDisplay();
            }}
          >
            Go back
          </span>
        </Card>
      </Wrapper>
    );
  }

  //create moderated quiz
  return (
    <Wrapper>
      <div className="img-div">
        <Logo />
      </div>
      <p className="sub-title">Some description if needed</p>
      <Card>
        <h4 className="form-title">Create Moderated Quiz</h4>
        <form onSubmit={handleSubmit}>
          {showAlert && <Alert />}
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
          <button className="btn submitBtn" type="submit">
            Submit
          </button>
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
