import React from 'react'
import Wrapper from '../assets/wrappers/Card'

interface CardProps {
    children: React.ReactNode
}

const Card: React.FC <CardProps> = ({children}) => {
  return (
    <Wrapper>
      {children}
    </Wrapper>
  )
}

export default Card
