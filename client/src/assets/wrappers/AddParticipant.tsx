import styled from "styled-components";

const Wrapper = styled.div`
  background-color: var(--primary-400);
  padding: 2em 2em;
  border-radius: 10px;
  margin-bottom: 2em;

  .participant-info {
    max-height: 200px;
    height: 200px;
    overflow: auto;
  }

  .add-participant-form {
    display: grid;
  }

  .form-title {
    text-align: center;
    font-weight: bold;
    font-size: 1.2rem;
    color: var(--primary-300);
    border-bottom: solid 1px var(--grey-400);
    padding-bottom: 0.5em;
    //grid-column: 1/3;
  }

  .form-info {
    font-size: 0.85rem;
    margin-bottom: 1em;
    color: var(--primary-brown);
    //grid-column: 1/2;
  }

  ul {
    margin: 0;
  }

  .form-info-item {
    list-style: circle;
    margin-left: 1em;
  }

  .add-btn {
    // grid-column: 2/3;
    // grid-row: 3/4;
    margin-bottom: 1.2em;
  }

  .participant-info {
    display: flex;
    flex-wrap: wrap;
    gap: 0.3em;
  }

  .participant-identifier {
    font-size: 0.85rem;
    margin: 0;
    border: var(--primary-200) solid 1px;
    width: fit-content;
    padding: 0.25em 0.5em;
    border-radius: 10px;
    display: flex;
    align-items: center;
    gap: 0.5em;
  }

  .delete-participant {
    cursor: pointer;
  }

  @media (min-width: 750px) {
    
    .add-participant-form {
      grid-template-columns: 1fr;
    }

    .form-info {
      grid-column: 1/-1;
    }

    .add-btn {
    }
  }

  @media (min-width: 900px) {
    padding: 2em 1.2em;
  }
`;
export default Wrapper;
