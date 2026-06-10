import Banner from '../../components/Banner'
import ProductList from '../../components/ProductList'
import Message from '../../components/Message'
import { useGetOnSaleQuery, useGetComingSoonQuery } from '../../services/api'

const Home = () => {
  const {
    data: onSale,
    isLoading: loadingOnSale,
    isError: errorOnSale
  } = useGetOnSaleQuery()
  const {
    data: comingSoon,
    isLoading: loadingComingSoon,
    isError: errorComingSoon
  } = useGetComingSoonQuery()

  if (errorOnSale || errorComingSoon) {
    return (
      <Message>
        Não foi possível carregar os jogos. Tente novamente mais tarde.
      </Message>
    )
  }

  return (
    <>
      <Banner />
      <ProductList
        id="promocoes"
        games={onSale}
        title="Promoções"
        background="gray"
        isLoading={loadingOnSale}
      />
      <ProductList
        id="em-breve"
        games={comingSoon}
        title="Em breve"
        background="black"
        isLoading={loadingComingSoon}
      />
    </>
  )
}

export default Home
