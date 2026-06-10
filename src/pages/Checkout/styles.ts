import styled from 'styled-components'
import { breakpoints, colors } from '../../styles'

type InputGroupProps = {
  maxWidth?: string
}
type RowProps = {
  marginTop?: string
}

type TabButtonProps = {
  isActive: boolean
}

export const Row = styled.div<RowProps>`
  display: flex;
  column-gap: 24px;
  margin-top: ${props => props.marginTop || '0'};
  align-items: flex-end;

  @media (max-width: ${breakpoints.tablet}) {
    flex-wrap: wrap;
    row-gap: 16px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    flex-direction: column;
    align-items: stretch;
    row-gap: 16px;
  }
`

export const InputGroup = styled.div<InputGroupProps>`
  flex: auto;

  max-width: ${props => props.maxWidth || 'none'};

  @media (max-width: ${breakpoints.mobile}) {
    max-width: 100%;
  }

  label {
    font-size: 14px;
    margin-bottom: 8px;
    color: ${colors.white};
    display: block;
  }

  input,
  select {
    color: ${colors.black};
    background-color: ${colors.white};
    height: 32px;
    padding: 0 8px;
    border: 1px solid ${colors.white};
    width: 100%;
    transition: border-color 0.2s ease-in-out;
  }

  input:focus {
    outline: none;
    border-color: ${colors.gray};
  }

  input.error,
  select.error {
    border-color: #ff4d4d;
  }

  select,
  option {
    color: ${colors.black};
  }

  small {
    display: block;
    margin-top: 8px;
    font-size: 12px;
    color: #ff4d4d;
    font-weight: bold;
  }
`

// banner do modo demo (site de estudos) com botão de autopreenchimento
export const DemoBox = styled.div`
  background-color: ${colors.gray};
  border: 1px dashed ${colors.green};
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 24px;
  font-size: 14px;

  p {
    margin-bottom: 12px;
  }

  button {
    background-color: ${colors.green};
    color: ${colors.white};
    border: none;
    border-radius: 8px;
    padding: 8px 16px;
    font-weight: bold;
    cursor: pointer;
  }
`

export const TabButton = styled.button<TabButtonProps>`
  border-radius: 8px;
  font-size: 14px;
  font-weight: bold;
  color: ${colors.white};
  background-color: ${props => (props.isActive ? colors.green : colors.black)};
  height: 32px;
  border: none;
  margin-right: 16px;
  padding: 0 8px;
  cursor: pointer;

  img {
    margin-right: 8px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    width: 100%;
    margin-right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`
