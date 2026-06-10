import Section from '../Section'
import { Items, Item, Action, Modal, ModalContent } from './styles'
import { useState } from 'react'

import play from '../../assets/images/botao-play_1.png'
import zoom from '../../assets/images/mais_zoom_1.png'
import close from '../../assets/images/close.png'

type Props = {
  defaultCover: string
  name: string
  gallery: GalleryItem[] // agora recebemos direto da API
}

interface ModalState extends GalleryItem {
  isVisible: boolean
}

const Gallery = ({ defaultCover, name, gallery }: Props) => {
  const [modal, setModal] = useState<ModalState>({
    isVisible: false,
    type: 'image',
    url: ''
  })

  const getMediaCover = (item: GalleryItem) => {
    if (item.type === 'image') return item.url
    return defaultCover
  }

  const getMediaIcon = (item: GalleryItem) => {
    if (item.type === 'image') return zoom
    return play
  }

  const closeModal = () => {
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
          {gallery.map((media, index) => (
            <Item
              key={media.url}
              onClick={() =>
                setModal({
                  isVisible: true,
                  type: media.type,
                  url: media.url
                })
              }
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
            <img src={close} alt="Fechar" onClick={closeModal} />
          </header>

          {modal.type === 'image' ? (
            <img src={modal.url} alt={`Mídia selecionada de ${name}`} />
          ) : (
            <iframe
              src={modal.url}
              title={`Vídeo de ${name}`}
              width="100%"
              height="480"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
        </ModalContent>
        <div className="overlay" onClick={closeModal}></div>
      </Modal>
    </>
  )
}

export default Gallery
