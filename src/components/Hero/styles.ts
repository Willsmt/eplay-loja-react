import styled from 'styled-components'
import { breakpoints, cores } from '../../styles'
import { TagContainer } from '../Tag/styles'

export const Banner = styled.div`
  position: relative;
  height: 488px;
  width: 100%;
  display: block;

  padding-top: 16px;

  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  &::after {
    position: absolute;
    background-color: #000;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    content: '';
    opacity: 0.56;
  }
  ${TagContainer} {
    margin-right: 8px;
  }

  .container {
    z-index: 1;
    position: relative;
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-between;
  }

  @media (max-width: ${breakpoints.tablet}) {
    height: 400px;
  }

  @media (max-width: ${breakpoints.celular}) {
    height: 340px;
  }
`

export const Infos = styled.div`
  padding: 16px;
  background-color: ${cores.preta};
  max-width: 290px;

  h2 {
    font-size: 32px;
  }

  p {
    font-size: 24px;
    margin: 16px 0;
    span {
      text-decoration: line-through;
    }
  }

  @media (max-width: ${breakpoints.celular}) {
    max-width: 100%;

    h2 {
      font-size: 24px;
    }

    p {
      font-size: 18px;
    }
  }
`
