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
    padding: 1em 2em;
    border-bottom: var(--grey-200) solid 2px;
  }

  .img-div img {
    width: 100px;
  }

  .take-test-welcome {
    background-color: var(--primary-400);
    color: var(--primary-300);
    padding: 0.5em;
    font-size: 1.2rem;
    border-radius: 10px;
    text-align: center;
    margin-bottom: 1em;
    margin-top: .75em;
  }

  .quiz-details {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 2em;
    place-content: start;
    border: var(--grey-200) solid 1px;
    padding: 2em 1em;
    padding-bottom: 1em;
    border-radius: 10px;
    height: fit-content;
    margin-bottom: 2em;
    box-shadow: var(--shadow-2)
  }

  .quiz-details-title {
    border-bottom: solid 1px var(--primary-200);
    display: flex;
    font-size: 0.9rem;
    margin-bottom: 0.5em;
  }

  @media (min-width: 900px) {
    .quiz-content {
      display: grid;
      grid-template-columns: 1fr 300px;
      gap: 2em;
    }

    .quiz-details {
      order: 2;
      grid-template-columns: 1fr;
    }

    .quiz-questions {
      order: 1;
    }
  }
`;
export default Wrapper;
