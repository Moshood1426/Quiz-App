import styled from "styled-components";

const Wrapper = styled.div`
  display: none;
  width: 300px;
  height: fit-content;
  margin-bottom: 4em;
  padding: 2em 1.1em;
  background-color: var(--primary-400);
  border-radius: 1em;

  .side-bar-title {
    font-size: 1rem;
    font-weight: bold;
  }

  .side-bar-subtitle,
  li {
    font-size: 0.85rem;
  }

  li {
    margin-bottom: 1em;
    list-style: circle;
    margin-left: 1em;
  }

  @media (min-width: 900px) {
    display: block;
  }
`;
export default Wrapper;
