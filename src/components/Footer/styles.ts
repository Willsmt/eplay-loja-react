import styled from 'styled-components'
import { Link as RouterLink } from 'react-router-dom'
import { breakpoints, colors } from '../../styles'

export const Container = styled.footer`
  background-color: ${colors.gray};
  padding: 32px 0;
  font-size: 14px;
  margin-top: 40px;
`
export const SectionTitle = styled.h4`
  font-size: 16px;
  font-weight: bold;
  color: ${colors.white};
`

export const Links = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin-top: 16px;
`

export const Link = styled(RouterLink)`
  color: ${colors.lightGray};
  text-decoration: none;
  margin-right: 8px;
  padding-top: 16px;
  cursor: pointer;

  &:hover {
    color: ${colors.white};
  }
`

export const FooterSection = styled.div`
  margin-bottom: 64px;

  @media (max-width: ${breakpoints.mobile}) {
    margin-bottom: 32px;
  }
`
