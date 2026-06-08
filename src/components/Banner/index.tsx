import Tag from '../Tag'
import Button from '../Button'
import { Imagem, Titulo, Preco } from './styles'
import { formataPreco } from '../../utils/formatPrice'
import { useGetDestaqueQuery } from '../../services/api'

const Banner = () => {
  const { data: destaque, isLoading } = useGetDestaqueQuery()

  if (isLoading || !destaque) {
    return <h3>Carregando...</h3>
  }

  return (
    <Imagem style={{ backgroundImage: `url(${destaque.media.cover})` }}>
      <div className="container">
        <Tag size="big">Destaque do Dia</Tag>
        <div>
          <Titulo>{destaque.name}</Titulo>
          <Preco>
            De <span>{formataPreco(destaque.prices.old ?? 0)}</span> <br />
            por apenas {formataPreco(destaque.prices.current ?? 0)}
          </Preco>
        </div>
        <Button
          type="link"
          to={`/product/${destaque.id}`}
          title="clique aqui para aproveitar esta oferta"
        >
          Aproveitar
        </Button>
      </div>
    </Imagem>
  )
}

export default Banner
