import styled from "styled-components";

const Wrapper = styled.div`
  background-color: #e1f8e6;
  padding: 1.4em;
  padding-bottom: 2em;

  p {
    margin: 0;
  }

  .quiz-code {
    color: var(--primary-brown);
    text-transform: uppercase;
    font-size: 0.8rem;
  }

  .quiz-time {
    color: #123812;
    font-size: 0.85rem;
    margin-bottom: 3.5em;
    opacity: 0.85;
  }

  .quiz-title {
    color: #4e6b54;
    margin: 0;
    margin-bottom: 0.35em;
  }

  .quiz-submission-num {
    color: #123812;
    font-size: 0.95rem;
    opacity: 0.8;
    border-bottom: solid 0.5px var(--green-light);
    width: fit-content;
  }

  .quiz-submission-num:hover {
    color: var(--primary-brown);
    cursor: pointer;
  }

  .results-btn {
    margin-top: 2em;
  }

  .results-btn:disabled {
    cursor: not-allowed;
  }
`;
export default Wrapper;
