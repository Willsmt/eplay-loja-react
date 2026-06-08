import styled from 'styled-components'
import { breakpoints, cores } from '../../styles'

export const HeaderBar = styled.header`
  background-color: ${cores.cinza};
  padding: 24px;
  border-radius: 16px;
  margin-bottom: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  a {
    color: ${cores.branca};
    text-decoration: none;
    font-weight: bold;
  }

  div {
    display: flex;
    align-items: center;
  }

  @media (max-width: ${breakpoints.tablet}) {
    margin-bottom: 40px;
    flex-direction: column;
    gap: 24px;

    div {
      flex-direction: column;
      gap: 16px;
    }
  }
`

export const Links = styled.ul`
  display: flex;
  margin-left: 40px;

  @media (max-width: ${breakpoints.tablet}) {
    margin-left: 0;
    flex-wrap: wrap;
    justify-content: center;
    gap: 8px 0;
  }
`

export const LinksItem = styled.li`
  margin-right: 16px;

  @media (max-width: ${breakpoints.celular}) {
    margin-right: 8px;
  }
`

export const LinkCart = styled.a`
  display: flex;
  img {
    margin-left: 16px;
  }
`
