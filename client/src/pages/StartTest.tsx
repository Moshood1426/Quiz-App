import React, { useEffect, useState } from "react";
import Logo from "../components/Logo";
import Wrapper from "../assets/wrappers/StartTest";
import { Alert, Card, FormItem } from "../components";
import { useNavigate } from "react-router-dom";
import useAppContext from "../store/appContext";

const initialState = {
  quizCode: "",
  identifier: "",
  firstName: "",
  lastName: "",
  email: ""
};

const StartTest = () => {
  const [formData, setFormData] = useState(initialState);
  const {
    showAlert,
    singleQuizDetails,
    validateParticipant,
    authorizeParticipant: authParticipant,
    validateInput,
    getTestBegin,
  } = useAppContext();

  const navigate = useNavigate();

  useEffect(() => {
    if(validateParticipant) {
      navigate("/take-test")
    }
    //eslint-disable-next-line
  }, [validateParticipant])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((prevValue) => ({ ...prevValue, [name]: value }));
  };

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formData.quizCode) {
      validateInput();
      return;
    }
    getTestBegin(formData.quizCode);
  };

  const authorizeParticipant = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    if (singleQuizDetails?.privacy === false) {
      if (!formData.firstName || !formData.lastName || !formData.email) {
        validateInput();
        return;
      }
      const reqObj = {
        quizId: singleQuizDetails._id,
        privacy: singleQuizDetails.privacy,
        identifier: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
      };
      authParticipant(reqObj);
    } else {
      if(!formData.identifier) {
        validateInput()
        return
      }
      const reqObj = {
        quizId: singleQuizDetails!._id,
        privacy: singleQuizDetails!.privacy,
        identifier: formData.identifier,
      };
      authParticipant(reqObj);
    }
  };

  //pops up if single quiz details is private
  const privateQuizForm = (
    <form onSubmit={authorizeParticipant}>
      <h4 className="form-title">Enter Quiz Details</h4>
      {showAlert && <Alert />}
      <p className="forgot-pass-text">
        This quiz is only accesible to certain participant. Kindly enter your
        unique identifer to proceed.
      </p>
      <FormItem
        name={"identifier"}
        placeholder={"enter unique identifier"}
        type={"text"}
        value={formData.identifier}
        onChange={handleChange}
      />
      <button type="submit" className="btn">
        Submit
      </button>
    </form>
  );

  //pops up if single quiz details is private
  const publicQuizForm = (
    <form onSubmit={authorizeParticipant}>
      <h4 className="form-title">Enter Quiz Details</h4>
      {showAlert && <Alert />}
      <p className="forgot-pass-text">
        You are required to enter your details to proceed with this quiz
      </p>
      <FormItem
        name={"email"}
        placeholder={"enter email address"}
        type={"email"}
        value={formData.email}
        onChange={handleChange}
      />
      <FormItem
        name={"firstName"}
        placeholder={"enter first name"}
        type={"firstName"}
        value={formData.firstName}
        onChange={handleChange}
      />
      <FormItem
        name={"lastName"}
        placeholder={"enter last name"}
        type={"lastName"}
        value={formData.lastName}
        onChange={handleChange}
      />
      <button className="btn" type="submit">
        Submit
      </button>
    </form>
  );

  return (
    <Wrapper>
      <div className="img-div">
        <Logo />
      </div>
      <p className="sub-title">Some description if needed</p>
      <Card>
        {singleQuizDetails ? (
          singleQuizDetails.privacy ? (
            privateQuizForm
          ) : (
            publicQuizForm
          )
        ) : (
          <form onSubmit={handleSubmit}>
            <h4 className="form-title">Enter Quiz Details</h4>
            {showAlert && <Alert />}
            <p className="forgot-pass-text">
              Kindly enter the unique quiz code and we fetch the questions for
              you.
            </p>
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
        )}
      </Card>
      <div className="foot-div">
        <p className="foot-text">
          Are you the mentor?{" "}
          <span className="log-in" onClick={() => navigate("/register")}>
            login here
          </span>{" "}
        </p>
      </div>
    </Wrapper>
  );
};

export default StartTest;
