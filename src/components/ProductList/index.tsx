import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

import { getGameTags } from '../../utils/getGameTags'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { breakpoints } from '../../styles'
import ProductCard from '../ProductCard'
import { Container, List, Title } from './styles'
import Loader from '../Loader'

export type Props = {
  title: string
  background: 'gray' | 'black'
  games?: Game[]
  isLoading?: boolean
  id?: string
}

const ProductList = ({ background, title, games, isLoading, id }: Props) => {
  // carrossel só no tablet/celular; no desktop mantemos a grade
  const isMobile = useMediaQuery(`(max-width: ${breakpoints.tablet})`)
  const list = games ?? []

  const renderCard = (game: Game) => (
    <ProductCard
      id={game.id}
      title={game.name}
      description={game.description}
      image={game.media.thumbnail} // ou cover
      category={game.details.category}
      system={game.details.system}
      infos={getGameTags(game)}
    />
  )
  if (isLoading) {
    return <Loader />
  }
  return (
    <Container id={id} background={background}>
      <div className="container">
        <Title>{title}</Title>

        {isMobile ? (
          <Swiper
            modules={[Pagination]}
            spaceBetween={16}
            slidesPerView={1}
            pagination={{ clickable: true }}
            breakpoints={{
              // a partir de 481px (tablet) mostra 2 por vez
              481: { slidesPerView: 2 }
            }}
          >
            {list.map(game => (
              <SwiperSlide key={game.id}>{renderCard(game)}</SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <List>
            {list.map(game => (
              <li key={game.id}>{renderCard(game)}</li>
            ))}
          </List>
        )}
      </div>
    </Container>
  )
}

export default ProductList
