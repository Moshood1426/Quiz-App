import React from "react";
import {
  Navbar,
  Intro,
  Process,
  Easiness,
  Explore,
  TakeTests,
  Footer,
} from "../components";

const Landing: React.FC = () => {
  return (
    <>
      <Navbar />
      <Intro />
      <Process />
      <Explore />
      <TakeTests />
      <Footer />
    </>
  );
};

export default Landing;
