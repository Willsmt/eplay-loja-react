import styled from 'styled-components'
import { cores } from '../../styles'

export const Items = styled.ul`
  display: flex;
`

export const Action = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.73);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;

  > img {
    width: 48px;
    height: 48px;
    transition: transform 0.3s ease-in-out;
  }
`

export const Item = styled.li`
  margin-right: 16px;
  position: relative;
  overflow: hidden;

  > img {
    border: 2px solid ${cores.branca};
    border-radius: 8px;
    width: 150px;
    height: 150px;
    object-fit: cover;
    transition: transform 0.3s ease-in-out;
  }

  &:hover {
    ${Action} {
      opacity: 1;

      > img {
        transform: scale(1.2); /* zoom no ícone */
      }
    }

    > img {
      transform: scale(1.05); /* zoom leve na imagem */
    }
  }
`
export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  display: none; /* começa escondido */
  align-items: center;
  justify-content: center;

  &.Visible {
    display: flex; /* aparece quando a classe é adicionada */
  }

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.73);
  }
`

export const ModalContent = styled.div`
  position: relative;
  z-index: 1;
  max-width: 960px;
  header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 24px;
  }

  h4 {
    font-size: 18px;
    font-weight: bold;
  }

  img,
  iframe {
    display: block;
    max-width: 100%;
  }

  iframe {
    width: 100%;
    height: 480px;
  }
`
