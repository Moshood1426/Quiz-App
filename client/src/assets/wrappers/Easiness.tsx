import styled from "styled-components";

const Wrapper = styled.section`
  background-color: var(--primary-100);
  clip-path: polygon(0 0, 100% 12%, 100% 100%, 0% 100%);
  padding-top: 10rem;
  padding-bottom: 4rem;
  position: relative;

  .easiness-background {
    position: absolute;
    top: 0;
    z-index: -1;
    height: 100%;
  }

  .easiness-title {
    color: var(--primary-300);
    text-align: center;
    margin-bottom: 1.3em;
    color: var(--white);
  }

  .easiness-btn-div {
    margin: 0 auto;
    display: flex;
    justify-content: center;
  }

  .easiness-container {
    width: 90%;
    margin: 0 auto;
    max-width: 1200px;
  }

  .easiness-img-div {
    display: none;
  }

  .easiness {
    padding: 1em 1.3em;
    margin-bottom: 2em;
    border-radius: .5em;
  }

  .easiness-one {
    background-color: #edffd1;
    color: #488110;
  }

  .easiness-one > h4 {
    color: #1c8919;
  }

  .easiness-two {
    background-color: var(--primary-cream);
    color: #868b47;
  }

  .easiness-two > h4 {
    color: #7e852b;
  }

  .easiness-three {
    background-color: #fce7ff;
    color: #844789;
  }

  .easiness-three > h4 {
    color: #732570;
  }

  .easiness-four {
    background-color: #cbecec;
    color: #20635b;
  }

  .easiness-four > h4 {
    color: #0e6262;
  }

  button {
    font-size: 1.1rem;
    padding: 1em 1.75em;
  }

  @media (min-width: 750px) {
    padding-top: 6rem;
    .easiness-container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-column-gap: 3em;
    }
  }

  @media (min-width: 950px) {
    .easiness {
      display: flex;
      justify-content: space-between;
    }

    .easiness-text-div {
      width: 70%;
    }

    .easiness-img-div {
      display: block;
      height: 100px;
      width: 25%;
      background-color: var(--grey-200);
    }
  }
`;

export default Wrapper;
