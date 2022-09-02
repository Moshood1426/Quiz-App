import React from "react";
import useAppContext from "../store/appContext";
import Wrapper from "../assets/wrappers/AllQuiz";
import SingleQuiz from "./SingleQuiz";
import Loading from "./Loading";
import noQuizFound from "../assets/images/no-quiz-found.svg";

const AllQuiz: React.FC = () => {
  const { quiz, isLoading } = useAppContext();

  const content = quiz?.map((item) => {
    return <SingleQuiz key={item._id.toString()} quiz={{ ...item }} />;
  });

  if (isLoading) {
    <Wrapper>
      <Loading />
    </Wrapper>;
  }

  if ((quiz === null || quiz.length < 1) && !isLoading) {
    return (
      <Wrapper>
        <h4 className="manage-quiz-title">Welcome! Proceed to create quiz to start setting quiz?</h4>
        
        <div className="img-div">
          <img src={noQuizFound} alt="Manage quiz logo" />
        </div>
      </Wrapper>
    );
  }

  return <Wrapper>{content}</Wrapper>;
};

export default AllQuiz;
