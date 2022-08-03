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

  .alert {
    max-width: 100%;
  }

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
    background-color: white;
  }

  .content-container {
    background-color: var(--primary-100);
    min-height: calc(100vh - 50px);
    border-top-left-radius: 50px;
    border-top-right-radius: 50px;
  }

  .content {
    padding-top: 3em;
    max-width: var(--max-width);
    margin: 0 auto;
    width: 90%;
    margin-top: 50px;
    display: flex;
    gap: 1em;
  }

  .content-main {
    width: 100%;
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
    color: var(--primary-300);
    cursor: pointer;
  }

  @media (min-width: 550px) {
    .publish-quiz {
      grid-template-columns: 1fr 1fr;
    }
  }

  @media (min-width: 1150px) {
    .publish-quiz {
      grid-template-columns: 1fr 1fr 1fr;
    }

    .publish-quiz > .btn {
      place-self: end stretch;
      margin-bottom: 1.3em;
      padding: .7em;
    }
  }
`;
export default Wrapper;
