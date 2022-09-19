import styled from "styled-components";

const Wrapper = styled.section`
  background-color: var(--primary-100);

  .process-container {
    width: 90%;
    margin: 0 auto;
    padding: 4rem 0;
    max-width: 1100px;
  }

  .process-content {
    display: grid;
    gap: 2em;
  }

  .process {
    text-align: center;
    position: relative;
    margin-bottom: 2rem;
  }

  .process-title {
    text-align: center;
    margin-bottom: 1.5em;
  }

  .process-img-div {
    width: 130px;
    margin: 0 auto;
    margin-bottom: 2em;
    border: solid #cbecec 3px;
    border-radius: 50%;
    padding: 3px;
  }

  .process-img-div > img {
    border-radius: 50%;
  }

  .process > p {
    max-width: 300px;
    margin: 0 auto;
  }

  @media (min-width: 750px) {
    .process-content {
      grid-template-columns: 1fr 1fr 1fr;
    }

    .process {
      margin-bottom: 0;
    }
  }
`;

export default Wrapper;
