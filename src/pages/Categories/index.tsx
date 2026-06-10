import Banner from '../../components/Banner'
import ProductList from '../../components/ProductList'
import Message from '../../components/Message'
import { useGetCategoriesQuery } from '../../services/api'
import { categoriesConfig } from '../../config/categoriesConfig'

const Categories = () => {
  const { data, isLoading, isError } = useGetCategoriesQuery()

  if (isError) {
    return (
      <Message>Não foi possível carregar as categorias. Tente novamente.</Message>
    )
  }

  return (
    <>
      <Banner />
      {categoriesConfig.map(category => (
        <ProductList
          key={category.key}
          id={category.key}
          title={category.title}
          background={category.background}
          games={data?.[category.key]}
          isLoading={isLoading}
        />
      ))}
    </>
  )
}

export default Categories
