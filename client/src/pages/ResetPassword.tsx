import React, { useState } from 'react'
import { Navbar, Card, FormItem } from "../components";
import Wrapper from '../assets/wrappers/Register';

const initialState = {
    newPassword: "",
    confirmNewPass: ""
}

const ResetPassword = () => {
    const [formData, setFormData] = useState(initialState)

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name;
        const value = event.target.value;
        setFormData((prevValue) => ({ ...prevValue, [name]: value }));
      };

  return (
    <Wrapper>
       <Navbar />
        <div className="register-container">
          <Card>
            <h3 className="form-title">Reset Password</h3>
            <form>
              <p className="forgot-pass-text">
                Please enter your new password below so we can help reset
                your account
              </p>
              <FormItem
                name={"newPassword"}
                placeholder={"new password"}
                type={"text"}
                value={formData.newPassword}
                onChange={handleChange}
              />
              <FormItem
                name={"confirmNewPass"}
                placeholder={"email address"}
                type={"email"}
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
  )
}

export default ResetPassword
