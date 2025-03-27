import React, { useState } from "react";
import moderated from "../../assets/images/quick-quiz.jpg";
import quick from "../../assets/images/quick.jpg";
import Wrapper from "../../assets/wrappers/CreateQuiz";
import { CreateQuizModal } from "../../components";

const CreateQuiz = () => {
  const [displayModal, setDisplayModal] = useState(false);
  const [type, setType] = useState<"quick" | "moderated">("quick");

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
              Generate quizzes instantly with a vast collection of pre-made
              questions. Customize tests effortlessly and assess your students
              with ease.
            </p>
            <button
              className="btn create-quiz-btn quick-quiz-btn"
              onClick={() => {
                setType("quick");
                setDisplayModal(true);
              }}
            >
              Start Now
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
              Explore our tools to create structured quizzes one question at a
              time. Customize each question to fit your needs and build a
              tailored assessment effortlessly.
            </p>
            <button
              className="btn create-quiz-btn moderated-quiz-btn"
              onClick={() => {
                setType("moderated");
                setDisplayModal(true);
              }}
            >
              Start Now
            </button>
          </div>
        </div>
      </div>
      {displayModal && (
        <CreateQuizModal
          toggleDisplay={() => setDisplayModal(false)}
          type={type}
        />
      )}
    </Wrapper>
  );
};

export default CreateQuiz;
