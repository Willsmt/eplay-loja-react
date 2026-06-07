import zelda from '../../assets/images/zelda.png'
import play from '../../assets/images/botao-play_1.png'
import zoom from '../../assets/images/mais_zoom_1.png'
import Section from '../Section'
import { Items, Item, Action, Modal, ModalContent } from './styles'

import fechar from '../../assets/images/close.png'
import { useState } from 'react'

interface GalleryItem {
  type: 'image' | 'video'
  url: string
}

const mock: GalleryItem[] = [
  {
    type: 'image',
    url: zelda
  },
  {
    type: 'image',
    url: zelda
  },
  {
    type: 'video',
    url: 'https://www.youtube.com/embed/QdBZY2fkU-0?si=2_ckNrN-P3kMMdwo'
  }
]

type Props = {
  defaulCover: string
  name: string
}

interface ModalState extends GalleryItem {
  isVisible: boolean
}
const Gallery = ({ defaulCover, name }: Props) => {
  const [modal, setModal] = useState<ModalState>({
    isVisible: false,
    type: 'image',
    url: ''
  })

  const getMediaCover = (item: GalleryItem) => {
    if (item.type === 'image') return item.url
    return defaulCover
  }

  const getMediaIcon = (item: GalleryItem) => {
    if (item.type === 'image') return zoom
    return play
  }
  const fecharModal = () => {
    setModal({
      isVisible: false,
      type: 'image',
      url: ''
    })
  }

  return (
    <>
      <Section background="black" title="Galeria">
        <Items>
          {mock.map((media, index) => (
            <Item
              key={media.url}
              onClick={() => {
                setModal({
                  isVisible: true,
                  type: media.type,
                  url: media.url
                })
              }}
            >
              <img
                src={getMediaCover(media)}
                alt={`Mídia ${index + 1} de ${name}`}
              />
              <Action>
                <img src={getMediaIcon(media)} alt="Ícone de ação da mídia" />
              </Action>
            </Item>
          ))}
        </Items>
      </Section>
      <Modal className={modal.isVisible ? 'Visible' : ''}>
        <ModalContent className="container">
          <header>
            <h4>{name}</h4>
            <img
              src={fechar}
              alt="Ícone de fechar"
              onClick={() => fecharModal()}
            />
          </header>
          {modal.type === 'image' ? (
            <img src={modal.url} alt={`Mídia selecionada de ${name}`} />
          ) : (
            <iframe
              frameBorder={0}
              src={modal.url}
              title={`Vídeo de ${name}`}
              width="100%"
              height="480"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
        </ModalContent>
        <div className="overlay" onClick={() => fecharModal()}></div>
      </Modal>
    </>
  )
}

export default Gallery
