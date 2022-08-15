import styled from "styled-components";

const Wrapper = styled.div`
display: grid;
gap: 1.35em;

@media (min-width: 750px) {
    grid-template-columns: 1fr 1fr;
}

@media (min-width: 950px) {
    grid-template-columns: 1fr 1fr 1fr;
}
`;
export default Wrapper;
