import { useParams } from 'react-router-dom'
import Hero from '../../components/Hero'

const Product = () => {
  const { id } = useParams<{ id: string }>()

  // Aqui você pode usar o id para buscar dados do produto
  // Exemplo: chamar uma API ou filtrar de uma lista

  return (
    <>
      <Hero />
      <p>Produto selecionado: {id}</p>
    </>
  )
}

export default Product
