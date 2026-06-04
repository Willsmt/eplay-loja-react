import type Game from '../../models/Game'
import ProductList from '../../components/ProductList'

import resident from '../../assets/images/resident.png'
import diablo from '../../assets/images/diablo.png'
import zelda from '../../assets/images/zelda.png'
import starWars from '../../assets/images/star_wars.png'

const rpg: Game[] = [
  {
    id: 1,
    title: 'Resident',
    category: 'ação',
    system: 'windows',
    description:
      'Resident Evil 4, conhecido no Japão como Biohazard 4, é um jogo eletrônico de survival horror...',
    infos: ['10%', 'R$ 250,00'],
    image: resident
  },
  {
    id: 2,
    title: 'Diablo IV',
    category: 'RPG',
    system: 'windows',
    description:
      'Diablo IV é um jogo de RPG de ação e hack and slash desenvolvido pela Blizzard Entertainment...',
    infos: ['20%', 'R$ 300,00'],
    image: diablo
  },
  {
    id: 3,
    title: 'The Legend of Zelda: Breath of the Wild',
    category: 'aventura',
    system: 'nintendo',
    description:
      'Breath of the Wild é um jogo de ação e aventura da franquia Zelda, com mundo aberto e exploração livre...',
    infos: ['15%', 'R$ 350,00'],
    image: zelda
  },
  {
    id: 4,
    title: 'Star Wars Jedi: Survivor',
    category: 'ação',
    system: 'windows',
    description:
      'Star Wars Jedi: Survivor é a continuação de Fallen Order, trazendo novas aventuras no universo Star Wars...',
    infos: ['5%', 'R$ 280,00'],
    image: starWars
  }
]
const acao: Game[] = [
  {
    id: 1,
    title: 'Resident',
    category: 'ação',
    system: 'windows',
    description:
      'Resident Evil 4, conhecido no Japão como Biohazard 4, é um jogo eletrônico de survival horror...',
    infos: ['10%', 'R$ 250,00'],
    image: resident
  },
  {
    id: 2,
    title: 'Diablo IV',
    category: 'RPG',
    system: 'windows',
    description:
      'Diablo IV é um jogo de RPG de ação e hack and slash desenvolvido pela Blizzard Entertainment...',
    infos: ['20%', 'R$ 300,00'],
    image: diablo
  },
  {
    id: 3,
    title: 'The Legend of Zelda: Breath of the Wild',
    category: 'aventura',
    system: 'nintendo',
    description:
      'Breath of the Wild é um jogo de ação e aventura da franquia Zelda, com mundo aberto e exploração livre...',
    infos: ['15%', 'R$ 350,00'],
    image: zelda
  },
  {
    id: 4,
    title: 'Star Wars Jedi: Survivor',
    category: 'ação',
    system: 'windows',
    description:
      'Star Wars Jedi: Survivor é a continuação de Fallen Order, trazendo novas aventuras no universo Star Wars...',
    infos: ['5%', 'R$ 280,00'],
    image: starWars
  }
]
const aventura: Game[] = [
  {
    id: 1,
    title: 'Resident',
    category: 'ação',
    system: 'windows',
    description:
      'Resident Evil 4, conhecido no Japão como Biohazard 4, é um jogo eletrônico de survival horror...',
    infos: ['10%', 'R$ 250,00'],
    image: resident
  },
  {
    id: 2,
    title: 'Diablo IV',
    category: 'RPG',
    system: 'windows',
    description:
      'Diablo IV é um jogo de RPG de ação e hack and slash desenvolvido pela Blizzard Entertainment...',
    infos: ['20%', 'R$ 300,00'],
    image: diablo
  },
  {
    id: 3,
    title: 'The Legend of Zelda: Breath of the Wild',
    category: 'aventura',
    system: 'nintendo',
    description:
      'Breath of the Wild é um jogo de ação e aventura da franquia Zelda, com mundo aberto e exploração livre...',
    infos: ['15%', 'R$ 350,00'],
    image: zelda
  },
  {
    id: 4,
    title: 'Star Wars Jedi: Survivor',
    category: 'ação',
    system: 'windows',
    description:
      'Star Wars Jedi: Survivor é a continuação de Fallen Order, trazendo novas aventuras no universo Star Wars...',
    infos: ['5%', 'R$ 280,00'],
    image: starWars
  }
]
const fps: Game[] = [
  {
    id: 5,
    title: 'Resident Evil 9',
    category: 'ação',
    system: 'windows',
    description:
      'A nova sequência da franquia Resident Evil promete expandir ainda mais o universo de survival horror...',
    infos: ['Em breve', '16/06'],
    image: resident
  },
  {
    id: 6,
    title: 'Diablo V',
    category: 'RPG',
    system: 'windows',
    description:
      'Diablo V continuará a saga sombria da Blizzard, trazendo novas classes e um mundo ainda mais vasto...',
    infos: ['Em breve', '16/06'],
    image: diablo
  },
  {
    id: 7,
    title: 'The Legend of Zelda: Echoes of Time',
    category: 'aventura',
    system: 'nintendo',
    description:
      'Um novo capítulo da franquia Zelda que promete explorar viagens temporais e mecânicas inéditas...',
    infos: ['Em breve', '16/06'],
    image: zelda
  },
  {
    id: 8,
    title: 'Star Wars Jedi: Legacy',
    category: 'ação',
    system: 'windows',
    description:
      'A continuação da saga Jedi Survivor, trazendo novos planetas e personagens icônicos do universo Star Wars...',
    infos: ['Em breve', '16/06'],
    image: starWars
  }
]

const Categories = () => (
  <>
    <ProductList games={rpg} title="RPG" background="gray" />
    <ProductList games={acao} title="AÇÃO" background="black" />
    <ProductList games={aventura} title="AVENTURA" background="gray" />
    <ProductList games={fps} title="FPS" background="black" />
  </>
)

export default Categories
