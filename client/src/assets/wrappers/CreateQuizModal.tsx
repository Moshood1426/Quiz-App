import styled from "styled-components";

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.75);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 2;

  .sub-title {
    margin: 1em;
    color: var(--primary-brown);
  }

  .form-title {
    text-align: center;
    margin-bottom: 0.75em;
    border-bottom: 1px solid var(--grey-200);
    padding: 0 1.5em 0.65em;
  }

  .submitBtn {
    width: 100%;
    margin-bottom: 0.8em;
  }

  .go-back {
    color: var(--primary-brown);
    display: flex;
    justify-content: center;
    text-transform: uppercase;
    font-size: 0.85rem;
    cursor: pointer;
    font-weight: bold;
  }
`;
export default Wrapper;
