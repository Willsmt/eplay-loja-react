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
        id="promocoes"
        games={promocoes}
        title="Promoções"
        background="gray"
        isLoading={carregandoPromocoes}
      />
      <ProductList
        id="em-breve"
        games={emBreve}
        title="Em breve"
        background="black"
        isLoading={carregandoEmBreve}
      />
    </>
  )
}

export default Home
