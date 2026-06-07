import { type Game } from '../../pages/Home'
import { getGameTags } from '../../utils/formatPrice'
import Product from '../Product'
import { Container, List, Title } from './styles'

export type Props = {
  title: string
  background: 'gray' | 'black'
  games: Game[]
}

const ProductList = ({ background, title, games }: Props) => {
  return (
    <Container background={background}>
      <div className="container">
        <Title>{title}</Title>
        <List>
          {games.map(game => (
            <Product
              key={game.id}
              title={game.name}
              description={game.description}
              image={game.media.thumbnail} // ou cover
              category={game.details.category}
              system={game.details.system}
              infos={getGameTags(game)}
            />
          ))}
        </List>
      </div>
    </Container>
  )
}

export default ProductList
