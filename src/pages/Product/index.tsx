import { useParams } from 'react-router-dom'
import Gallery from '../../components/Gallery'
import Hero from '../../components/Hero'
import Section from '../../components/Section'
import { useGetGameQuery } from '../../services/api'
import Loader from '../../components/Loader'

const Product = () => {
  const { id } = useParams<{ id: string }>()
  const { data: game, isLoading } = useGetGameQuery(id ?? '', { skip: !id })

  if (isLoading || !game) {
    return <Loader />
  }

  return (
    <div>
      <Hero game={game} />

      <Section background="black" title="Sobre o jogo">
        <p>{game.description}</p>
      </Section>

      <Section background="gray" title="Detalhes do jogo">
        <p>
          <strong>Plataforma:</strong> {game.details.system}
        </p>
        <p>
          <strong>Desenvolvedor:</strong> {game.details.developer}
        </p>
        <p>
          <strong>Editora:</strong> {game.details.publisher}
        </p>
        <p>
          <strong>Idiomas:</strong> o jogo oferece suporte a diversos idiomas,
          incluindo {game.details.languages.join(', ')}
        </p>
      </Section>

      <Gallery
        defaultCover={game.media.cover}
        name={game.name}
        gallery={game.media.gallery}
      />
    </div>
  )
}

export default Product
