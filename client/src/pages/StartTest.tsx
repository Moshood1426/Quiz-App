import React, { useState } from "react";
import Logo from "../components/Logo";
import Wrapper from "../assets/wrappers/StartTest";
import { Card, FormItem } from "../components";
import { useNavigate } from "react-router-dom";
import useAppContext from "../store/appContext";

const initialState = {
  quizCode: "",
  identifier: "",
};

const StartTest = () => {
  const [formData, setFormData] = useState(initialState);
  const { singleQuizDetails } = useAppContext()

  const navigate = useNavigate();

  const handleChange = () => {};

  return (
    <Wrapper>
      <div className="img-div">
        <Logo />
      </div>
      <p className="sub-title">Some description if needed</p>
      <Card>
        <form>
          <h4 className="form-title">Enter Quiz Details</h4>
          <p className="forgot-pass-text">
            Kindly enter the unique quiz code and we fetch the questions for
            you.
          </p>
          <FormItem
            name={"quizCode"}
            placeholder={"enter quiz code"}
            type={"email"}
            value={formData.quizCode}
            onChange={handleChange}
          />
          <button className="btn">Submit</button>
        </form>
      </Card>
      <div className="foot-div">
        <p className="foot-text">
          Are  you the mentor?{" "}
          <span className="log-in" onClick={() => navigate("/register")}>
            login here
          </span>{" "}
        </p>
      </div>
    </Wrapper>
  );
};

export default StartTest;
