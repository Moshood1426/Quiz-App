import React from "react";
import Wrapper from "../../assets/wrappers/Explore";
import exploreImg from "../../assets/images/explore.svg";

const Explore = () => {
  return (
    <Wrapper>
      <div className="explore-container">
        <div className="explore-img-div">
          <img src={exploreImg} alt="explore" />
        </div>
        <div className="explore-text-div">
          <span>Looking for open questions?</span>
          <h2>Explore Pre-existing Questions Based On Your Field Of Study</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incidid
          </p>
          <button className="btn">Explore Now</button>
        </div>
      </div>
    </Wrapper>
  );
};

export default Explore;
