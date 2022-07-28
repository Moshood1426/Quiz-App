import styled from "styled-components";

const Wrapper = styled.section`
  background-color: var(--primary-cream);
  padding: 4rem 0;
  text-align: center;
  position: relative;

  .take-test-container {
    width: 90%;
    max-width: 950px;
    margin: 0 auto;
  }

  .take-test-container > h2 {
    color: var(--primary-300);
  }

  button {
    font-size: 1.1rem;
    padding: 1em 1.75em;
  }

  p {
    margin: 0 auto;
    margin-bottom: 1.5rem;
  }

  .take-test {
    display: none;
  }

  @media (min-width: 1100px) {
    .take-test {
      display: block;
      position: absolute;
      width: 250px;
      bottom: 0;
    }

    .take-test-right {
      right: 50px;
    }

    .take-test-left {
      left: 50px;
    }
  }
`;

export default Wrapper;
