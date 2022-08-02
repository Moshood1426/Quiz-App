import React, { useEffect, useState } from "react";
import { Navbar, Card, FormItem, Alert } from "../components";
import Wrapper from "../assets/wrappers/Register";
import useAppContext from "../store/appContext";
import { useNavigate } from "react-router-dom";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

const Register: React.FC = () => {
  const [formData, setFormData] = useState(initialState);
  const [clientIsUser, setClientIsUser] = useState(false);
  const [forgotCredentials, setForgotCredentials] = useState(false);
  const {
    register,
    login,
    validateInput,
    forgotPassword,
    user,
    isLoading,
    showAlert,
  } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
    //eslint-disable-next-line
  }, [user]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((prevValue) => ({ ...prevValue, [name]: value }));
  };

  const toggleClientIsUser = (action: "register" | "login") => {
    setForgotCredentials(false);
    if (action === "register") {
      setClientIsUser(false);
    }
    if (action === "login") {
      setClientIsUser(true);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { firstName, lastName, email, password } = formData;
    if (!email || !password) {
      validateInput();
      return;
    }
    if (!clientIsUser && (!firstName || !lastName)) {
      validateInput();
      return;
    }

    let reqObj;
    if (!clientIsUser) {
      reqObj = { firstName, lastName, email, password };
      register(reqObj);
    } else {
      reqObj = { email, password };
      login(reqObj);
    }
    setFormData(initialState);
  };

  const handleForgotPassword = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formData.email) {
      validateInput();
      return;
    }

    forgotPassword(formData.email);
    setFormData(initialState);
  };

  if (forgotCredentials) {
    return (
      <Wrapper>
        <Navbar />
        <div className="register-container">
          <div className="toggle-status">
            <p
              onClick={() => toggleClientIsUser("register")}
              className={!clientIsUser ? "active" : ""}
            >
              register
            </p>
            <p
              onClick={() => toggleClientIsUser("login")}
              className={clientIsUser ? "active" : ""}
            >
              login
            </p>
          </div>
          <Card>
            <h3 className="form-title">Forgot Credentials</h3>
            {showAlert && <Alert />}
            <form onSubmit={handleForgotPassword}>
              <p className="forgot-pass-text">
                Please enter your email address below so we can help recover
                your account
              </p>
              <FormItem
                name={"email"}
                placeholder={"email address"}
                type={"email"}
                value={formData.email}
                onChange={handleChange}
              />
              <button className="btn">Submit</button>
              <span
                className="forgot-pass"
                onClick={() => {
                  setForgotCredentials(false);
                }}
              >
                Back To Login?
              </span>
            </form>
          </Card>
          <div className="foot-div">
            <p className="foot-text">
              If you’re here to take tests,{" "}
              <span className="log-in" onClick={() => navigate("/start-test")}>
                login here
              </span>{" "}
            </p>
          </div>
        </div>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <Navbar />
      <div className="register-container">
        <div className="toggle-status">
          <p
            onClick={() => toggleClientIsUser("register")}
            className={!clientIsUser ? "active" : ""}
          >
            register
          </p>
          <p
            onClick={() => toggleClientIsUser("login")}
            className={clientIsUser ? "active" : ""}
          >
            login
          </p>
        </div>
        <Card>
          <h3 className="form-title">
            {clientIsUser ? "Sign In" : "Register"}
          </h3>
          {showAlert && <Alert />}
          <form onSubmit={handleSubmit}>
            {!clientIsUser && (
              <div className="form-name">
                <FormItem
                  name={"firstName"}
                  placeholder={"first name"}
                  type={"text"}
                  value={formData.firstName}
                  onChange={handleChange}
                />
                <FormItem
                  name={"lastName"}
                  placeholder={"last name"}
                  type={"text"}
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
            )}
            <FormItem
              name={"email"}
              placeholder={"email address"}
              type={"email"}
              value={formData.email}
              onChange={handleChange}
            />
            <FormItem
              name={"password"}
              placeholder={"password"}
              type={"password"}
              value={formData.password}
              onChange={handleChange}
            />
            <button className="btn" disabled={isLoading}>
              Submit
            </button>
            {clientIsUser && (
              <span
                className="forgot-pass"
                onClick={() => setForgotCredentials(true)}
              >
                Forgot password?
              </span>
            )}
          </form>
        </Card>
        <div className="foot-div">
          <p className="foot-text">
            If you’re here to take tests,{" "}
            <span className="log-in" onClick={() => navigate("/start-test")}>
              login here
            </span>{" "}
          </p>
        </div>
      </div>
    </Wrapper>
  );
};

export default Register;
