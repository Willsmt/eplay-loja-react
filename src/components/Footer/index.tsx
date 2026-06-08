import { Container, SectionTitle, FooterSection, Link, Links } from './styles'
import { categoriesConfig } from '../../config/categoriesConfig'

const currentYear = new Date().getFullYear()

const Footer = () => (
  <Container>
    <div className="container">
      <FooterSection>
        <SectionTitle>Categorias</SectionTitle>
        <Links>
          {categoriesConfig.map(categoria => (
            <li key={categoria.key}>
              <Link>{categoria.title}</Link>
            </li>
          ))}
        </Links>
      </FooterSection>
      <FooterSection>
        <SectionTitle>Acesso rápido</SectionTitle>
        <Links>
          <li>
            <Link>Novidades</Link>
          </li>
          <li>
            <Link>Promoções</Link>
          </li>
          <li>
            <Link>Em breve</Link>
          </li>
        </Links>
      </FooterSection>
      <p>{currentYear} - © E-PLAY Todos os direitos reservados</p>
    </div>
  </Container>
)

export default Footer
