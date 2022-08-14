import React, { useEffect } from 'react'
import Wrapper from '../../assets/wrappers/Submission'
import Loading from '../../components/Loading'
import useAppContext from '../../store/appContext'

const Submission = () => {

  const { quizWithSubmission,isLoading, getQuizWithSubmission } = useAppContext()

  useEffect(() => {
    getQuizWithSubmission()
  }, [])

  return (
    <Wrapper>
      <h3 className="title">Submission</h3>
      {isLoading ? <Loading /> : <h2>Loaded</h2>}
    </Wrapper>
  )
}

export default Submission
