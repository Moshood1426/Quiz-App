import styled from "styled-components";

const Wrapper = styled.div`
  background-color: var(--primary-100);
  min-height: 100vh;
  .img-div {
    width: 100%;
    height: 8vh;
    display: flex;
    align-items: center;
    padding: 1em 2em;
  }

  .img-div img {
    width: 100px;
  }
`;
export default Wrapper;
