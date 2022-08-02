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
    padding-bottom: .55em;
    margin-bottom: .75em;
    border-bottom: 1px solid var(--grey-200);
  }

  .sub-title {
    margin: .5em;
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

  ::before {
    content: "";
    background-color: var(--primary-cream);
    position: absolute;
    height: 250px;
    width: 250px;
    left: -80px;
    top: -80px;
    transform: matrix(-0.62, -0.83, 0.74, -0.63, 0, 0);
    border-radius: 55% 45% 70% 45% / 39% 30% 70% 70%;
    z-index: 0;
  }

  ::after {
    content: "";
    background-color: var(--primary-400);
    position: absolute;
    height: 250px;
    width: 250px;
    top: 50vh;
    right: -80px;
    //transform: matrix(-0.62, -0.83, 0.74, -0.63, 0, 0);
    transform: translateY(50%);
    border-radius: 55% 45% 70% 45% / 39% 30% 70% 70%;
    z-index: 0;
  }
`;
export default Wrapper;
