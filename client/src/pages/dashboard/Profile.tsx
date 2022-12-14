import React, { useState, useEffect } from "react";
import Wrapper from "../../assets/wrappers/Profile";
import { FormItem, Alert } from "../../components";
import { FaUserCircle } from "react-icons/fa";
import { RiLockPasswordFill, RiDeleteBin6Fill } from "react-icons/ri";
import useAppContext from "../../store/appContext";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  deleteEmail: "",
  confirmNewPassword: "",
  newPassword: "",
};

const Profile = () => {
  const [formData, setFormData] = useState(initialState);

  const {
    validateInput,
    showAlert,
    user,
    updateUser,
    updatePassword,
    deleteAccount:executeDeleteAccount,
  } = useAppContext();

  useEffect(() => {
    if (user) {
      const { firstName, lastName, email } = user;
      setFormData({ ...formData, firstName, lastName, email });
    }
    //eslint-disable-next-line
  }, []);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((prevValue) => ({ ...prevValue, [name]: value }));
  };

  const changeProfileDetails = (event: React.FormEvent) => {
    event.preventDefault();
    const { firstName, lastName, email } = formData;

    if (!firstName || !lastName || !email) {
      validateInput("Kindly input all required details");
      return;
    }

    updateUser({ firstName, lastName, email });
  };

  const changePassword = (event: React.FormEvent) => {
    event.preventDefault();
    const { newPassword, confirmNewPassword } = formData;

    if (newPassword !== confirmNewPassword) {
      validateInput("Two passwords does not correspond");
      return;
    }
    if (newPassword.length < 6) {
      validateInput("Password cannot be less than 6 characters");
      return;
    }

    updatePassword({ newPassword, confirmNewPassword });
    setFormData({ ...formData, newPassword: "", confirmNewPassword: "" });
  };

  const deleteAccount = (event: React.FormEvent) => {
    event.preventDefault();
    const { email } = user!; //user cannot be null if logged in

    if (email !== formData.deleteEmail) {
      validateInput("email should correspond with user email address");
      return;
    }

    executeDeleteAccount()
  };

  return (
    <Wrapper>
      <h3 className="profile-title">Profile</h3>
      <div className="profile-card">
        <div className="profile-card-item">
          <h5 className="profile-card-item-title">
            <FaUserCircle className="profile-card-item-icon" />
            Account Settings
          </h5>
          <div className="alert-text">{showAlert && <Alert />}</div>
          <form onSubmit={changeProfileDetails}>
            <FormItem
              label={true}
              labelText="First Name"
              name={"firstName"}
              placeholder={"enter first name"}
              type={"text"}
              value={formData.firstName}
              onChange={handleChange}
            />
            <FormItem
              label={true}
              labelText="Last Name"
              name={"lastName"}
              placeholder={"enter last name"}
              type={"text"}
              value={formData.lastName}
              onChange={handleChange}
            />
            <FormItem
              label={true}
              labelText="Email"
              name={"email"}
              placeholder={"enter email address"}
              type={"text"}
              value={formData.email}
              onChange={handleChange}
            />
            <button type="submit" className="btn profile-btn">
              Submit
            </button>
          </form>
        </div>
        <div className="profile-card-item">
          <h5 className="profile-card-item-title">
            <RiLockPasswordFill className="profile-card-item-icon" />
            Password Settings
          </h5>
          <form onSubmit={changePassword}>
            <FormItem
              label={true}
              labelText="New Password"
              name={"newPassword"}
              placeholder={"enter new password"}
              type={"password"}
              value={formData.newPassword}
              onChange={handleChange}
            />
            <FormItem
              label={true}
              labelText="Confirm New Password"
              name={"confirmNewPassword"}
              placeholder={"re-enter new password"}
              type={"password"}
              value={formData.confirmNewPassword}
              onChange={handleChange}
            />
            <button type="submit" className="btn profile-btn">
              Submit
            </button>
          </form>
        </div>
        <div className="profile-card-item">
          <h5 className="profile-card-item-title">
            <RiDeleteBin6Fill className="profile-card-item-icon" />
            Delete Account
          </h5>
          <form onSubmit={deleteAccount}>
            <p>
              We're sorry for any form of uncomfortability experienced during
              usage of this platform. Kindly enter your email to proceed with
              account deletion
            </p>
            <FormItem
              label={true}
              labelText="Email address"
              name={"deleteEmail"}
              placeholder={"enter email address"}
              type={"text"}
              value={formData.deleteEmail}
              onChange={handleChange}
            />
            <button type="submit" className="btn profile-btn">
              Submit
            </button>
          </form>
        </div>
      </div>
    </Wrapper>
  );
};

export default Profile;
