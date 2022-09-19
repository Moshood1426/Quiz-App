import styled from "styled-components";

const Wrapper = styled.div`
  background-color: var(--primary-100);
  height: 100vh;

  nav {
    background-color: var(--white);
  }

  .user-container {
    display: none;
  }

  .register-container {
    max-width: 400px;
    margin: 0 auto;
    width: 90%;
    height: calc(100vh - 87.2px);
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .card {
    background-color: white;
    padding: 2em;
    box-shadow: var(--shadow-1);
    max-width: 400px;
    border-radius: 6px;
  }

  .toggle-status {
    display: grid;
    grid-template-columns: 1fr 1fr;
    max-width: 400px;
    text-align: center;
    box-shadow: var(--shadow-1);
    margin-bottom: 2em;
    background-color: var(--white);
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

  .active {
    background-color: var(--primary-200);
    color: white;
    border-radius: 6px;
  }

  .form-title {
    text-align: center;
    padding-bottom: 0.55em;
    margin-bottom: 0.75em;
    border-bottom: 1px solid var(--grey-200);
  }

  .form-name {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.75em;
  }

  form > .btn {
    font-size: 1rem;
  }

  .foot-div {
    background-color: var(--white);
    max-width: 400px;
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

  .forgot-pass {
    color: var(--primary-brown);
    text-align: center;
    display: flex;
    justify-content: center;
    text-transform: uppercase;
    font-size: 0.85rem;
    cursor: pointer;
  }

  .forgot-pass-text {
    font-size: 1rem;
    margin-bottom: 1em;
    text-align: center;
  }
`;

export default Wrapper;
