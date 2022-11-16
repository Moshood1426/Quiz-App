import styled from "styled-components";

const Wrapper = styled.div`
  height: 100vh;
  width: 100%;
  background-color: var(--primary-100);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .form-title {
    text-align: center;
    padding-bottom: 0.55em;
    margin-bottom: 0.75em;
    border-bottom: 1px solid var(--grey-200);
    position: relative;
    z-index: 2;
  }

  .sub-title {
    margin: 0.5em;
    color: var(--primary-brown);
  }

  .toggle-status {
    display: grid;
    grid-template-columns: 1fr 1fr;
    max-width: 400px;
    width: 90%;
    text-align: center;
    box-shadow: var(--shadow-1);
    margin-bottom: 2em;
    background-color: var(--white);
    border-radius: 6px;
  }

  .active {
    background-color: var(--primary-200);
    color: white;
    border-radius: 6px;
  }

  p {
    margin: 0;
    font-size: 1.2rem;
    padding: 0.4em;
    text-transform: capitalize;
    border-radius: 6px;
    cursor: pointer;
  }

  .foot-div {
    background-color: var(--white);
    max-width: 400px;
    width: 90%;
    text-align: center;
    box-shadow: var(--shadow-1);
    margin-top: 2em;
    padding: 0.85em 0;
    border-radius: 6px;
  }

  .foot-text {
    grid-column: 1/3;
    font-size: 0.9rem;
  }

  form > .btn {
    width: 100%;
    margin-bottom: 0.75em;
  }

  .log-in {
    color: var(--primary-200);
  }

  .forgot-pass-text {
    font-size: 1rem;
    margin-bottom: 1em;
    text-align: center;
  }

  .result-modal {
    width: 100%;
    min-height: 100vh;
    top: 0;
    position: absolute;
    overflow: auto;
    display: grid;
    place-items: center;
    padding-top: 2em;
  }

  .result-modal-bg {
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(54, 43, 43, 0.73);
    z-index: 1;
  }

  .result-content {
    position: absolute;
    border: var(--grey-200) solid 1px;
    padding: 2em 1em;
    padding-bottom: 1em;
    border-radius: 10px;
    // height: fit-content;
    margin-bottom: 2em;
    margin-top: 2em;
    box-shadow: var(--shadow-2);
    background-color: var(--primary-400);
    z-index: 2;
    width: 85%;
    max-width: 450px;
  }

  .quiz-details-title {
    border-bottom: solid 1px var(--primary-200);
    display: flex;
    font-size: 0.9rem;
    margin-bottom: 0.5em;
  }

  @media (max-height: 600px) {
    .result-modal {
      min-height: 120vh;
    }
  }
`;
export default Wrapper;
