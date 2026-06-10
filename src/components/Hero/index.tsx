import Button from '../Button'
import Tag from '../Tag'
import { Banner, Infos } from './styles'
import { formatPrice } from '../../utils/formatPrice'
import { useDispatch } from 'react-redux'
import { addItem } from '../../store/reducers/cart'

type Props = {
  game: Game
}

const Hero = ({ game }: Props) => {
  const dispatch = useDispatch()

  return (
    <Banner style={{ backgroundImage: `url(${game.media.cover})` }}>
      <div className="container">
        <div>
          <Tag>{game.details.category}</Tag>
          <Tag>{game.details.system}</Tag>
        </div>

        <Infos>
          <h2>{game.name}</h2>
          <p>
            {game.prices.discount && (
              <>
                De <span>{formatPrice(game.prices.old ?? 0)}</span> <br />
              </>
            )}
            {game.prices.current && (
              <>por apenas {formatPrice(game.prices.current)}</>
            )}
          </p>
          {game.prices.current && (
            <Button
              variant="primary"
              type="button"
              title="Clique aqui para adicionar esse jogo ao carrinho"
              onClick={() => dispatch(addItem(game))}
            >
              Adicionar ao carrinho
            </Button>
          )}
        </Infos>
      </div>
    </Banner>
  )
}

export default Hero
