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

  nav {
    background-color: #deebf8;
    box-shadow: var(--shadow-1);
  }

  .edit-quiz-container {
    background-color: var(--primary-300);
  }

  .edit-quiz-header {
    width: 90%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 1.85em 0;
    font-weight: bold;
    color: var(--white);
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2.5em;
  }

  .edit-quiz-header-title {
    margin: 0;
  }

  .edit-quiz-header-button {
    display: grid;
    gap: 0.5em;
  }

  .edit-quiz-header-button > button {
    color: var(--primary-300);
  }

  .edit-quiz-content {
    max-width: var(--max-width);
    width: 90%;
    margin: 0 auto;
  }

  .edit-cancel-btn:hover {
    background-color: var(--primary-400);
  }

  .edit-save-btn:hover {
    background-color: var(--primary-400);
  }

  @media (min-width: 350px) {
    .edit-quiz-header-button {
      display: block;
    }

    .edit-save-btn {
      margin-right: 1em;
    }
  }

  @media (min-width: 1050px) {
    .edit-quiz-content {
      display: grid;
      grid-template-columns: 3fr 1.2fr;
      gap: 2em;
    }
  }
`;
export default Wrapper;
