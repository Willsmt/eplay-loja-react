import { Link } from 'react-router-dom'
import { HeaderBar, Links, LinksItem, LinkCart } from './styles'
import logo from '../../assets/images/logo.svg'
import carrinho from '../../assets/images/carrinho.svg'

const Header = () => (
  <HeaderBar>
    <div>
      <Link to="/">
        <img src={logo} alt="EPLAY" />
      </Link>
      <nav>
        <Links>
          <LinksItem>
            <Link to={'/categories'}>Categorias</Link>
          </LinksItem>
          <LinksItem>
            <a href="#">Novidades</a>
          </LinksItem>
          <LinksItem>
            <a href="#">Promoções</a>
          </LinksItem>
        </Links>
      </nav>
    </div>
    <LinkCart href="#">
      0 - produtos
      <img src={carrinho} alt="Carrinho" />
    </LinkCart>
  </HeaderBar>
)

export default Header
