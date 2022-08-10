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
    padding: 1em 2em;
  }

  .img-div img {
    width: 100px;
  }

  .take-test-welcome {
    background-color: var(--primary-200);
    color: var(--white);
    padding: .5em;
    font-size: 1.2rem;
    border-radius: 10px;
    text-align: center;
    margin-bottom: 1em;
  }

  .quiz-details {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 2em;
    padding-bottom: 2em;
  }

  .quiz-details-title {
    border-bottom: solid 1px var(--primary-200);
    display: flex;
    font-size: 0.9rem;
    margin-bottom: .5em;
  }

  @media(min-width: 850px) {
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
