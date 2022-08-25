import styled from "styled-components";

const Wrapper = styled.div`
  padding-bottom: 2em;
  
  .explore-title {
    color: var(--primary-200);
    font-weight: bold;
    position: relative;
    z-index: 1;
  }
  .explore-sub-title {
    color: var(--primary-brown);
    position: relative;
    z-index: 1;
  }
  .explore-details {
    position: relative;
    z-index: 1;
  }
  .form-card {
    background-color: white;
    padding: 2em;
    box-shadow: var(--shadow-1);
    border-radius: 6px;
    position: relative;
    z-index: 1;
  }

  .form-title {
    color: var(--primary-300);
    margin-bottom: 0.4em;
  }

  .form-sub-title {
    color: var(--primary-brown);
    margin: 0;
    margin-bottom: 1em;
  }

  .number-input {
    margin-bottom: 1.3em;
  }

  ::before {
    content: "";
    background: var(--primary-400);
    border-radius: 50%;
    position: fixed;
    width: 400px;
    height: 400px;
    right: -120px;
    top: -10px;
    z-index: 0;
  }

  ::after {
    content: "";
    background: #fffad1;
    border-radius: 50%;
    position: fixed;
    width: 400px;
    height: 400px;
    left: -40px;
    bottom: -100px;
    z-index: 0;
  }

  .btn {
    padding: 0.75em;
    width: 100%;
  }

  @media (min-width: 800px) {
    .form-element {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-column-gap: 1em;
    }
  }
`;
export default Wrapper;
