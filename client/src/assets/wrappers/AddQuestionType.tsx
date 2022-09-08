import styled from "styled-components";

const Wrapper = styled.div`
  background-color: white;
  padding: 2em;
  box-shadow: var(--shadow-1);
  max-width: 600px;
  border-radius: 6px 6px 0 0;
  width: 90%;
  opacity: 1;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 3;

  .description {
    padding-top: 2em;
    transition: var(--transition); 
  }

  .add-ques {
    padding: 1.3em;
    display: grid;
    gap: 2em;
    background-color: var(--primary-400);
  }

  .add-ques-type {
    background-color: var(--primary-200);
  }

  .add-ques-type-image {
    display: none;
    min-width: 60px;
    max-width: 100px;
    margin: 0 auto;
    margin-bottom: 1em;
    border: solid 3px var(--primary-300);
    border-radius: 50%;
    padding: 3px;
    background-color: var(--primary-200);
  }

  .add-ques-type-image > img {
    border-radius: 50%;
  }

  h5 {
    font-size: 1rem;
    text-align: center;
    margin: 0;
    padding: 0.6em;
    color: var(--white);
  }

  .card-title {
    text-align: center;
  }

  @media (min-width: 550px) {
    h5 {
      color: var(--primary-300);
    }
    .add-ques {
      grid-template-columns: 1fr 1fr 1fr;
    }

    .add-ques-type {
      background-color: transparent;
    }

    .add-ques-type-image {
      display: block;
    }

    .emoji {
      display: none;
    }
  }
`;
export default Wrapper;
