import React, { useState } from "react";
import Wrapper from "../assets/wrappers/StartTest";
import { Card, Alert, FormItem } from "../components";
import Logo from "../components/Logo";
import useAppContext from "../store/appContext";
import { useNavigate } from "react-router-dom";

const initialState = {
  identifier: "",
  quizCode: "",
};

const CheckResults = () => {
  const [formData, setFormData] = useState(initialState);

  const {
    showAlert,
    isLoading,
    participantResult,
    validateInput,
    checkResults,
    resetCheckResults,
  } = useAppContext();
  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((prevValue) => ({ ...prevValue, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const { quizCode, identifier } = formData;
    if (!quizCode || !identifier) {
      validateInput("Kindly input required details");
      return;
    }
    checkResults(quizCode, identifier);
    setFormData(initialState);
  };

  return (
    <Wrapper>
      <div className="img-div" onClick={() => navigate("/landing")}>
        <Logo />
      </div>
      <p className="sub-title">Check results of your test</p>
      <Card>
        <form onSubmit={handleSubmit}>
          <h4 className="form-title">Enter User Details</h4>
          {showAlert && <Alert />}
          <p className="forgot-pass-text">
            Kindly enter your unique identifier alongside the quiz code and we
            fetch the result for you.
          </p>
          <FormItem
            name={"identifier"}
            placeholder={"enter participant identifier"}
            type={"text"}
            value={formData.identifier}
            onChange={handleChange}
          />
          <FormItem
            name={"quizCode"}
            placeholder={"enter quiz code"}
            type={"text"}
            value={formData.quizCode}
            onChange={handleChange}
          />
          <button className="btn" type="submit" disabled={isLoading}>
            Submit
          </button>
        </form>
      </Card>
      <div className="foot-div">
        <p className="foot-text">
          Here to take test?{" "}
          <span className="log-in" onClick={() => navigate("/start-test")}>
            login here
          </span>{" "}
        </p>
      </div>

      {participantResult.quizCode && (
        <div className="result-modal">
          <div
            className="result-modal-bg"
            onClick={() => resetCheckResults()}
          ></div>
          <div className="result-content">
            <div>
              <span className="quiz-details-title">Student name:</span>
              <h5>
                {participantResult.firstName + " " + participantResult.lastName}
              </h5>
            </div>
            <div>
              <span className="quiz-details-title">identifier:</span>
              <h5>{participantResult.identifier}</h5>
            </div>
            <div>
              <span className="quiz-details-title">Quiz Title:</span>
              <h5>{participantResult.quizTitle}</h5>
            </div>
            <div>
              <span className="quiz-details-title">Quiz Code:</span>
              <h5>{participantResult.quizCode}</h5>
            </div>
            <div>
              <span className="quiz-details-title">Points Obtainable</span>
              <h5>{participantResult.pointsObtainable} points</h5>
            </div>
            <div>
              <span className="quiz-details-title">Points Obtained</span>
              <h5>{participantResult.pointsObtained} points</h5>
            </div>
            <div>
              <span className="quiz-details-title">Percentage(%)</span>
              <h5>{participantResult.percentage}%</h5>
            </div>
            <div>
              <span className="quiz-details-title">Remarks</span>
              <h5>{participantResult.remarks}</h5>
            </div>
            <button className="btn" onClick={() => resetCheckResults()}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </Wrapper>
  );
};

export default CheckResults;
