import React from "react";
import useAppContext from "../store/appContext";
import Wrapper from "../assets/wrappers/AllQuiz";
import SingleQuiz from "./SingleQuiz";
import Loading from "./Loading";

const AllQuiz: React.FC = () => {
  const { quiz, isLoading } = useAppContext();

  const content = quiz.map((item) => {
    return <SingleQuiz key={item._id.toString()} quiz={{ ...item }} />;
  });

  if (isLoading) {
    <Wrapper>
      <Loading />
    </Wrapper>;
  }

  if (quiz.length < 1) {
    return (
      <Wrapper>
        <h4>No Jobs To Show</h4>
      </Wrapper>
    );
  }

  return <Wrapper>{content}</Wrapper>;
};

export default AllQuiz;
