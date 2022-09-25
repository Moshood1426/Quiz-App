import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Wrapper from "../assets/wrappers/EditQuiz";
import { AddQuestionsModal, EditQuizDetails } from "../components";
import AllQuestions from "../components/AllQuestions";
import useAppContext from "../store/appContext";
import { useParams } from "react-router-dom";

const EditQuiz = () => {
  const [addQuestion, setAddQuestion] = useState(false);

  const [formData, setFormData] = useState({
    quizCode: "",
    quizTitle: "",
    privacy: "private",
    privacyOptions: ["private", "public"],
    quizType: "quick",
    quizTypeOptions: ["moderated", "quick"],
  });

  const {
    editQuiz,
    editQuizDetails,
    editSingleQuizDetails: { questions, details },
    validateInput,
    editingQuestion,
    endEditQuiz,
  } = useAppContext();

  const navigate = useNavigate();
  const { id } = useParams();

  //fetching details of quiz to be edited
  useEffect(() => {
    if (id) {
      //eslint-disable-next-line
      const quizId = new String(id);
      editQuiz(quizId);
    }
    document.body.style.overflow = "auto";
    //eslint-disable-next-line
  }, []);

  //updating form data values when get request gets completed
  useEffect(() => {
    if (details) {
      setFormData((item) => ({
        ...item,
        quizCode: details.quizCode,
        quizTitle: details.quizTitle,
        privacy: details.privacy ? "private" : "public",
        quizType: details.quizType,
      }));
    }
  }, [details]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData(() => ({ ...formData, [name]: value }));
  };

  const startAddingQuestions = (arg: boolean) => {
    setAddQuestion(arg);
  };

  const cancelEdit = () => {
    const alert = window.confirm(
      "All unsaved changes will be lost. Do you want to continue?"
    );
    if (alert) {
      navigate("/");
      endEditQuiz();
    } else {
      console.log("cancelled");
    }
  };

  const saveEdit = async (event: React.FormEvent) => {

    event.preventDefault();
    //eslint-disable-next-line
    const quizId = new String(id);
    const { privacy, quizTitle, quizCode } = formData;
    if (!privacy || !quizTitle || !quizCode) {
      validateInput();
      return;
    }
    const quizObj = {
      privacy,
      quizTitle,
      quizCode,
    };
    editQuizDetails(quizId, quizObj);

  };

  return (
    <Wrapper>
      {/*<Navbar />*/}
      <div className="edit-quiz-container">
        <div className="edit-quiz-header">
          <h3 className="edit-quiz-header-title">Edit Quiz</h3>
          <div className="edit-quiz-header-button">
            <button
              className="btn alert-danger edit-cancel-btn"
              onClick={cancelEdit}
            >
              Go Back
            </button>
          </div>
        </div>
      </div>

      <div className="edit-quiz-content">
        <EditQuizDetails
          formData={formData}
          handleChange={handleChange}
          saveChanges={saveEdit}
        />
        <AllQuestions
          startAddingQuestion={startAddingQuestions}
          extraDetails={true}
          addQuestion={addQuestion}
          quizDetails={questions === null ? [] : questions}
        />
      </div>

      {(addQuestion || editingQuestion) && (
        <AddQuestionsModal startAddingQuestion={startAddingQuestions} />
      )}
    </Wrapper>
  );
};

export default EditQuiz;
