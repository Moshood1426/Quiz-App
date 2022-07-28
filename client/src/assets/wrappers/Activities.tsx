import styled from "styled-components";

const Wrapper = styled.div`
    display: none;
    width: 250px;
    height: 200px;
    border: red solid 2px;

    @media(min-width: 900px) {
        display: block;
    }
`
export default Wrapper