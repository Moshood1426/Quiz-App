import React from "react";
import Wrapper from "../assets/wrappers/AllSubmisson";
import useAppContext from "../store/appContext";
import SingleSubmission from "./SingleSubmission";

const AllSubmission = () => {
  const { quizWithSubmission } = useAppContext();

  return (
    <Wrapper>
      {quizWithSubmission.map((item) => {
        return (
          <SingleSubmission item={item} key={item._id.toString()}/>
        );
      })}
    </Wrapper>
  );
};

export default AllSubmission;
