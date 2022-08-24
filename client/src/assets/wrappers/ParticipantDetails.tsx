import styled from "styled-components";

const Wrapper = styled.div`
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
  box-shadow: var(--shadow-2);

  .quiz-content {
    max-width: 1200px;
    margin: 0 auto;
  }

  .quiz-details-title {
    border-bottom: solid 1px var(--primary-200);
    display: flex;
    font-size: 0.9rem;
    margin-bottom: 0.5em;
  }

  @media (min-width: 900px) {
    order: 2;
    grid-template-columns: 1fr;
    
    .quiz-content {
      display: grid;
      grid-template-columns: 1fr 300px;
      gap: 2em;
    }

    .quiz-questions {
      order: 1;
    }
  }
`;
export default Wrapper;
