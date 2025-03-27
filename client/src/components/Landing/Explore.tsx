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
          <h2>Explore Pre-existing Questions From Our Database</h2>
          <p>
            Avoiding the stress of setting finding the right questions? Let's
            help with our amazing data of questions available for several fields
            and subjects of study.
          </p>
          <button className="btn">Explore Now</button>
        </div>
      </div>
    </Wrapper>
  );
};

export default Explore;
