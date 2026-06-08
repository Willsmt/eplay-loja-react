import styled from 'styled-components'
import { cores } from '../../styles'

export const Row = styled.div`
  display: flex;
  column-gap: 24px;
`

export const InputGroup = styled.div`
  flex: auto;

  label {
    font-size: 14px;
    margin-bottom: 8px;
    color: ${cores.branca};
    display: block;
  }

  input {
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
`
