import React, { useState } from "react";
import Logo from "../components/Logo";
import Wrapper from "../assets/wrappers/StartTest";
import { Card, FormItem } from "../components";
import { useNavigate } from "react-router-dom";

const initialState = {
  quizCode: "",
  identifier: "",
};

const StartTest = () => {
  const [formData, setFormData] = useState(initialState);

  const navigate = useNavigate()

  const handleChange = () => {};
  return (
    <Wrapper>
      <div className="img-div">
        <Logo />
      </div>
      <p className="sub-title">Some description if needed</p>
      <div className="toggle-status">
        <p className="active">Private</p>
        <p>Public</p>
      </div>
      <Card>
        <form>
        <h4 className="form-title">
            Enter Quiz Details
          </h4>
          <FormItem
            name={"quizCode"}
            placeholder={"enter quiz code"}
            type={"email"}
            value={formData.quizCode}
            onChange={handleChange}
          />
          <FormItem
            name={"identifier"}
            placeholder={"enter identifier"}
            type={"password"}
            value={formData.identifier}
            onChange={handleChange}
          />
          <button className="btn">Submit</button>
        </form>
      </Card>
      <div className="foot-div">
        <p className="foot-text">
          Are you the mentor?{" "}
          <span className="log-in" onClick={() => navigate("/register")}>login here</span>{" "}
        </p>
      </div>
    </Wrapper>
  );
};

export default StartTest;