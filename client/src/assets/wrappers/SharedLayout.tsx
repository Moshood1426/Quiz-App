import styled from "styled-components";

const Wrapper = styled.div`
  background-color: var(--primary-100);
  min-height: 100vh;
  .btn-div,
  .nav-items,
  .nav-toggle {
    display: none;
  }

  .user {
    display: block;
    background-color: var(--primary-200);
    color: var(--primary-400);
    border-radius: 50%;
    height: 40px;
    width: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  .user > span {
    font-weight: bold;
    font-size: 1.2rem;
  }

  nav {
    background-color: #deebf8;
    box-shadow: var(--shadow-1);
  }

  .actions {
    background-color: var(--white);
    box-shadow: var(--shadow-1);
    position: relative;
    z-index: 1;
  }

  .actions-container {
    width: 90%;
    margin: 0 auto;
    max-width: var(--max-width);
    padding: 0.85em 0 0;
    display: flex;
    flex-direction: column;
  }

  .actions-item {
    margin-right: 1.5em;
    padding: 0.5em 0.5em;
    color: var(--grey-400);
    font-weight: bold;
  }

  .actions-item:hover {
    color: var(--grey-800);
  }

  .active-actions-item {
    color: var(--grey-800);
    border-left: solid 2px var(--primary-200);
  }

  .outlet-container {
    width: 90%;
    margin: 0 auto;
    max-width: var(--max-width);
    padding-top: 2.3rem;
  }

  @media (min-width: 700px) {
    .actions-container {
      flex-direction: row;
    }
    .active-actions-item {
      border-left: none;
      border-bottom: solid 3px var(--primary-200);
    }

    .actions-item {
      padding-bottom: 0.7em;
    }
  }
`;
export default Wrapper;
