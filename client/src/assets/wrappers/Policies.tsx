import styled from "styled-components";

const Wrapper = styled.div`
  .user-container {
    display: none;
  }

  .content-container {
    padding: 4rem 0;
    width: 90%;
    margin: 0 auto;
  }

  .content {
    max-width: 50em;
    margin: 0 auto;
  }

  p {
    max-width: 50em;
    font-size: 1.1rem;
  }

  .content-title {
    margin-bottom: 2rem;
  }

  .about-us {
    margin-bottom: 4rem;
  }

  .content-list {
    list-style-type: disc;
    list-style-position: inside;
  }

  h5 {
    margin-top: 3rem;
  }

  h5:first-of-type {
    margin-top: 0;
  }
`;

export default Wrapper;
