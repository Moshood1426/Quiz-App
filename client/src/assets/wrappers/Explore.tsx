import styled from "styled-components";

const Wrapper = styled.section`
  padding: 5rem 0;
  
  .explore-img-div {
    display: none;
  }

  .explore-container {
    width: 90%;
    margin: 0 auto;
    max-width: var(--max-width);
  }

  button {
    font-size: 1.1rem;
    padding: 1em 1.75em;
  }

  .explore-text-div > span {
    text-transform: uppercase;
    color: #9f6654;
    font-weight: bold;
    font-size: 0.85rem;
  }

  @media (min-width: 950px) {
    .explore-img-div {
      display: block;
      max-width: 100%;
    }

    .explore-container {
        display: flex;
        gap: 3rem;
        align-items: center;
    }

  }
`;
export default Wrapper;
