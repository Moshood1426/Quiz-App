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

  const { showAlert } = useAppContext();
  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((prevValue) => ({ ...prevValue, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    console.log(formData)
    setFormData(initialState)
  };

  return (
    <Wrapper>
      <div className="img-div">
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
          <button className="btn" type="submit">
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
    </Wrapper>
  );
};

export default CheckResults;
