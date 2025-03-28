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

  .logo-img {
    height: 28px;
    width: fit-content;
    margin-right: 1em;
    display: flex;
  }

  .logo-img {
    height: 27.5px;
    width: fit-content;
    margin-right: 1em;
    display: flex;
  }

  .nav-items {
    display: none;
    margin: 0;
  }

  .nav-items > li {
    cursor: pointer;
    color: var(--primary-300);
  }

  .nav-items > li:hover {
    color: var(--primary-brown);
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
    height: 27.5px;
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
    cursor: pointer;
  }

  .dropdown-btn {
    padding: 0.65em 1.2em;
    border-top: 1px solid var(--grey-100);
    display: flex;
    cursor: pointer;
  }

  .get-started-btn {
    background-color: var(--primary-cream);
    color: var(--primary-200);
  }

  .get-started-btn:hover {
    background-color: #f3eaaa;
    color: var(--primary-300);
  }

  @media (min-width: 600px) {
    .logo-img {
      height: 40px;
    }

    img {
      height: 40px;
    }

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
