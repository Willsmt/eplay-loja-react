import Banner from '../../components/Banner'
import ProductList from '../../components/ProductList'
import { useGetPromocoesQuery, useGetEmBreveQuery } from '../../services/api'

const Home = () => {
  const { data: promocoes, isLoading: carregandoPromocoes } =
    useGetPromocoesQuery()
  const { data: emBreve, isLoading: carregandoEmBreve } = useGetEmBreveQuery()

  return (
    <>
      <Banner />
      <ProductList
        games={promocoes}
        title="Promoções"
        background="gray"
        isLoading={carregandoPromocoes}
      />
      <ProductList
        games={emBreve}
        title="Em breve"
        background="black"
        isLoading={carregandoEmBreve}
      />
    </>
  )
}

export default Home
