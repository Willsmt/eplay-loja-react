import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  HeaderBar,
  HeaderLeft,
  HeaderRight,
  Links,
  LinksItem,
  LinkCart,
  CategoriasMenu,
  CategoriasTrigger,
  Dropdown
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
  const menuRef = useRef<HTMLDivElement>(null)

  const fecharMenu = () => setMenuAberto(false)

  // fecha o dropdown ao clicar fora dele
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

  return (
    <HeaderBar>
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
          onClick={e => {
            e.preventDefault()
            dispatch(openCart())
          }}
        >
          {items.length} - produto{items.length === 1 ? '' : 's'}
          <img src={carrinho} alt="Carrinho" />
        </LinkCart>
      </HeaderRight>
    </HeaderBar>
  )
}

export default Header
