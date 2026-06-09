import styled from 'styled-components'
import { breakpoints, cores } from '../../styles'

type DrawerProps = {
  isOpen: boolean
}

export const HeaderBar = styled.header`
  background-color: ${cores.cinza};
  padding: 24px;
  border-radius: 16px;
  margin-bottom: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  position: relative;

  a {
    color: ${cores.branca};
    text-decoration: none;
    font-weight: bold;
  }

  /* no tablet/mobile vira: ☰ (esquerda) · logo (centro) · carrinho (direita) */
  @media (max-width: ${breakpoints.tablet}) {
    margin-bottom: 40px;
    display: grid;
    grid-template-columns: 1fr auto 1fr;
  }
`

// botão hambúrguer — escondido no desktop, abre o drawer no mobile/tablet
export const HamburgerButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${cores.branca};
  font-size: 24px;
  line-height: 1;
  cursor: pointer;
  padding: 0;

  @media (max-width: ${breakpoints.tablet}) {
    display: flex;
    align-items: center;
    justify-self: start;
  }
`

export const HeaderLeft = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: ${breakpoints.tablet}) {
    justify-self: center;
  }
`

export const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  @media (max-width: ${breakpoints.tablet}) {
    justify-self: end;
  }
`

// nav inline — visível só no desktop (no mobile os links vão para o drawer)
export const Links = styled.ul`
  display: flex;
  align-items: center;
  margin-left: 40px;

  @media (max-width: ${breakpoints.tablet}) {
    display: none;
  }
`

export const LinksItem = styled.li`
  margin-right: 16px;
`

// carrinho compacto: símbolo + contador
export const LinkCart = styled.a`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;

  img {
    width: 24px;
  }
`

export const CartBadge = styled.span`
  background-color: ${cores.verde};
  color: ${cores.branca};
  font-size: 12px;
  font-weight: bold;
  border-radius: 999px;
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  display: flex;
  align-items: center;
  justify-content: center;
`

// agrupa o link "Categorias" + o botão e ancora o dropdown (desktop)
export const CategoriasMenu = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
`

// gatilho "Categorias ☰" que abre o dropdown (não navega)
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

// lista de categorias do desktop
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

// fundo escurecido atrás do drawer (mobile/tablet)
export const Overlay = styled.div<DrawerProps>`
  display: none;

  @media (max-width: ${breakpoints.tablet}) {
    display: ${props => (props.isOpen ? 'block' : 'none')};
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 20;
  }
`

// painel que desliza da esquerda
export const Drawer = styled.aside<DrawerProps>`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 260px;
  max-width: 80%;
  background-color: ${cores.cinza};
  padding: 24px;
  z-index: 30;
  transform: translateX(${props => (props.isOpen ? '0' : '-100%')});
  transition: transform 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  box-shadow: 4px 0 16px rgba(0, 0, 0, 0.4);
`

export const DrawerHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 16px;
`

export const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${cores.branca};
  font-size: 24px;
  line-height: 1;
  cursor: pointer;
  padding: 0;
`

export const DrawerGroupTitle = styled.span`
  display: block;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: ${cores.cinzaClaro};
  margin: 16px 0 4px;
`

export const DrawerList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 4px;

  a {
    display: block;
    width: 100%;
    padding: 12px 8px;
    border-radius: 8px;
    font-size: 16px;
    font-weight: bold;

    &:hover {
      background-color: ${cores.preta};
    }
  }

  &.sub a {
    font-weight: normal;
    padding-left: 20px;
    color: ${cores.cinzaClaro};
  }
`
