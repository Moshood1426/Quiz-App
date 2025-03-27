import styled from "styled-components";

const Wrapper = styled.footer`
  background-color: var(--primary-100);
  color: var(--grey-500);
  padding: 2em 0;

  li {
    font-size: 1.3rem;
    margin-bottom: 0.95rem;
    cursor: pointer;
  }

  li:hover {
    text-decoration: underline;
  }

  li:last-child {
    margin-bottom: 0;
  }

  .footer-container {
    width: 90%;
    margin: 0 auto;
    max-width: 1200px;
  }

  .footer-icons-div {
    display: flex;
    gap: 0.8em;
    font-size: 2rem;
    justify-content: center;
  }

  .footer-title {
    text-align: center;
    margin-bottom: 1em;
    font-size: 1.3rem;
    width: 100%;
    max-width: 100%;
  }

  .textarea {
    height: 150px;
    margin-bottom: 1.2rem;
  }

  .footer-socials {
    border-top: 1px solid var(--grey-100);
  }

  .footer-major {
    margin-bottom: 2rem;
  }

  .footer-major-intro {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    margin-bottom: 2rem;
    border-bottom: 1px solid var(--grey-100);
  }

  @media (min-width: 900px) {
    .footer-major {
      display: grid;
      grid-template-columns: 1fr 1fr;
    }

    .footer-major-intro {
      border-bottom: none;
    }
  }
  @media (max-width: 900px) {
    form {
      max-width: 600px;
      margin: 0 auto;
    }
  }

  /* .footer-form {
    max-width: 500px;
  } */

  .footer-form-title {
    text-transform: initial;
    margin-bottom: 1.5rem;
  }
`;

export default Wrapper;
