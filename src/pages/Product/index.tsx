import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Gallery from '../../components/Gallery'
import Hero from '../../components/Hero'
import Section from '../../components/Section'
import type { Game } from '../Home'

const Product = () => {
  const { id } = useParams<{ id: string }>()
  const [game, setGame] = useState<Game | null>(null)

  useEffect(() => {
    if (id) {
      fetch(`https://api-ebac.vercel.app/api/eplay/jogos/${id}`)
        .then(res => res.json())
        .then(setGame)
    }
  }, [id])

  if (!game) {
    return <h3>Carregando...</h3>
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
