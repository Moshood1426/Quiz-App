import styled from "styled-components";

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  min-height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  overflow: auto;
  transition: var(--transition);
  z-index: 2;

  .publish-quiz {
    display: grid;
    grid-column-gap: 1em;
    margin-bottom: 2em;
  }

  .cancel-btn {
    position: absolute;
    cursor: pointer;
    font-size: 1.8em;
    right: 2em;
  }

  .content-container {
    background-color: var(--primary-100);
    min-height: calc(100vh - 50px);
    border-top-left-radius: 50px;
    border-top-right-radius: 50px;
  }

  .alert-div {
    grid-column: 1/-1;
  }

  .alert-div > p {
    margin: 0;
  }

  .content {
    padding-top: 3em;
    max-width: var(--max-width);
    margin: 0 auto;
    width: 90%;
    margin-top: 50px;
    display: grid;
    gap: 1em;
  }

  .content-main {
    width: 100%;
  }

  .content-status {
    background-color: rgba(214, 219, 245, 0.35);
    max-width: 100%;
    font-size: 0.9rem;
    text-align: center;
    padding: 0.5em 0;
    border-radius: 0.65em;
    border: solid 1px var(--primary-200);
  }

  .content-main > div:first-child {
    margin-bottom: 3em;
  }

  .publish-quiz > div:first-child {
    grid-column: 1/-1;
  }

  .publish-quiz-anytime {
    margin-bottom: 1em;
  }

  .publish-start {
    color: var(--primary-brown);
    cursor: pointer;
  }

  .status-icon {
    margin-right: 0.5em;
  }

  .btn:disabled {
    opacity: 0.8;
  }

  .side-bar {
    display: none;
  }

  .add-participant-modal {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.7);
  }

  .add-participant-card {
    max-width: 350px;
    min-width: 275px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%)
    
  }

  @media (min-width: 550px) {
    .publish-quiz {
      grid-template-columns: 1fr 1fr;
    }
  }

  @media (min-width: 900px) {
    .content {
      grid-template-columns: 1fr 250px;
    }

    .side-bar {
      display: block;
    }

    .add-participant-modal {
      display: none;
    }
  }

  @media (min-width: 1150px) {
    .publish-quiz {
      grid-template-columns: 1fr 1fr 1fr;
    }

    .publish-quiz > .btn {
      place-self: end stretch;
      margin-bottom: 1.3em;
      padding: 0.7em;
    }
  }
`;
export default Wrapper;
