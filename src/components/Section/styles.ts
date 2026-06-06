import styled from 'styled-components'
import { cores } from '../../styles'
import { Card } from '../Product/styles'

interface SectionStyleProps {
  background: 'black' | 'gray'
}

export const Container = styled.section<SectionStyleProps>`
  padding: 32px 0;
  background-color: ${props =>
    props.background === 'black' ? cores.preta : cores.cinza};

  ${Card} {
    background-color: ${props =>
      props.background === 'black' ? cores.cinza : cores.preta};
  }

  p {
    font-size: 14px;
    line-height: 22px;
    max-width: 640px;
  }
`

export const Title = styled.h2`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 40px;
`
