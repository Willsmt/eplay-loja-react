import styled from 'styled-components'
import { breakpoints } from '../../styles'
import { TagContainer } from '../Tag/styles'

export const Imagem = styled.div`
  width: 100%;
  height: 560px;
  display: block;
  background-repeat: no-repeat;
  background-size: cover;
  font-weight: bold;
  position: relative;

  /* Overlay na frente da imagem */
  &::after {
    content: '';
    position: absolute;
    inset: 0; /* cobre toda a área */
    background-color: rgba(0, 0, 0, 0.5); /* escurece */
    z-index: 1; /* fica na frente da imagem */
  }

  .container {
    position: relative;
    padding-top: 340px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    z-index: 2; /* garante que o conteúdo fique acima do overlay */
  }

  ${TagContainer} {
    position: absolute;
    top: 32px;
    left: 32px;
    z-index: 3; /* ainda acima do overlay */
  }

  @media (max-width: ${breakpoints.tablet}) {
    height: 420px;

    .container {
      padding-top: 220px;
      flex-direction: column;
      align-items: flex-start;
      gap: 16px;
    }
  }

  @media (max-width: ${breakpoints.celular}) {
    height: 360px;

    .container {
      padding-top: 160px;
    }

    ${TagContainer} {
      top: 16px;
      left: 16px;
    }
  }
`

export const Titulo = styled.h2`
  font-size: 36px;
  max-width: 450px;

  @media (max-width: ${breakpoints.celular}) {
    font-size: 24px;
  }
`

export const Preco = styled.p`
  font-size: 24px;
  margin-top: 24px;
  span {
    text-decoration: line-through;
  }

  @media (max-width: ${breakpoints.celular}) {
    font-size: 18px;
    margin-top: 16px;
  }
`
