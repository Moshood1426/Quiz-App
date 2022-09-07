import styled from "styled-components";

const Wrapper = styled.div`
  background-color: white;
  padding: 2em;
  box-shadow: var(--shadow-1);
  max-width: 400px;
  border-radius: 6px;
  //width: 90%;

  @media(min-width: 420px) {
    width: 100%;
  }
`;
export default Wrapper;
