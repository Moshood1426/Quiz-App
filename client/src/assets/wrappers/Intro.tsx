import styled from "styled-components";

const Wrapper = styled.section`
  background-color: var(--primary-100);
  //padding-top: 2em;

  .intro-container {
    width: 90%;
    margin: 0 auto;
    max-width: var(--max-width);
    display: flex;
    flex-direction: column;
    padding-bottom: 8vh;
  }

  .intro-img-div {
    max-width: 60vh;
    margin: 0 auto;
    margin-bottom: 2em;
  }

  button {
    font-size: 1.1rem;
    padding: 1em 1.75em;
  }

  @media (min-width: 600px) {
    .intro-img-div {
      max-width: 60vh;
    }
  }

  @media (min-width: 950px) {
    //clip-path: polygon(0 0, 100% 0, 100% 100%, 0 85%);
    .intro-container {
      flex-direction: row;
      align-items: center;
      padding-top: 8vh;
      padding-bottom: 12vh;
    }

    .intro-img-div {
      max-width: 100%;
      display: block;
      margin-bottom: 0em;
      order: 2;
    }
  }
`;
export default Wrapper;
