import styled from "styled-components";

const Wrapper = styled.div`
  background-color: var(--primary-100);
  min-height: 100vh;

  .take-test-container {
    width: 90%;
    margin: 0 auto;
    max-width: 1200px;
  }

  .quiz-content {
    max-width: 1200px;
    margin: 0 auto;
  }

  .img-div {
    width: 100%;
    height: 8vh;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 2em 2em;
    //border-bottom: var(--grey-200) solid 2px;
    margin-bottom: 1em;
  }

  .img-div img {
    width: 100px;
  }

  .take-test-welcome {
    padding: 0.5em;
    font-size: 1.2rem;
    border-radius: 10px;
    margin-bottom: 1em;
    padding: 1em 2em;
    background-color: #fce7ff;
    color: #400a45;
    box-shadow: var(--shadow-2)
  }

  .welcome-text {
    margin: 0;
    margin-bottom: 0.5em;
  }

  .welcome-text-subtitle {
    font-size: 0.9rem;
    margin: 0;
    margin-bottom: 0.5em;
  }

  .instruction {
    list-style: circle;
    list-style-position: inside;
    font-size: 0.9rem;
    margin-top: 0;
  }

  .quiz-details {
    display: grid;
    grid-template-columns: 1fr;
    column-gap: 2em;
    place-content: start;
    border: var(--grey-200) solid 1px;
    padding: 2em 1em;
    padding-bottom: 1em;
    border-radius: 10px;
    height: fit-content;
    margin-bottom: 2em;
    box-shadow: var(--shadow-2);
    background-color: var(--primary-400);
  }

  .quiz-details-title {
    border-bottom: solid 1px var(--primary-200);
    display: flex;
    font-size: 0.9rem;
    margin-bottom: 0.5em;
  }

  @media (min-width: 600px) {
    .quiz-details {
      grid-template-columns: 1fr 1fr;
    }
  }

  @media (min-width: 900px) {
    .quiz-content {
      display: grid;
      grid-template-columns: 1fr 300px;
      grid-template-rows: min-content 1fr;
      gap: 2em;
    }

    .quiz-details {
      order: 2;
      grid-template-columns: 1fr;
      grid-column: 2/3;
      grid-row: 1/-1;
      padding-bottom: 3em;
      padding-top: 3em;
    }

    .quiz-questions {
      order: 1;
      grid-column: 1/2;
    }
  }
`;
export default Wrapper;
