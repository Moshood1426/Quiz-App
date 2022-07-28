import React from "react";
import Wrapper from "../../assets/wrappers/Intro";
import introImg from "../../assets/images/LandingImg.svg";
import { useNavigate } from "react-router-dom";

const Intro = () => {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <div className="intro-container">
        <div className="intro-img-div">
          <img src={introImg} alt="asking questions" />
        </div>
        <div className="intro-text-div">
          <h1>A New Approach To Quizing Students</h1>
          <p>
            Create intuitive test to engage your students from anywhere around
            the world
          </p>
          <button
            className="btn"
            onClick={() => {
              navigate("/register", { replace: true });
            }}
          >
            Sign up Today
          </button>
        </div>
      </div>
    </Wrapper>
  );
};

export default Intro;
