import styled from "styled-components";

const Wrapper = styled.footer`
background-color: var(--primary-300);
color: var(--white);
padding: 2em 0;

.footer-container {
    width: 90%;
    margin: 0 auto;
    max-width: 750px;
}

.footer-icons-div {
    display: flex;
    gap: .8em;
    font-size: 2rem;
    justify-content: center;
}

.footer-title {
    text-align: center;
    margin-bottom: 1em;
    font-size: 1.3rem;
    width: 100%;
}
`;

export default Wrapper;
