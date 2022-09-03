import React, { useState } from "react";
import Wrapper from "../assets/wrappers/ViewSingleQuiz";
import SingleQuiz from "./SingleQuiz";
import useAppContext from "../store/appContext";
import AllQuestions from "./AllQuestions";
import Loading from "./Loading";
import moment from "moment";
import { FcInfo } from "react-icons/fc";
import FormItem from "./FormItem";
import Alert from "./Alert";
import AddParticipant from "./AddParticipant";

const initialState = {
  startDate: "",
  endDate: "",
  anytime: false,
};

const ViewSingleQuiz: React.FC = () => {
  const [formData, setFormData] = useState(initialState);
  const [publishing, setPublishing] = useState(false);
  const [publishQuiz, setPublishQuiz] = useState(false);
  const [addParticipantModal, setAddParticipantModal] = useState(false);

  const {
    validateInput,
    showAlert,
    singleQuizDetails,
    singleQuizQuestions,
    isLoading,
    endManageQuiz,
    startManageQuiz,
    publishQuiz: runPublishQuiz,
  } = useAppContext();

  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;

    if (type === "checkbox") {
      setFormData({ anytime: checked, startDate: "", endDate: "" });
    } else {
      setFormData((item) => ({ ...item, [name]: value }));
    }
  };

  const executePublishQuiz = async () => {
    const currentTime = moment().format().slice(0, 16);

    if (formData.startDate && formData.startDate < currentTime) {
      validateInput("Start date cannot be less than current date");
      return;
    }
    if (formData.startDate && formData.endDate) {
      if (formData.startDate > formData.endDate) {
        validateInput("Start date cannot be greater than current date");
        return;
      }
    }
    if (JSON.stringify(formData) === JSON.stringify(initialState)) {
      validateInput("All input cannot be empty");
      return;
    }
    if (singleQuizDetails) {
      setPublishing(true);
      const result = await runPublishQuiz(singleQuizDetails?._id, formData);
      if (result) {
        startManageQuiz(singleQuizDetails?._id);
      }
      setPublishing(false);
    }
  };

  return (
    <Wrapper>
      {isLoading || !singleQuizDetails ? (
        <div className="loading-container">
          <Loading />
        </div>
      ) : (
        <>
          <span className="cancel-btn" onClick={() => endManageQuiz()}>
            ❌
          </span>
          <div className="content-container">
            <div className="content">
              <div className="alert-div">{showAlert && <Alert />}</div>
              <div className="content-main">
                {singleQuizDetails.published ? (
                  <p className="content-status">
                    <FcInfo className="status-icon" />
                    This quiz has been published.{" "}
                    <span
                      className="publish-start"
                      onClick={() => setPublishQuiz((item) => !item)}
                    >
                      Edit publish details?
                    </span>
                  </p>
                ) : (
                  <p className="content-status">
                    <FcInfo className="status-icon" />
                    This quiz has not been published. click{" "}
                    <span
                      className="publish-start"
                      onClick={() => setPublishQuiz((item) => !item)}
                    >
                      here
                    </span>{" "}
                    to publish
                  </p>
                )}
                {publishQuiz && (
                  <>
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
                      <button
                        className="btn"
                        onClick={executePublishQuiz}
                        disabled={publishing}
                      >
                        Publish
                      </button>
                    </div>
                  </>
                )}
                {singleQuizDetails && (
                  <SingleQuiz
                    quiz={singleQuizDetails}
                    extraDetails={true}
                    viewAddParticipant={() => setAddParticipantModal(true)}
                  />
                )}
                {!isLoading && (
                  <AllQuestions quizDetails={singleQuizQuestions} />
                )}
              </div>
              <div className="side-bar">
                <AddParticipant />
              </div>
            </div>
          </div>
        </>
      )}
      {addParticipantModal && (
        <>
          <div
            className="add-participant-modal"
            onClick={() => setAddParticipantModal(false)}
          ></div>
          <div className="add-participant-card">
            <AddParticipant />
          </div>
        </>
      )}
    </Wrapper>
  );
};

export default ViewSingleQuiz;
