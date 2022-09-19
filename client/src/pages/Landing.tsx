import React from "react";
import {
  Navbar,
  Intro,
  Process,
  Explore,
  TakeTests,
  Footer,
} from "../components";
import Wrapper from "../assets/wrappers/Landing";

const Landing: React.FC = () => {
  return (
    <Wrapper>
      <Navbar />
      <Intro />
      <Process />
      <Explore />
      <TakeTests />
      <Footer />
    </Wrapper>
  );
};

export default Landing;
