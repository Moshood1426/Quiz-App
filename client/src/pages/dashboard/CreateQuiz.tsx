import React, { useState } from "react";
import moderated from "../../assets/images/quick-quiz.jpg";
import quick from "../../assets/images/quick.jpg";
import Wrapper from "../../assets/wrappers/CreateQuiz";
import { CreateQuizModal } from "../../components";

const CreateQuiz = () => {
  const [displayModal, setDisplayModal] = useState(false);

  return (
    <Wrapper>
      <h3 className="title">Create Quiz</h3>
      <div className="create-quiz-container">
        <div className="create-quiz-div quick-quiz">
          <div className="create-quiz-img-div">
            <img src={quick} alt="" />
          </div>
          <div className="create-quiz-text-div">
            <h4 className="create-quiz-text-title quick-quiz-title">
              Quick Quiz
            </h4>
            <p className="create-quiz-text-subtitle">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim ve
            </p>
            <button className="btn create-quiz-btn quick-quiz-btn">
              Start Now
            </button>
            <button className="btn create-quiz-btn quick-quiz-learn-btn">
              Learn More
            </button>
          </div>
        </div>

        <div className="create-quiz-div moderated-quiz">
          <div className="create-quiz-img-div">
            <img src={moderated} alt="" />
          </div>
          <div className="create-quiz-text-div">
            <h4 className="create-quiz-text-title moderated-quiz-title">
              Moderated Quiz
            </h4>
            <p className="create-quiz-text-subtitle">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim ve
            </p>
            <button
              className="btn create-quiz-btn moderated-quiz-btn"
              onClick={() => setDisplayModal(true)}
            >
              Start Now
            </button>
            <button className="btn create-quiz-btn moderated-quiz-learn">
              Learn More
            </button>
          </div>
        </div>
      </div>
      {displayModal && (
        <CreateQuizModal toggleDisplay={() => setDisplayModal(false)} />
      )}
    </Wrapper>
  );
};

export default CreateQuiz;
