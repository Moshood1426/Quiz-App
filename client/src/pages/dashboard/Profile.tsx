import React, { useState } from "react";
import Wrapper from "../../assets/wrappers/Profile";
import { FormSelectItem, FormItem, Alert } from "../../components";
import { FaUserCircle } from "react-icons/fa";
import { RiLockPasswordFill, RiDeleteBin6Fill } from "react-icons/ri";

const initialState = {
  name: "",
  email: "",
  oldPassword: "",
  newPassword: "",
};

const Profile = () => {
  const [formData, setFormData] = useState(initialState);

  const handleChange = () => {};

  return (
    <Wrapper>
      <h3 className="profile-title">Profile</h3>
      <div className="profile-card">
        <div className="profile-card-item">
          <h5 className="profile-card-item-title">
            <FaUserCircle className="profile-card-item-icon" />
            Account Settings
          </h5>
          <form>
            <FormItem
              label={true}
              labelText="Quiz Title"
              name={"quizTitle"}
              placeholder={"enter quiz title"}
              type={"text"}
              value={formData.name}
              onChange={handleChange}
            />
            <FormItem
              label={true}
              labelText="Quiz Title"
              name={"quizTitle"}
              placeholder={"enter quiz title"}
              type={"text"}
              value={formData.email}
              onChange={handleChange}
            />
            <FormItem
              label={true}
              labelText="Quiz Title"
              name={"quizTitle"}
              placeholder={"enter quiz title"}
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
          <form>
            <FormItem
              label={true}
              labelText="New Password"
              name={"newPassword"}
              type={"text"}
              value={formData.newPassword}
              onChange={handleChange}
            />
            <FormItem
              label={true}
              labelText="Old Password"
              name={"oldPassword"}
              type={"text"}
              value={formData.oldPassword}
              onChange={handleChange}
            />
            <button type="submit" className="btn profile-btn">
              Submit
            </button>
          </form>
        </div>
        <div className="profile-card-item">
          <h5 className="profile-card-item-title">
            <RiDeleteBin6Fill className="profile-card-item-icon"/>
            Delete Account
          </h5>
          <form>
            <FormItem
              label={true}
              labelText="Quiz Title"
              name={"quizTitle"}
              placeholder={"enter quiz title"}
              type={"text"}
              value={formData.name}
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
