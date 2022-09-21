import styled from "styled-components";

const Wrapper = styled.div`
  .title {
    font-weight: bold;
    color: var(--grey-700);
    margin-bottom: 0.5em;
  }

  .submission-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .submission-header > span {
    color: var(--primary-brown);
    text-transform: uppercase;
    font-size: 1rem;
    cursor: pointer;
    padding-left: 2em;
    padding-right: 1em;
    font-weight: bold;
  }

  .no-submission {
    background-color: var(--primary-400);
    color: var(--green-dark);
    border-radius: 15px;
    padding: 0.75em 2em;
    text-align: center;
  }

  .submission-content {
    overflow: auto;
  }

  .single-participant {
    display: grid;
    grid-template-columns: 20px 1fr 2fr 1fr;
    gap: 2em;
    padding: 0.5em 0;
    border-bottom: solid 1px var(--grey-200);
    max-width: 100vw;
  }

  .single-participant-title {
    border-top: solid 2px var(--grey-300);
    border-bottom: solid 2px var(--grey-300);
    margin-top: 3em;
  }

  .single-participant-text {
    font-size: 0.85rem;
    font-weight: bold;
  }

  .single-participant > p {
    margin: 0;
  }

  .view-details {
    color: var(--primary-brown);
    text-transform: uppercase;
    font-size: 0.8rem;
    cursor: pointer;
  }

  .go-back {
    color: var(--primary-brown);
    text-transform: uppercase;
    font-size: 1rem;
    cursor: pointer;
    font-weight: bold;
    text-align: right;
    margin: 0;
    max-width: 100%;
    margin-bottom: 1em;
  }

  @media (min-width: 900px) {
    .quiz-content {
      display: grid;
      grid-template-columns: 1fr 300px;
      gap: 2em;
    }

    .single-participant-text {
      font-size: 1.2rem;
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
