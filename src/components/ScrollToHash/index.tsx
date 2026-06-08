import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// O react-router não rola até o #hash sozinho.
// Este componente faz isso a cada mudança de rota/hash.
const ScrollToHash = () => {
  const { hash, pathname } = useLocation()

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '')
      const elemento = document.getElementById(id)
      if (elemento) {
        elemento.scrollIntoView({ behavior: 'smooth' })
        return
      }
    }
    // sem hash (ou id inexistente): volta ao topo
    window.scrollTo(0, 0)
  }, [hash, pathname])

  return null
}

export default ScrollToHash
