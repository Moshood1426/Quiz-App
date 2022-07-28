import React from "react";
import Wrapper from "../../assets/wrappers/Easiness";
import background from "../../assets/images/easiness-img.jpg"

const Easiness = () => {
  return (
    <Wrapper>
      <h2 className="easiness-title">The Easiness We Offer</h2>
      <div className="easiness-container">
        <div className="easiness easiness-one">
          <div className="easiness-img-div"></div>
          <div className="easiness-text-div">
            <h4>Lorem ipstnssw </h4>
            <p>
              Lorem ipsum dolor sit amet, tur adipiscing elit, sed , Lorem ipsum
              dolor sit amet, tur adipiscing elit, sed{" "}
            </p>
          </div>
        </div>
        <div className="easiness easiness-two">
          <div className="easiness-img-div"></div>
          <div className="easiness-text-div">
            <h4>Lorem ipstnssw </h4>
            <p>
              Lorem ipsum dolor sit amet, tur adipiscing elit, sed , Lorem ipsum
              dolor sit amet, tur adipiscing elit, sed{" "}
            </p>
          </div>
        </div>
        <div className="easiness easiness-three">
          <div className="easiness-img-div"></div>
          <div className="easiness-text-div">
            <h4>Lorem ipstnssw </h4>
            <p>
              Lorem ipsum dolor sit amet, tur adipiscing elit, sed , Lorem ipsum
              dolor sit amet, tur adipiscing elit, sed{" "}
            </p>
          </div>
        </div>
        <div className="easiness easiness-four">
          <div className="easiness-img-div"></div>
          <div className="easiness-text-div">
            <h4>Lorem ipstnssw </h4>
            <p>
              Lorem ipsum dolor sit amet, tur adipiscing elit, sed , Lorem ipsum
              dolor sit amet, tur adipiscing elit, sed{" "}
            </p>
          </div>
        </div>
      </div>
      <div className="easiness-btn-div">
        <button className="btn easiness-btn">Get Started</button>
      </div>
      <img src={background} className="easiness-background" alt="answering questions"/>
    </Wrapper>
  );
};

export default Easiness;
