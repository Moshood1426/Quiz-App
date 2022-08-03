import React, { useState } from "react";
import Wrapper from "../assets/wrappers/ViewSingleQuiz";
import SingleQuiz from "./SingleQuiz";
import useAppContext from "../store/appContext";
import QuizActivities from "./QuizActivities";
import AllQuestions from "./AllQuestions";
import Loading from "./Loading";
import moment from "moment";
import FormItem from "./FormItem";
import Alert from "./Alert";

const initialState = {
  startDate: "",
  endDate: "",
  anytime: false,
};

const ViewSingleQuiz: React.FC = () => {
  const [formData, setFormData] = useState(initialState);
  const [publishQuiz, setPublishQuiz] = useState(false);
  const {
    validateInput,
    showAlert,
    singleQuizDetails,
    isLoading,
    endManageQuiz,
  } = useAppContext();

  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;

    setFormData((item) => ({
      ...item,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const executePublishQuiz = () => {
    const currentTime = moment().format().slice(0, 16);
    if (formData.startDate && formData.startDate < currentTime) {
      validateInput();
    }
    if (formData.startDate > formData.endDate) {
      validateInput();
    }
  };

  return (
    <Wrapper>
      {isLoading || !singleQuizDetails ? (
        <Loading />
      ) : (
        <>
          <span className="cancel-btn" onClick={() => endManageQuiz()}>
            ❌
          </span>
          <div className="content-container">
            <div className="content">
              <div className="content-main">
                {singleQuizDetails.published ? (
                  <p className="alert alert-success">
                    This quiz has been published.{" "}
                    <span
                      className="publish-start"
                      onClick={() => setPublishQuiz(item => !item)}
                    >
                      Edit publish details?
                    </span>
                  </p>
                ) : (
                  <p className="alert alert-danger">
                    This quiz has not been published. click{" "}
                    <span
                      className="publish-start"
                      onClick={() => setPublishQuiz(item => !item)}
                    >
                      here
                    </span>{" "}
                    to publish
                  </p>
                )}
                {publishQuiz && (
                  <>
                    {showAlert && <Alert />}
                    <div className="publish-quiz">
                      <div className="publish-quiz-anytime">
                        <input
                          type="checkbox"
                          name="anytime"
                          onChange={handleTimeChange}
                        />
                        <label htmlFor="anytime">
                          Click to publish without time restriction
                        </label>
                      </div>
                      <FormItem
                        type="datetime-local"
                        name="startDate"
                        onChange={handleTimeChange}
                        value={formData.startDate}
                        label={true}
                        labelText="Start Date"
                        disabled={formData.anytime ? true : false}
                      />
                      <FormItem
                        type="datetime-local"
                        name="endDate"
                        onChange={handleTimeChange}
                        value={formData.endDate}
                        label={true}
                        labelText="End Date"
                        disabled={formData.anytime ? true : false}
                      />
                      <button className="btn" onClick={executePublishQuiz}>
                        Publish
                      </button>
                    </div>
                  </>
                )}
                {singleQuizDetails && (
                  <SingleQuiz quiz={singleQuizDetails} extraDetails={true} />
                )}
                {!isLoading && <AllQuestions />}
              </div>
              <div>
                <QuizActivities />
                <div></div>
              </div>
            </div>
          </div>
        </>
      )}
    </Wrapper>
  );
};

export default ViewSingleQuiz;
