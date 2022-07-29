import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Wrapper from "../assets/wrappers/EditQuiz";
import { AddQuestionsModal, EditQuizDetails, Navbar } from "../components";
import AllQuestions from "../components/AllQuestions";
import useAppContext from "../store/appContext";
import { useParams } from "react-router-dom";

const EditQuiz = () => {
  const [addQuestion, setAddQuestion] = useState(false);
  const navigate = useNavigate();
  const { editQuiz } = useAppContext()
  const { id } = useParams()

  useEffect(() => {
    if(id) {
      editQuiz(id)
    }

    document.body.style.overflow = "auto";
  }, []);

  const startAddingQuestions = (arg: boolean) => {
    setAddQuestion(arg);
  };

  const cancelEdit = () => {
    const alert = window.confirm(
      "Are you sure you want to leave changes without saving?"
    );
    if (alert) {
      navigate("/manage-quiz");
    } else {
      console.log("cancelled");
    }
  };

  const saveEdit = () => {

  }

  return (
    <Wrapper>
      <Navbar />
      <div className="edit-quiz-container">
        <div className="edit-quiz-header">
          <h3 className="edit-quiz-header-title">Edit Quiz</h3>
          <div className="edit-quiz-header-button">
            <button className="btn alert-success edit-save-btn">Save</button>
            <button
              className="btn alert-danger edit-cancel-btn"
              onClick={cancelEdit}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
      <div className="edit-quiz-content">
        <EditQuizDetails />
        <AllQuestions startAddingQuestion={startAddingQuestions} />
      </div>
      {addQuestion && (
        <AddQuestionsModal startAddingQuestion={startAddingQuestions} />
      )}
    </Wrapper>
  );
};

export default EditQuiz;
