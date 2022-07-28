import React from "react";
import Wrapper from "../../assets/wrappers/TakeTests";
import takeTestImg from "../../assets/images/take-test.svg";
import takeTestImg2 from "../../assets/images/take-test2.svg";

const TakeTests = () => {
  return (
    <Wrapper>
      <div className="take-test-container">
        <h2>Take Tests With One-Click From Anywhere Around The World</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim ve
        </p>
        <button className="btn">Start Your Test</button>
      </div>
      <div className="img-div">
        <img src={takeTestImg} alt="" className="take-test take-test-right" />
        <img src={takeTestImg2} alt="" className="take-test take-test-left" />
      </div>
    </Wrapper>
  );
};

export default TakeTests;
