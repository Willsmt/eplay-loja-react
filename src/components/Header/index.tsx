import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import * as S from './styles'
import { type RootState } from '../../store'
import { openCart } from '../../store/reducers/cart'
import { categoriesConfig } from '../../config/categoriesConfig'
import logo from '../../assets/images/logo.svg'
import carrinho from '../../assets/images/carrinho.svg'

const Header = () => {
  const dispatch = useDispatch()
  const items = useSelector((state: RootState) => state.cart.items)
  const [menuOpen, setMenuOpen] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const closeMenu = () => setMenuOpen(false)
  const closeDrawer = () => setDrawerOpen(false)

  // fecha o dropdown de categorias (desktop) ao clicar fora dele
  useEffect(() => {
    if (!menuOpen) return

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [menuOpen])

  // enquanto o drawer está aberto: trava o scroll da página e fecha com Esc
  useEffect(() => {
    if (!drawerOpen) return

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setDrawerOpen(false)
    }

    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', handleEscape)
    }
  }, [drawerOpen])

  return (
    <S.HeaderBar>
      <S.HamburgerButton
        type="button"
        aria-label="Abrir menu"
        onClick={() => setDrawerOpen(true)}
      >
        ☰
      </S.HamburgerButton>

      <S.HeaderLeft>
        <Link to="/">
          <img src={logo} alt="EPLAY" />
        </Link>
        <nav>
          <S.Links>
            <S.LinksItem>
              <S.CategoriesMenu ref={menuRef}>
                <S.CategoriesTrigger
                  type="button"
                  aria-label="Ver categorias"
                  aria-expanded={menuOpen}
                  onClick={() => setMenuOpen(valor => !valor)}
                >
                  Categorias ☰
                </S.CategoriesTrigger>

                {menuOpen && (
                  <S.Dropdown>
                    <li>
                      <Link to="/categories" onClick={closeMenu}>
                        Todas as categorias
                      </Link>
                    </li>
                    {categoriesConfig.map(category => (
                      <li key={category.key}>
                        <Link
                          to={`/categories#${category.key}`}
                          onClick={closeMenu}
                        >
                          {category.title}
                        </Link>
                      </li>
                    ))}
                  </S.Dropdown>
                )}
              </S.CategoriesMenu>
            </S.LinksItem>
            <S.LinksItem>
              <Link to="/#em-breve">Novidades</Link>
            </S.LinksItem>
            <S.LinksItem>
              <Link to="/#promocoes">Promoções</Link>
            </S.LinksItem>
          </S.Links>
        </nav>
      </S.HeaderLeft>

      <S.HeaderRight>
        <S.LinkCart
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
          <S.CartBadge>{items.length}</S.CartBadge>
        </S.LinkCart>
      </S.HeaderRight>

      {/* Menu lateral (drawer) — mobile/tablet */}
      <S.Overlay isOpen={drawerOpen} onClick={closeDrawer} />
      <S.Drawer isOpen={drawerOpen} aria-hidden={!drawerOpen}>
        <S.DrawerHeader>
          <S.CloseButton
            type="button"
            aria-label="Fechar menu"
            onClick={closeDrawer}
          >
            ✕
          </S.CloseButton>
        </S.DrawerHeader>

        <S.DrawerGroupTitle>Categorias</S.DrawerGroupTitle>
        <S.DrawerList>
          <li>
            <Link to="/categories" onClick={closeDrawer}>
              Todas as categorias
            </Link>
          </li>
        </S.DrawerList>
        <S.DrawerList className="sub">
          {categoriesConfig.map(category => (
            <li key={category.key}>
              <Link to={`/categories#${category.key}`} onClick={closeDrawer}>
                {category.title}
              </Link>
            </li>
          ))}
        </S.DrawerList>

        <S.DrawerGroupTitle>Navegar</S.DrawerGroupTitle>
        <S.DrawerList>
          <li>
            <Link to="/#em-breve" onClick={closeDrawer}>
              Novidades
            </Link>
          </li>
          <li>
            <Link to="/#promocoes" onClick={closeDrawer}>
              Promoções
            </Link>
          </li>
        </S.DrawerList>
      </S.Drawer>
    </S.HeaderBar>
  )
}

export default Header
