import React from "react";
import Wrapper from "../../assets/wrappers/TakeTests";
import takeTestImg from "../../assets/images/take-test.svg";
import takeTestImg2 from "../../assets/images/take-test2.svg";
import { useNavigate } from "react-router-dom";

const TakeTests = () => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <div className="take-test-container">
        <h2>Take Tests From Anywhere Around The World</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim ve
        </p>
        <button className="btn" onClick={() => navigate("/start-test")}>
          Start Your Test
        </button>
      </div>
      <div className="img-div">
        <img src={takeTestImg} alt="" className="take-test take-test-right" />
        <img src={takeTestImg2} alt="" className="take-test take-test-left" />
      </div>
    </Wrapper>
  );
};

export default TakeTests;
