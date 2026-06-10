import { Container } from './styles'

type Props = {
  children: string
}

// mensagem simples e centralizada, usada para erros de carregamento
const Message = ({ children }: Props) => (
  <div className="container">
    <Container>{children}</Container>
  </div>
)

export default Message
