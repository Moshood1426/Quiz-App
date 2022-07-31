import styled from "styled-components";

const Wrapper = styled.div`
  .multiple-choice-container {
    display: grid;
  }

  .multiple-choice {
    display: flex;
    gap: 0.6em;
  }

  .multiple-choice-radio {
    transform: translateY(-20%);
  }

  .multiple-choice-label {
    width: stretch;
  }

  .true-false-container {
    display: grid;
    gap: 1em;
  }

  .true-false {
    display: flex;
    gap: 0.8em;
  }

  .true-false-label {
    font-size: 1.3rem;
    text-transform: capitalize;
    width: stretch;
    background-color: var(--white);
    padding-left: 1em;
    border: 1px solid var(--grey-200);
    border-radius: 5px;
  }

  .add-remove-answer {
    color: var(--primary-brown);
    margin: 0 auto;
    width: fit-content;
    font-size: 0.9rem;
    font-weight: bold;
    text-transform: uppercase;
    cursor: pointer;
  }

  .add-remove-answer > span:first-child {
    margin-right: 4em;
  }

  .fill-gap-input {
    display: grid;
    width: 90%;
    max-width: 350px;
    margin: 0 auto;
  }

  @media (min-width: 500px) {
    .multiple-choice-container {
      grid-template-columns: 1fr 1fr;
      grid-column-gap: 1em;
    }

    .true-false-container {
      grid-template-columns: 1fr 1fr;
      max-width: 550px;
      margin: 0 auto;
    }
  }
`;
export default Wrapper;
