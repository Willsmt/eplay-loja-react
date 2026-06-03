import Tag from '../Tag'
import { Card, Titulo, Descricao } from './styles'

const Product = () => (
  <Card>
    <img src="https://picsum.photos/222/250" alt="" />
    <Titulo>Nome do jogo</Titulo>
    <Tag>Categoria</Tag>
    <Tag>Windows</Tag>
    <Descricao>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat saepe
      harum, magni quasi autem architecto ratione non, a modi quisquam
      voluptatem? Odit expedita optio exercitationem voluptatum ratione vel
      corrupti repellat!
    </Descricao>
  </Card>
)

export default Product
