import styled from "styled-components";

const Wrapper = styled.div`
  background-color: #e1f8e6;
  padding-top: 1.5em;
  box-shadow: var(--shadow-1);
  max-width: 900px;
  border-radius: 6px;
  width: 90%;
  opacity: 1;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 4;
  overflow: true;

  .add-question-logo {
    width: 100px;
    margin: 0 auto;
    margin-bottom: 1em;
  }

  .add-ques-container {
    background-color: #94d7a2;
    padding: 0.65em;
    color: var(--grey-800);
    margin-bottom: 2em;
  }

  .add-question-sub-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 90%;
    max-width: 650px;
    margin: 0 auto;
  }

  .add-question-sub-header-li {
    display: grid;
    grid-template-columns: 0.7fr 1fr;
    gap: 1.2em;
  }

  .add-question-sub-header-li span {
    margin-left: 0.5em;
  }

  .add-question-sub-header-li > div {
    margin: 0;
    margin: 0;
  }

  .add-question-sub-header-li .formLabel {
    padding: 0;
  }

  .question-number {
    margin: 0;
    font-size: 1.2rem;
    font-weight: bold;
    margin-right: 1em;
    text-align: center;
  }

  .add-question-sub-header-li .formInput {
    height: 35px;
  }

  .number-input {
    padding: 0.375rem 0.75rem;
    border-radius: var(--borderRadius);
    border: 1px solid var(--grey-200);
    height: 35px;
    font-size: 1rem;
    background-color: var(--primary-100);
    width: 50px;
  }

  .ques-content-container {
    width: 90%;
    margin: 0 auto;
    max-width: 650px;
  }

  .textarea {
    height: 150px;
  }

  .options {
    margin-bottom: 1.5em;
  }

  .cancel {
    padding: 0.5em 0;
    font-size: 1rem;
    background-color: var(--red-light);
    color: var(--red-dark);
    text-align: center;
    font-weight: bold;
    cursor: pointer;
  }

  .save {
    padding: 0.5em 0;
    font-size: 1rem;
    background-color: #bbebc6;
    color: var(--red-dark);
    text-align: center;
    font-weight: bold;
    cursor: pointer;
  }

  .disabled-save {
    cursor: not-allowed;
    opacity: 0.7;
  }
`;
export default Wrapper;
