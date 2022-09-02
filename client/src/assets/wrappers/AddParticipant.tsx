import styled from "styled-components";

const Wrapper = styled.div`
  background-color: var(--primary-400);
  padding: 2em 1.2em;
  border-radius: 10px;
  margin-bottom: 2em;

  .add-participant-form {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 1em;
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

  .add-btn {
   // grid-column: 2/3;
   // grid-row: 3/4;
    margin-bottom: 1.2em;
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
`;
export default Wrapper;
