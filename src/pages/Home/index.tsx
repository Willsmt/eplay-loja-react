import Banner from '../../components/Banner'
import ProductList from '../../components/ProductList'
import { useGetOnSaleQuery, useGetComingSoonQuery } from '../../services/api'

const Home = () => {
  const { data: onSale, isLoading: loadingOnSale } = useGetOnSaleQuery()
  const { data: comingSoon, isLoading: loadingComingSoon } =
    useGetComingSoonQuery()

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
