import { useEffect, useState } from 'react'
import { Botao } from './styles'

// Botão flutuante que aparece ao rolar a página e volta ao topo ao clicar.
const BackToTop = () => {
  const [visivel, setVisivel] = useState(() => window.scrollY > 300)

  useEffect(() => {
    const handleScroll = () => setVisivel(window.scrollY > 300)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const voltarAoTopo = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <Botao
      type="button"
      $visivel={visivel}
      aria-label="Voltar ao topo"
      onClick={voltarAoTopo}
    >
      ↑
    </Botao>
  )
}

export default BackToTop
