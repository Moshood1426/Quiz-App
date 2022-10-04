import styled from "styled-components";

const Wrapper = styled.div`
  padding-bottom: 3em;

  .title {
    font-weight: bold;
    color: var(--grey-700);
    margin-bottom: 1em;
  }

  .create-quiz-div {
    padding: 1.5em;
    margin-bottom: 3em;
  }

  .create-quiz-div:last-child {
    margin-bottom: 0em;
  }

  .create-quiz-img-div {
    height: 20vh;
  }

  img {
    height: 100%;
  }

  .create-quiz-text-div {
    padding: 1.5em 0;
  }

  .create-quiz-text-title {
    font-weight: bold;
  }

  p {
    max-width: 50em;
  }

  .create-quiz-btn {
    padding: 0.85em 2em;
  }

  .create-quiz-btn:hover {
    opacity: 0.6;
  }

  .quick-quiz {
    background-color: #cbecec;
  }

  .quick-quiz-title {
    color: #2a480b;
  }

  .quick-quiz-btn {
    background-color: #94d7a2;
    color: #2a480b;
  }

  .quick-quiz-learn-btn {
    color: #94d7a2;
    background-color: #2a480b;
    margin-left: 1em;
    opacity: 0.7;
  }

  .moderated-quiz {
    background-color: #fce7ff;
  }

  .moderated-quiz-title {
    color: #400a45;
  }

  .moderated-quiz-btn {
    color: #400a45;
    background-color: #ce93d3;
  }

  .moderated-quiz-learn {
    background-color: #400a45;
    color: #ce93d3;
    margin-left: 1em;
    opacity: 0.8;
  }

  @media (min-width: 800px) {
    .create-quiz-container {
      display: flex;
      gap: 2em;
      max-width: var(--max-width);
    }

    .create-quiz-div:last-child {
      margin-bottom: 3em;
    }
  }
`;
export default Wrapper;
