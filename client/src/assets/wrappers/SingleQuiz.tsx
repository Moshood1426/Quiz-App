import styled from "styled-components";

const Wrapper = styled.div`
  background-color: var(--white);
  padding: 1em;
  margin-bottom: 2em;
  box-shadow: var(--shadow-2);
  border-radius: 10px;

  h4 {
    margin: 0;
    margin-top: 0.1em;
  }

  .single-quiz-logo {
    display: none;
  }

  .single-quiz-content {
    width: 100%;
  }

  .single-quiz-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding-bottom: 0.5em;
    border-bottom: 1px solid var(--grey-200);
    margin-bottom: 1em;
    position: relative;
  }

  .single-quiz-type {
    color: var(--primary-brown);
    text-transform: uppercase;
    font-size: 0.9rem;
    font-weight: bold;
  }

  .single-quiz-time::before {
    content: "";
    background-color: var(--red-dark);
    height: 9px;
    width: 9px;
    position: absolute;
    transform: translateX(-15px);
    bottom: 1.05em;
    border-radius: 50%;
  }

  .single-quiz-code {
    margin-bottom: 0.7em;
  }

  .single-quiz-code-value {
    font-weight: bold;
    font-style: italic;
    margin-left: 0.4em;
  }

  .single-quiz-subheader {
    display: flex;
    gap: 1em;
    margin-bottom: 3em;
  }

  .single-quiz-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5em;
  }

  .start-date {
    color: #4f4c39;
    background-color: #fffad1;
    padding: 0.5em;
    margin-left: 0.5em;
    border-radius: 9px;
  }

  .single-quiz-edit-btn {
    background-color: #cbecec;
    color: #4f4c39;
    font-weight: 400;
    margin-bottom: 0.75em;
    margin-left: 1em;
  }

  .single-quiz-delete-btn {
    background-color: #f9d7d7;
    color: #400a45;
    font-weight: 400;
    margin-left: 1em;
  }

  p {
    margin: 0;
  }

  .single-quiz-date-time {
    font-size: 0.85rem;
    color: var(--red-dark);
    font-weight: bold;
  }

  .single-quiz-date-time:last-child {
    margin-bottom: 0.75em;
  }

  .view-details {
    margin-bottom: 0.75em;
  }

  .add-participant {
    color: var(--primary-brown);
    text-transform: uppercase;
    font-size: 0.9rem;
    text-decoration: underline;
    cursor: pointer;
    font-weight: bold;
    letter-spacing: var(--letterSpacing)
  }

  @media (max-width: 495px) {
    .start-date {
      display: block;
    }
  }

  @media (min-width: 700px) {
    display: flex;
    gap: 1em;
    flex-direction: row;
    .single-quiz-logo {
      display: block;
      max-width: 150px;
      min-width: 110px;
      width: 20%;
      border-radius: 10px;
      font-size: 5em;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .moderated-logo {
      background-color: #edffd1;
      color: #8aa065;
    }

    .quick-logo {
      background-color: #fce7ff;
    }
  }

  @media (min-width: 900px) {
    .add-participant {
      display: none;
    }
  }
`;
export default Wrapper;
