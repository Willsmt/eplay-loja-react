import Section from '../Section'
import { Items, Item, Action, Modal, ModalContent } from './styles'
import { useEffect, useState } from 'react'

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

  const openModal = (media: GalleryItem) => {
    setModal({
      isVisible: true,
      type: media.type,
      url: media.url
    })
  }

  const closeModal = () => {
    setModal({
      isVisible: false,
      type: 'image',
      url: ''
    })
  }

  // fecha o modal ao apertar Esc enquanto ele está aberto
  useEffect(() => {
    if (!modal.isVisible) return

    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setModal({ isVisible: false, type: 'image', url: '' })
      }
    }

    document.addEventListener('keydown', handleEsc)
    return () => document.removeEventListener('keydown', handleEsc)
  }, [modal.isVisible])

  return (
    <>
      <Section background="black" title="Galeria">
        <Items>
          {gallery.map((media, index) => (
            <Item
              key={media.url}
              role="button"
              tabIndex={0}
              aria-label={`Abrir mídia ${index + 1} de ${name}`}
              onClick={() => openModal(media)}
              onKeyDown={event => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault()
                  openModal(media)
                }
              }}
            >
              <img
                src={getMediaCover(media)}
                alt={`Mídia ${index + 1} de ${name}`}
              />
              <Action>
                <img src={getMediaIcon(media)} alt="" />
              </Action>
            </Item>
          ))}
        </Items>
      </Section>

      <Modal className={modal.isVisible ? 'visible' : ''}>
        <ModalContent className="container">
          <header>
            <h4>{name}</h4>
            <button type="button" onClick={closeModal} aria-label="Fechar">
              <img src={close} alt="" />
            </button>
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
