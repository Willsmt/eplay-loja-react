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
  flex-wrap: wrap;
  gap: 16px;

  a {
    color: ${cores.branca};
    text-decoration: none;
    font-weight: bold;
  }

  @media (max-width: ${breakpoints.tablet}) {
    margin-bottom: 40px;
  }
`

export const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
`

export const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`

export const Links = styled.ul`
  display: flex;
  align-items: center;
  margin-left: 40px;

  @media (max-width: ${breakpoints.tablet}) {
    margin-left: 16px;
    flex-wrap: wrap;
    gap: 8px 0;
  }
`

export const LinksItem = styled.li`
  margin-right: 16px;
`

export const LinkCart = styled.a`
  display: flex;
  align-items: center;
  cursor: pointer;
  img {
    margin-left: 16px;
  }
`

// agrupa o link "Categorias" + o botão hambúrguer, e ancora o dropdown
export const CategoriasMenu = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
`

// gatilho único "Categorias ☰" que abre o dropdown (não navega)
export const CategoriasTrigger = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  color: ${cores.branca};
  font-family: inherit;
  font-size: 16px;
  font-weight: bold;
  line-height: 1;
  cursor: pointer;
  padding: 0;
`

// lista de categorias que abre ao clicar no hambúrguer
export const Dropdown = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 8px;
  min-width: 160px;
  background-color: ${cores.preta};
  border-radius: 8px;
  padding: 8px;
  z-index: 10;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  gap: 4px;

  li a {
    display: block;
    padding: 8px;
    border-radius: 4px;
    white-space: nowrap;

    &:hover {
      background-color: ${cores.cinza};
    }
  }
`
