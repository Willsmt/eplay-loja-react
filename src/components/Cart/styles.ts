import styled from 'styled-components'
import { cores } from '../../styles'

type ContainerProps = {
  isOpen: boolean
}

export const CartContainer = styled.div<ContainerProps>`
  position: fixed;
  inset: 0;
  z-index: 999;
  display: flex;
  justify-content: flex-end;
  // controla a visibilidade do carrinho inteiro
  opacity: ${props => (props.isOpen ? 1 : 0)};
  visibility: ${props => (props.isOpen ? 'visible' : 'hidden')};
  transition:
    opacity 0.3s ease,
    visibility 0.3s ease;
`

export const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.7);
`

export const Sidebar = styled.aside<ContainerProps>`
  position: relative;
  z-index: 1;
  background-color: ${cores.preta};
  color: ${cores.branca};
  width: 400px;
  max-width: 100%;
  height: 100vh;
  padding: 24px;
  box-shadow: -4px 0 12px rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  // se passar da altura da tela, rola o carrinho inteiro
  overflow-y: auto;
  // desliza a partir da direita
  transform: ${props => (props.isOpen ? 'translateX(0)' : 'translateX(100%)')};
  transition: transform 0.3s ease;
`

export const CartHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;

  h2 {
    font-size: 20px;
    font-weight: bold;
  }

  button {
    background: none;
    border: none;
    color: ${cores.branca};
    font-size: 18px;
    cursor: pointer;
  }
`

export const CartList = styled.ul`
  // a lista flui naturalmente; o resumo fica logo abaixo dela
  margin-bottom: 24px;
`

export const CartItem = styled.li`
  display: flex;
  align-items: center;
  gap: 12px;
  background-color: ${cores.cinza};
  padding: 8px;
  border-radius: 8px;
  margin-bottom: 12px;

  img {
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 4px;
  }

  > div {
    flex: 1;

    h3 {
      font-size: 14px;
      font-weight: bold;
      margin-bottom: 8px;
    }
  }

  button {
    background: none;
    border: none;
    color: ${cores.branca};
    font-size: 16px;
    cursor: pointer;
    align-self: flex-start;
  }
`

export const Tags = styled.div`
  display: flex;
  gap: 8px;
`

export const Quantidade = styled.p`
  font-size: 14px;
  margin-bottom: 8px;
`

export const Total = styled.p`
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  font-size: 16px;
`

export const Parcelas = styled.span`
  display: block;
  font-size: 12px;
  color: ${cores.cinzaClaro};
  margin-bottom: 16px;
`

export const CartFooter = styled.footer`
  display: flex;
  flex-direction: column;
  gap: 8px;

  button {
    width: 100%;
    padding: 12px;
    border-radius: 8px;
    border: none;
    background-color: ${cores.vermelha};
    color: ${cores.branca};
    font-weight: bold;
    cursor: pointer;
  }

  // botão secundário (limpar a lista): discreto, sem preenchimento
  button.secondary {
    background-color: transparent;
    border: 1px solid ${cores.cinzaClaro};
    color: ${cores.cinzaClaro};

    &:hover {
      border-color: ${cores.branca};
      color: ${cores.branca};
    }
  }
`
