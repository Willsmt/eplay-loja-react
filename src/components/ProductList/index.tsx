import { type Game } from '../../types'
import { getGameTags } from '../../utils/getGameTags'
import ProductCard from '../ProductCard'
import { Container, List, Title } from './styles'

export type Props = {
  title: string
  background: 'gray' | 'black'
  games?: Game[]
  isLoading?: boolean
}

const ProductList = ({ background, title, games, isLoading }: Props) => {
  return (
    <Container background={background}>
      <div className="container">
        <Title>{title}</Title>
        {isLoading && <p>Carregando...</p>}
        <List>
          {(games ?? []).map(game => (
            <li key={game.id}>
              <ProductCard
                id={game.id}
                title={game.name}
                description={game.description}
                image={game.media.thumbnail} // ou cover
                category={game.details.category}
                system={game.details.system}
                infos={getGameTags(game)}
              />
            </li>
          ))}
        </List>
      </div>
    </Container>
  )
}

export default ProductList
