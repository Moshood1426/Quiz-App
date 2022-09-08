import styled from "styled-components";

const Wrapper = styled.nav`
  background-color: var(--primary-100);
  position: relative;
  z-index: 2;

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

  .user-container {
    position: relative;
  }

  .hide-logout-dropdown {
    display: none;
  }

  .logout-dropdown {
    position: absolute;
    background-color: var(--white);
    right: 0;
    font-size: 1rem;
    width: 150px;
    box-shadow: var(--shadow-4);
    margin-top: 0.2em;
  }

  .dropdown-name {
    margin: 0;
    padding: 0.65em 1.2em;
    background-color: #f6f8f9;
    border-bottom: var(--grey-100) solid 1px;
    font-weight: bold;
  }

  .dropdown-action-item {
    margin: 0;
    padding: 0.65em 1.2em;
  }

  .dropdown-btn {
    padding: 0.65em 1.2em;
    border-top: 1px solid var(--grey-100);
    display: flex;
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
