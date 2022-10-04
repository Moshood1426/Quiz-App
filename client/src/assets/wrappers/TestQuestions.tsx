import styled from "styled-components";

const Wrapper = styled.div`
  .all-questions-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    border-bottom: solid 2px var(--grey-200);
    padding-bottom: 0.7em;
    margin-bottom: 0.5em;
  }

  .num-of-questions {
    background: #ffb6b6;
    padding: 0 0.5em;
    border-radius: 50%;
    font-weight: bold;
  }

  .all-questions-points {
    margin-left: 1em;
  }

  .total-points {
    margin-left: 0.5em;
    font-size: 1.3rem;
    color: var(--primary-brown);
    text-transform: uppercase;
    font-weight: bold;
  }

  p,
  h3 {
    margin: 0;
  }

  .quiz-page-list {
    margin-top: 2rem;
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 1rem;
    padding-bottom: 3em;
  }

  .btn-container {
    display: flex;
    align-items: center;
    justify-content: start;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .pageBtn {
    border: 1px solid var(--primary-200);
    height: 35px;
    width: 35px;
    display: flex;
    align-items: center;
    justify-content: center;

    font-size: 0.85rem;
    color: var(--primary-200);
    transition: var(--transition);
    border-radius: 50%;
    cursor: pointer;
  }

  .pageBtn:hover {
    background: var(--primary-200);
    color: var(--primary-400);
  }

  .active {
    background: var(--primary-200);
    color: var(--primary-400);
  }
  .prev-btn,
  .next-btn {
    width: 100px;
    height: 40px;
    background: var(--primary-400);
    border-color: transparent;
    border-radius: var(--borderRadius);
    color: var(--primary-300);
    text-transform: capitalize;
    letter-spacing: var(--letterSpacing);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    cursor: pointer;
    transition: var(--transition);
  }
  .prev-btn:hover,
  .next-btn:hover {
    background: var(--primary-200);
    color: var(--white);
  }

  .question-options {
    display: flex;
    flex-direction: column;
    width: fit-content;
  }

  .question-options > li {
    margin-left: 1.5em;
  }

  .question-options > li::before {
    content: "";
    top: 0;
    left: 0;
    position: absolute;
    border: 2px solid var(--primary-200);
    width: 15px;
    height: 15px;
    border-radius: 50%;
    transform: translate(-1.5em, 50%);
  }

  .correct-answer::before {
    background-color: var(--primary-200);
  }

  .submit-answer {
    margin-top: 1.5em;
    cursor: pointer;
  }

  .submit-answer:hover {
    background-color: #aef1ae;
  }
`;
export default Wrapper;
