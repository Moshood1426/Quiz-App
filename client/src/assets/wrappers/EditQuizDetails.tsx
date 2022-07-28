import styled from "styled-components";

const Wrapper = styled.div`
  order: 2;
  .edit-quiz-details {
    background-color: var(--white);
    padding: 1.5em;
    margin-bottom: 3em;
  }

  .edit-quiz-details-title {
    padding-bottom: 0.55em;
    border-bottom: 1px solid var(--grey-200);
    text-align: center;
  }

  .edit-quiz-details-form {
    display: grid;
  }

  .submit-btn {
    margin-bottom: .5em;
  }

  .add-btn {
    padding: .5em 2em; 
  }

  .add-participants {
    margin-bottom: 2em;
  }

  .submit-btn:hover {
    background-color: var(--primary-400);
  }

  @media (min-width: 450px) {
    .edit-quiz-details-form {
      grid-template-columns: 1fr 1fr;
      column-gap: 1em;
    }
  }

  @media (min-width: 650px) {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 1em;
  }

  @media (min-width: 1050px) {
    display: block;
    .edit-quiz-details-form {
      grid-template-columns: 1fr;
    }
  }
`;
export default Wrapper;
