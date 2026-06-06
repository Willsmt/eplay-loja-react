import { Container, Title } from './styles'
import React from 'react'

export type Props = {
  title: string
  background: 'black' | 'gray'
  children: React.ReactNode
}

const Section = ({ title, background, children }: Props) => (
  <Container background={background}>
    <div className="container">
      <Title>{title}</Title>
      {children}
    </div>
  </Container>
)

export default Section
