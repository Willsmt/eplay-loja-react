import { useEffect, useState } from 'react'
import ProductList from '../../components/ProductList'
import type { Game } from '../Home'
import { getGamesByCategory } from '../../utils/api'
import Banner from '../../components/Banner'

const Categories = () => {
  const [acao, setAcao] = useState<Game[]>([])
  const [esportes, setEsportes] = useState<Game[]>([])
  const [luta, setLuta] = useState<Game[]>([])
  const [rpg, setRpg] = useState<Game[]>([])
  const [simulacao, setSimulacao] = useState<Game[]>([])

  useEffect(() => {
    getGamesByCategory('acao').then(setAcao)
    getGamesByCategory('esportes').then(setEsportes)
    getGamesByCategory('luta').then(setLuta)
    getGamesByCategory('rpg').then(setRpg)
    getGamesByCategory('simulacao').then(setSimulacao)
  }, [])

  return (
    <>
      <Banner />
      <ProductList games={acao} title="Ação" background="black" />
      <ProductList games={esportes} title="Esportes" background="gray" />
      <ProductList games={luta} title="Luta" background="black" />
      <ProductList games={rpg} title="RPG" background="gray" />
      <ProductList games={simulacao} title="Simulação" background="black" />
    </>
  )
}

export default Categories
