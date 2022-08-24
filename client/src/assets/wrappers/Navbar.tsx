import styled from "styled-components";

const Wrapper = styled.nav`
  background-color: var(--primary-100);
  position: relative;
  z-index: 1;

  .nav-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 90%;
    max-width: var(--max-width);
    margin: 0 auto;
    color: var(--primary-300);
    font-size: 1.1rem;
    padding: 1em 0;
  }

  .nav-items {
    display: none;
    margin: 0;
  }

  .btn-div {
    display: none;
  }

  .nav-toggle {
    font-size: 1.5rem;
  }

  .user {
    display: none;
  }

  img {
    height: 40px;
  }

  @media (min-width: 600px) {
    .nav-toggle {
      display: none;
    }

    .nav-items {
      display: flex;
      gap: 1.5rem;
    }

    .btn-div {
      display: block;
    }
  }
`;
export default Wrapper;
