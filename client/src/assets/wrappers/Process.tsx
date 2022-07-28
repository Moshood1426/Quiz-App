import styled from "styled-components";

const Wrapper = styled.section`
  width: 90%;
  margin: 0 auto;
  padding: 5rem 0;
  max-width: var(--max-width);
  display: grid;

  .process {
    text-align: center;
    position: relative;
    margin-bottom: 2rem;
  }

  ::before {
    content: "";
    background-color: var(--primary-cream);
    position: absolute;
    height: 250px;
    width: 250px;
    left: -20px;
    transform: matrix(-0.62, -0.83, 0.74, -0.63, 0, 0);
    border-radius: 55% 45% 70% 45% / 39% 30% 70% 70%;
  }

  .avatar {
    content: "";
    background-color: var(--primary-cream);
    position: absolute;
    height: 250px;
    width: 250px;
    right: 0;
    z-index: -1;
    border-radius: 31% 69% 21% 79% / 57% 30% 70% 43%;
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

  @media (min-width: 600px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 3em;

    .process-feedback {
      grid-column: 1/3;
    }
  }

  @media (min-width: 950px) {
    grid-template-columns: 1fr 1fr 1fr;

    .process {
      margin-bottom: 0;
    }

    .process-feedback {
      grid-column: 3/4;
    }
  }
`;

export default Wrapper;
