import React from 'react'
import Wrapper from '../assets/wrappers/TestQuestions'

const TestQuestions = () => {
  return (
    <Wrapper>
      <div className="all-questions-header">
        <h3>
          All Questions{" "}
          <span className="num-of-questions">
            3
          </span>
        </h3>
        <p className="all-questions-points">
          Total points:{" "}
          <span className="total-points">30</span>
        </p>
      </div>
    </Wrapper>
  )
}

export default TestQuestions
