import styled from 'styled-components'
import { colors } from '../../styles'

export const ScrollTopButton = styled.button<{ $visible: boolean }>`
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 998; // abaixo do carrinho (999)
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: none;
  background-color: ${colors.green};
  color: ${colors.white};
  font-size: 24px;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;

  // aparece/some conforme a rolagem
  opacity: ${props => (props.$visible ? 1 : 0)};
  visibility: ${props => (props.$visible ? 'visible' : 'hidden')};
  transition:
    opacity 0.3s ease,
    visibility 0.3s ease,
    transform 0.2s ease;

  &:hover {
    transform: translateY(-4px);
  }
`
