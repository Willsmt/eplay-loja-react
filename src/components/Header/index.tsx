import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { HeaderBar, Links, LinksItem, LinkCart } from './styles'
import { type RootState } from '../../store'
import { openCart } from '../../store/reducers/cart'
import logo from '../../assets/images/logo.svg'
import carrinho from '../../assets/images/carrinho.svg'

const Header = () => {
  const dispatch = useDispatch()
  const items = useSelector((state: RootState) => state.cart.items)

  return (
    <HeaderBar>
      <div>
        <Link to="/">
          <img src={logo} alt="EPLAY" />
        </Link>
        <nav>
          <Links>
            <LinksItem>
              <Link to="/categories">Categorias</Link>
            </LinksItem>
            <LinksItem>
              <Link to="/#em-breve">Novidades</Link>
            </LinksItem>
            <LinksItem>
              <Link to="/#promocoes">Promoções</Link>
            </LinksItem>
          </Links>
        </nav>
      </div>
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
    </HeaderBar>
  )
}

export default Header
