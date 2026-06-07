import Button from '../Button'
import Tag from '../Tag'
import { Banner, Infos } from './styles'
import { formataPreco } from '../../utils/formatPrice'
import type { Game } from '../../pages/Home'

type Props = {
  game: Game
}

const Hero = ({ game }: Props) => (
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
              De <span>{formataPreco(game.prices.old ?? 0)}</span> <br />
            </>
          )}
          {game.prices.current && (
            <>por apenas {formataPreco(game.prices.current ?? 0)}</>
          )}
        </p>
        {game.prices.current && (
          <Button
            variant="primary"
            type="button"
            title="Clique aqui para adicionar esse jogo ao carrinho"
          >
            Adicionar ao carrinho
          </Button>
        )}
      </Infos>
    </div>
  </Banner>
)

export default Hero
