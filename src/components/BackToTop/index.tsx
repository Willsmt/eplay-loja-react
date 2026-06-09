import { useEffect, useState } from 'react'
import { ScrollTopButton } from './styles'

// Botão flutuante que aparece ao rolar a página e volta ao topo ao clicar.
const BackToTop = () => {
  const [visible, setVisible] = useState(() => window.scrollY > 300)

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 300)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <ScrollTopButton
      type="button"
      $visible={visible}
      aria-label="Voltar ao topo"
      onClick={scrollToTop}
    >
      ↑
    </ScrollTopButton>
  )
}

export default BackToTop
