import styled from "styled-components";

const Wrapper = styled.div`
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
    padding: 0 0.5em;
    border-radius: 50%;
    font-weight: bold;
  }

  .all-questions-points {
    margin-left: 1em;
  }

  .total-points {
    margin-left: 0.5em;
    font-size: 1.3rem;
    color: var(--primary-brown);
    text-transform: uppercase;
    font-weight: bold;
  }

  p, h3 {
    margin: 0;
  }
`;
export default Wrapper;
