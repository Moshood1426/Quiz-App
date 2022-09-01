import styled from "styled-components";

const Wrapper = styled.div`
  position: relative;
  p,
  h3 {
    margin: 0;
  }

  .all-questions-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    border-bottom: solid 2px var(--grey-200);
    padding-bottom: 0.7em;
    margin-bottom: 0.5em;
  }

  .num-of-questions {
    background: #ffb6b6;
    padding: 0 0.35em;
    border-radius: 10em;
    font-weight: bold;
  }

  .total-points {
    margin-left: 0.5em;
    font-size: 1.3rem;
    color: var(--primary-brown);
    text-transform: uppercase;
    font-weight: bold;
  }

  .all-questions-points {
    margin-left: 1em;
  }

  .no-questions {
    font-size: 1.2rem;
    color: var(--grey-400);
    font-style: italic;
  }

  .questions-container {
    padding-bottom: 2em;
  }

  .add-questions {
    text-align: center;
  }

  .add-new-questions {
    display: grid;
    position: fixed;
    bottom: 0;
    right: auto;
    width: inherit;
    width: 90%;
    max-width: 1200px;
  }

  .add-new-ques-child {
    background-color: var(--grey-100);
    padding: 0.75em;
    cursor: pointer;
  }

  .add-new-questions > div {
    display: grid;
  }

  .add-new-questions > div > span {
    background-color: var(--primary-200);
    width: 100%;
    text-align: center;
    color: var(--white);
    font-weight: bold;
    padding: 0.25em;
  }

  .questions-container > div:last-child {
    margin-bottom: 2.5em;
  }

  @media (min-width: 1050px) {
    .add-new-questions {
      grid-template-columns: 3fr 1.2fr;
      gap: 2em;
    }

    .add-new-questions > div {
      grid-column: 1/2;
    }
  }
`;
export default Wrapper;
