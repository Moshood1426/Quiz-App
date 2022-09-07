import styled from "styled-components";

const Wrapper = styled.section`
  .profile-card {
    max-width: 600px;
    background-color: var(--white);
    padding: 2em 1.3em;
    position: relative;
  }
  .profile-title {
    color: var(--primary-200);
    font-weight: bold;
  }

  .profile-btn {
    width: 100%;
  }

  .profile-card-item {
    margin-bottom: 3em;
  }

  .profile-card-item-title {
    border-bottom: var(--primary-400) solid 2px;
    display: flex;
    align-items: center;
    padding-bottom: .5em;
  }

  .profile-card-item-icon {
    margin-right: .5em;
    color: var(--primary-200);
  }

  .alert-text {
    position: fixed;
    max-width: 520px;
    bottom: 10px;
    width: 80%;
  }

  @media(min-width: 450px) {
    .profile-card {
        padding: 2em 2.5em;
    }
  }
`;
export default Wrapper;
