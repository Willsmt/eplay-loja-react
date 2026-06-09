import styled from 'styled-components'
import { cores } from '../../styles'

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
`

export const InputGroup = styled.div<InputGroupProps>`
  flex: auto;

  max-width: ${props => props.maxWidth || 'none'};
  label {
    font-size: 14px;
    margin-bottom: 8px;
    color: ${cores.branca};
    display: block;
  }

  input,
  select {
    color: ${cores.preta};
    background-color: ${cores.branca};
    height: 32px;
    padding: 0 8px;
    border: 1px solid ${cores.branca};
    width: 100%;
    transition: border-color 0.2s ease-in-out;
  }

  input:focus {
    outline: none;
    border-color: ${cores.cinza};
  }

  select,
  option {
    color: ${cores.preta};
  }

  small {
    display: block;
    margin-top: 8px;
    font-size: 12px;
    color: #ff4d4d;
    font-weight: bold;
  }
`

export const TabButton = styled.button<TabButtonProps>`
  border-radius: 8px;
  font-size: 14px;
  font-weight: bold;
  color: ${cores.branca};
  background-color: ${props => (props.isActive ? cores.verde : cores.preta)};
  height: 32px;
  border: none;
  margin-right: 16px;
  padding: 0 8px;
  cursor: pointer;

  img {
    margin-right: 8px;
  }
`
