import React, { useState } from "react";
import { FormSelectItem, FormItem, Alert } from "../../components";
import Wrapper from "../../assets/wrappers/ExploreDB";
import useAppContext from "../../store/appContext";

const initialState = {
  numOfQuestions: 20,
  difficulty: "any difficulty",
  category: "any category",
  type: "any type",
  quizTitle: "",
  quizCode: "",
  quizType: "quick",
  difficultyOptions: ["any difficulty", "easy", "medium", "hard"],
  categoryOptions: [
    "any category",
    "General Knowledge",
    "Entertainment: Books",
    "Entertainment: Film",
    "Entertainment: Music",
    "Entertainment: Musicals and Theater",
    "Entertainment: Television",
    "Entertainment: Video Games",
    "Entertainment: Board Games",
    "Science & nature",
    "Science: Computer",
    "Science: Mathematics",
    "Mythology",
    "Sports",
    "Geography",
    "History",
    "Politics",
    "Art",
    "Celebrities",
    "Animals",
    "Vehicles",
    "Entertainment: Comics",
    "Science: Gadgets",
  ],
  typeOptions: ["any type", "Multiple Choice", "True/False"],
};

const Explore = () => {
  const [formPage, setFormPage] = useState(1);
  const [formData, setFormData] = useState(initialState);

  const { showAlert, validateInput, exploreQuizAPI } = useAppContext();

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData(() => ({ ...formData, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!formData.quizTitle || !formData.quizCode) {
      validateInput("Please input necessary credentials");
      return;
    }
    console.log("here");
    const category = formData.categoryOptions.indexOf(formData.category) + 8;
    const { quizCode, quizTitle, type, difficulty, numOfQuestions } = formData;
    const data = { quizCode, quizTitle, type, difficulty, category, amount: numOfQuestions };
    exploreQuizAPI(data);
  };

  return (
    <Wrapper>
      <span className="explore-sub-title">Not sure what to set?</span>
      <h3 className="explore-title">Explore The OpenTDI Database</h3>
      <p className="explore-details">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim ve
      </p>
      <form className="form-card" onSubmit={(event) => handleSubmit(event)}>
        {formPage === 1 ? (
          <>
            <h4 className="form-title">Let's start with Quiz Details</h4>
            <p className="form-sub-title">
              Kindly fill the form to suite your taste
            </p>

            <div className="form-element">
              <div className="number-input">
                <label htmlFor="numOfQuestions" className="formLabel">
                  Number of Questions
                </label>
                <input
                  type="number"
                  min="20"
                  max="50"
                  name="numOfQuestions"
                  value={formData.numOfQuestions}
                  onChange={(event) => handleChange(event)}
                  className="formInput"
                />
              </div>
              <FormSelectItem
                name={"category"}
                value={formData.category}
                onChange={(event) => handleChange(event)}
                options={formData.categoryOptions}
              />
              <FormSelectItem
                name={"type"}
                value={formData.type}
                onChange={(event) => handleChange(event)}
                options={formData.typeOptions}
              />
              <FormSelectItem
                name={"difficulty"}
                value={formData.difficulty}
                onChange={(event) => handleChange(event)}
                options={formData.difficultyOptions}
              />
              <button className="btn" onClick={() => setFormPage(2)}>
                Next 1/2
              </button>
            </div>
          </>
        ) : (
          <>
            {showAlert && <Alert />}
            <h4 className="form-title">Let's Fill The Quiz Details</h4>
            <p className="form-sub-title">
              Kindly enter unique digits as your quiz code
            </p>
            <div className="form-element">
              <FormItem
                label={true}
                labelText="Quiz Title"
                name={"quizTitle"}
                placeholder={"enter quiz title"}
                type={"text"}
                value={formData.quizTitle}
                onChange={handleChange}
              />
              <FormItem
                label={true}
                labelText="Quiz Code"
                name={"quizCode"}
                placeholder={"enter a unique quiz code"}
                type={"text"}
                value={formData.quizCode}
                onChange={handleChange}
              />
              <button type="submit" className="btn">
                Submit
              </button>
            </div>
          </>
        )}
      </form>
    </Wrapper>
  );
};

export default Explore;
