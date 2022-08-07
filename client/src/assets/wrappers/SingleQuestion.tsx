import styled from "styled-components";

const Wrapper = styled.div`
  border-bottom: solid 1px var(--grey-200);
  //padding-bottom: 1em;
  padding-top: 1.3em;

  p {
    margin: 0;
  }

  .question-header {
    display: flex;
    justify-content: space-between;
  }

  .question-tag {
    background-color: #fce7ff;
    color: #400a45;
    width: fit-content;
    padding: 0.3em 0.6em;
    border-radius: 10px;
    margin-bottom: 0.5em;
  }

  .question-edit-btn {
    margin-right: 1em;
    font-weight: normal;
  }

  .question-delete-btn {
    font-weight: normal;
  }

  .question-edit-btn:hover {
    background-color: var(--primary-400);
  }

  .question-delete-btn:hover {
    background-color: var(--primary-400);
  }

  .question-content {
    color: #293264;
    font-weight: bold;
    text-transform: capitalize;
  }

  .question-options-item {
    color: #293264;
    border: solid 1.5px #293264;
    padding: 0 1em;
    border-radius: 10px;
  }

  .correct-answer {
    background-color: #d6dbf5;
    border: none;
  }

  .question-options {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1em;
  }

  .question-footer {
    margin-bottom: 0.5em;
    color: var(--primary-brown);
    text-transform: uppercase;
    font-size: 0.85rem;
    margin-bottom: 1.2em;
  }

  .question-type {
    margin-right: 2em;
  }

  .question-point {
    color: var(--primary-brown);
    text-transform: uppercase;
    font-size: 0.85rem;
  }

  @media (min-width: 550px) {
    .question-options {
      display: flex;
      gap: 1.5em;
    }
  }
`;
export default Wrapper;
