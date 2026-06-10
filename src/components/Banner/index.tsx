import Tag from '../Tag'
import Button from '../Button'
import Loader from '../Loader'
import Message from '../Message'
import { Image, Title, Price } from './styles'
import { formatPrice } from '../../utils/formatPrice'
import { useGetFeaturedQuery } from '../../services/api'

const Banner = () => {
  const { data: featured, isLoading, isError } = useGetFeaturedQuery()

  if (isLoading) {
    return <Loader />
  }

  if (isError || !featured) {
    return <Message>Não foi possível carregar o destaque do dia.</Message>
  }

  return (
    <Image style={{ backgroundImage: `url(${featured.media.cover})` }}>
      <div className="container">
        <Tag size="big">Destaque do Dia</Tag>
        <div>
          <Title>{featured.name}</Title>
          <Price>
            De <span>{formatPrice(featured.prices.old ?? 0)}</span> <br />
            por apenas {formatPrice(featured.prices.current ?? 0)}
          </Price>
        </div>
        <Button
          type="link"
          to={`/product/${featured.id}`}
          title="clique aqui para aproveitar esta oferta"
        >
          Aproveitar
        </Button>
      </div>
    </Image>
  )
}

export default Banner
