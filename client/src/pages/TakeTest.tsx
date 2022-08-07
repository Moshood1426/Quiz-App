import React, { useEffect } from "react";
import Wrapper from "../assets/wrappers/TakeTest";
import Logo from "../components/Logo";
import useAppContext from "../store/appContext";
import SingleQuiz from "../components/SingleQuiz";
import Loading from "../components/Loading";

const TakeTest = () => {
  const { singleQuizDetails, isLoading, getParticipantQuizInfo } =
    useAppContext();

  useEffect(() => {
    getParticipantQuizInfo();
  }, []);
  return (
    <Wrapper>
      {isLoading ? <Loading /> :
        <>
          <div className="img-div">
            <Logo />
          </div>
          <div>
            <div></div>
            <div></div>
          </div>
          Take Test
        </>
      }
    </Wrapper>
  );
};

export default TakeTest;
