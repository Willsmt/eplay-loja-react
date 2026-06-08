import styled from 'styled-components'
import { cores } from '../../styles'

export const Botao = styled.button<{ $visivel: boolean }>`
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 998; // abaixo do carrinho (999)
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: none;
  background-color: ${cores.verde};
  color: ${cores.branca};
  font-size: 24px;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;

  // aparece/some conforme a rolagem
  opacity: ${props => (props.$visivel ? 1 : 0)};
  visibility: ${props => (props.$visivel ? 'visible' : 'hidden')};
  transition:
    opacity 0.3s ease,
    visibility 0.3s ease,
    transform 0.2s ease;

  &:hover {
    transform: translateY(-4px);
  }
`
