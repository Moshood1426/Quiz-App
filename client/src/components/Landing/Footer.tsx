import React from "react";
import { BsTwitter, BsFacebook, BsReddit, BsPinterest } from "react-icons/bs";
import Wrapper from "../../assets/wrappers/Footer";

const Footer = () => {
  return (
    <Wrapper>
      <div className="footer-container">
        <p className="footer-title">
          Looking to share this experience? Share via
        </p>
        <div className="footer-icons-div">
          <BsTwitter className="footer-icons-div-child" />
          <BsFacebook className="footer-icons-div-child" />
          <BsReddit className="footer-icons-div-child" />
          <BsPinterest />
        </div>
      </div>
    </Wrapper>
  );
};

export default Footer;
