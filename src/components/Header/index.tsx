import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  HeaderBar,
  HamburgerButton,
  HeaderLeft,
  HeaderRight,
  Links,
  LinksItem,
  LinkCart,
  CartBadge,
  CategoriasMenu,
  CategoriasTrigger,
  Dropdown,
  Overlay,
  Drawer,
  DrawerHeader,
  CloseButton,
  DrawerGroupTitle,
  DrawerList
} from './styles'
import { type RootState } from '../../store'
import { openCart } from '../../store/reducers/cart'
import { categoriesConfig } from '../../config/categoriesConfig'
import logo from '../../assets/images/logo.svg'
import carrinho from '../../assets/images/carrinho.svg'

const Header = () => {
  const dispatch = useDispatch()
  const items = useSelector((state: RootState) => state.cart.items)
  const [menuAberto, setMenuAberto] = useState(false)
  const [drawerAberto, setDrawerAberto] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const fecharMenu = () => setMenuAberto(false)
  const fecharDrawer = () => setDrawerAberto(false)

  // fecha o dropdown de categorias (desktop) ao clicar fora dele
  useEffect(() => {
    if (!menuAberto) return

    const handleClickFora = (evento: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(evento.target as Node)) {
        setMenuAberto(false)
      }
    }

    document.addEventListener('mousedown', handleClickFora)
    return () => document.removeEventListener('mousedown', handleClickFora)
  }, [menuAberto])

  // enquanto o drawer está aberto: trava o scroll da página e fecha com Esc
  useEffect(() => {
    if (!drawerAberto) return

    const handleEsc = (evento: KeyboardEvent) => {
      if (evento.key === 'Escape') setDrawerAberto(false)
    }

    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', handleEsc)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', handleEsc)
    }
  }, [drawerAberto])

  return (
    <HeaderBar>
      <HamburgerButton
        type="button"
        aria-label="Abrir menu"
        onClick={() => setDrawerAberto(true)}
      >
        ☰
      </HamburgerButton>

      <HeaderLeft>
        <Link to="/">
          <img src={logo} alt="EPLAY" />
        </Link>
        <nav>
          <Links>
            <LinksItem>
              <CategoriasMenu ref={menuRef}>
                <CategoriasTrigger
                  type="button"
                  aria-label="Ver categorias"
                  aria-expanded={menuAberto}
                  onClick={() => setMenuAberto(valor => !valor)}
                >
                  Categorias ☰
                </CategoriasTrigger>

                {menuAberto && (
                  <Dropdown>
                    <li>
                      <Link to="/categories" onClick={fecharMenu}>
                        Todas as categorias
                      </Link>
                    </li>
                    {categoriesConfig.map(categoria => (
                      <li key={categoria.key}>
                        <Link
                          to={`/categories#${categoria.key}`}
                          onClick={fecharMenu}
                        >
                          {categoria.title}
                        </Link>
                      </li>
                    ))}
                  </Dropdown>
                )}
              </CategoriasMenu>
            </LinksItem>
            <LinksItem>
              <Link to="/#em-breve">Novidades</Link>
            </LinksItem>
            <LinksItem>
              <Link to="/#promocoes">Promoções</Link>
            </LinksItem>
          </Links>
        </nav>
      </HeaderLeft>

      <HeaderRight>
        <LinkCart
          href="#"
          aria-label={`Carrinho com ${items.length} ${
            items.length === 1 ? 'produto' : 'produtos'
          }`}
          onClick={e => {
            e.preventDefault()
            dispatch(openCart())
          }}
        >
          <img src={carrinho} alt="Carrinho" />
          <CartBadge>{items.length}</CartBadge>
        </LinkCart>
      </HeaderRight>

      {/* Menu lateral (drawer) — mobile/tablet */}
      <Overlay isOpen={drawerAberto} onClick={fecharDrawer} />
      <Drawer isOpen={drawerAberto} aria-hidden={!drawerAberto}>
        <DrawerHeader>
          <CloseButton
            type="button"
            aria-label="Fechar menu"
            onClick={fecharDrawer}
          >
            ✕
          </CloseButton>
        </DrawerHeader>

        <DrawerGroupTitle>Categorias</DrawerGroupTitle>
        <DrawerList>
          <li>
            <Link to="/categories" onClick={fecharDrawer}>
              Todas as categorias
            </Link>
          </li>
        </DrawerList>
        <DrawerList className="sub">
          {categoriesConfig.map(categoria => (
            <li key={categoria.key}>
              <Link
                to={`/categories#${categoria.key}`}
                onClick={fecharDrawer}
              >
                {categoria.title}
              </Link>
            </li>
          ))}
        </DrawerList>

        <DrawerGroupTitle>Navegar</DrawerGroupTitle>
        <DrawerList>
          <li>
            <Link to="/#em-breve" onClick={fecharDrawer}>
              Novidades
            </Link>
          </li>
          <li>
            <Link to="/#promocoes" onClick={fecharDrawer}>
              Promoções
            </Link>
          </li>
        </DrawerList>
      </Drawer>
    </HeaderBar>
  )
}

export default Header
