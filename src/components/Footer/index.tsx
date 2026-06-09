import { Container, SectionTitle, FooterSection, Link, Links } from './styles'
import { categoriesConfig } from '../../config/categoriesConfig'

const currentYear = new Date().getFullYear()

const Footer = () => (
  <Container>
    <div className="container">
      <FooterSection>
        <SectionTitle>Categorias</SectionTitle>
        <Links>
          {categoriesConfig.map(category => (
            <li key={category.key}>
              <Link to={`/categories#${category.key}`}>{category.title}</Link>
            </li>
          ))}
        </Links>
      </FooterSection>
      <FooterSection>
        <SectionTitle>Acesso rápido</SectionTitle>
        <Links>
          <li>
            <Link to="/">Novidades</Link>
          </li>
          <li>
            <Link to="/#promocoes">Promoções</Link>
          </li>
          <li>
            <Link to="/#em-breve">Em breve</Link>
          </li>
        </Links>
      </FooterSection>
      <p>{currentYear} - © E-PLAY Todos os direitos reservados</p>
    </div>
  </Container>
)

export default Footer
