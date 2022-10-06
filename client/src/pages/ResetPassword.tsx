import React, { useState } from "react";
import { Navbar, Card, FormItem, Alert } from "../components";
import Wrapper from "../assets/wrappers/Register";
import { useLocation } from "react-router-dom";
import useAppContext from "../store/appContext";

const initialState = {
  newPassword: "",
  confirmNewPass: "",
};

const ResetPassword = () => {
  const [formData, setFormData] = useState(initialState);
  const search = useLocation().search;

  const { validateInput, resetPassword, showAlert } = useAppContext();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((prevValue) => ({ ...prevValue, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const token = new URLSearchParams(search).get("token");
    const email = new URLSearchParams(search).get("email");
    const { newPassword, confirmNewPass } = formData;

    if (!newPassword || !confirmNewPass) {
      validateInput("Kindly input all details");
      return;
    }

    if (newPassword !== confirmNewPass) {
      validateInput("Kindly ensure password corresponds");
      return;
    }

    if (!token || !email) {
      validateInput("Something went wrong. Please try again later");
      return;
    }

    resetPassword({ newPassword,confirmNewPass, token, email });
  };

  return (
    <Wrapper>
      <Navbar />
      <div className="register-container">
        <Card>
          <h3 className="form-title">Reset Password</h3>
          <form onSubmit={handleSubmit}>
            {showAlert && <Alert />}
            <p className="forgot-pass-text">
              Please enter your new password below so we can help reset your
              account
            </p>
            <FormItem
              name={"newPassword"}
              placeholder={"new password"}
              type={"password"}
              value={formData.newPassword}
              onChange={handleChange}
            />
            <FormItem
              name={"confirmNewPass"}
              placeholder={"confirm password"}
              type={"password"}
              value={formData.confirmNewPass}
              onChange={handleChange}
            />
            <button className="btn">Submit</button>
          </form>
        </Card>
        <div className="foot-div">
          <p className="foot-text">
            If you’re here to take tests,{" "}
            <span className="log-in">login here</span>{" "}
          </p>
        </div>
      </div>
    </Wrapper>
  );
};

export default ResetPassword;
