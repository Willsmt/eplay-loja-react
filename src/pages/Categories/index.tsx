import Banner from '../../components/Banner'
import ProductList from '../../components/ProductList'
import { useGetCategoriesQuery } from '../../services/api'
import { categoriesConfig } from '../../config/categoriesConfig'

const Categories = () => {
  const { data, isLoading } = useGetCategoriesQuery()

  return (
    <>
      <Banner />
      {categoriesConfig.map(categoria => (
        <ProductList
          key={categoria.key}
          id={categoria.key}
          title={categoria.title}
          background={categoria.background}
          games={data?.[categoria.key]}
          isLoading={isLoading}
        />
      ))}
    </>
  )
}

export default Categories
