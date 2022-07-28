import styled from "styled-components";

const Wrapper = styled.div`
  
  .title {
    font-weight: bold;
    color: var(--grey-700);
    margin-bottom: 0.5em;
  }

  .manage-quiz-header-line {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    border-bottom: var(--grey-400) solid 1px;
    margin-bottom: 1em;
  }

  .manage-quiz-list {
    display: flex;
    gap: 0.75em;
    margin: 0;
  }

  .manage-quiz-list > li {
    padding-bottom: 0.25em;
    cursor: pointer;
    padding: 0em 0.25em;
  }

  .active {
    border-bottom: 2px solid var(--primary-300);
  }

  .manage-quiz-filter-btn {
    color: var(--primary-brown);
    display: flex;
    justify-content: center;
    text-transform: uppercase;
    font-size: 1rem;
    cursor: pointer;
    font-weight: bold;
  }

  .manage-quiz-content-container {
    display: flex;
    flex-direction: row;
    gap: 1em;
  }

  @media (min-width: 500px) {
    .manage-quiz-list {
      gap: 1em;
    }

    .manage-quiz-list > li {
      padding: 0 1em;
    }

    .manage-quiz-filter {
      display: grid;
      grid-template-columns: 1fr 1fr;
      column-gap: 1em;
    }
  }

  @media (min-width: 750px) {
    .manage-quiz-filter {
      grid-template-columns: 1fr 1fr 1fr 1fr;
    }
  }
`;
export default Wrapper;
