import { useEffect, useState } from 'react'
import { type Game } from '../../pages/Home'
import Tag from '../Tag'
import Button from '../Button'
import { Imagem, Titulo, Preco } from './styles'
import { formataPreco } from '../../utils/formatPrice'

const Banner = () => {
  const [destaque, setDestaque] = useState<Game | null>(null)

  useEffect(() => {
    fetch('https://api-ebac.vercel.app/api/eplay/destaque')
      .then(res => res.json())
      .then(res => setDestaque(res))
  }, [])

  if (!destaque) {
    return <h3>Carregando...</h3>
  }

  return (
    <Imagem style={{ backgroundImage: `url(${destaque?.media.cover})` }}>
      <div className="container">
        <Tag size="big">Destaque do Dia</Tag>
        {destaque && (
          <div>
            <Titulo>{destaque?.name}</Titulo>
            <Preco>
              <Preco>
                De <span>{formataPreco(destaque?.prices.old ?? 0)}</span> <br />
                por apenas {formataPreco(destaque?.prices.current ?? 0)}
              </Preco>
            </Preco>
          </div>
        )}
        <Button
          type="link"
          to={`/product/${destaque?.id}`}
          title="clique aqui para aproveitar esta oferta"
        >
          Aproveitar
        </Button>
      </div>
    </Imagem>
  )
}

export default Banner
