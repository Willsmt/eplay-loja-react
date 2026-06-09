import styled from 'styled-components'
import type { Props } from '.'
import { colors } from '../../styles'
import { Card } from '../ProductCard/styles'

export const Container = styled.section<Omit<Props, 'title' | 'games'>>`
  padding: 32px 0;
  background-color: ${props =>
    props.background === 'black' ? `${colors.black} ` : `${colors.gray} `};

  ${Card} {
    background-color: ${props =>
      props.background === 'black' ? `${colors.gray} ` : `${colors.black} `};
  }

  // --- carrossel (tablet/celular) ---
  .swiper {
    margin-top: 40px;
    // espaço para os bullets de paginação não cobrirem os cards
    padding-bottom: 32px;
  }

  // slides com a mesma altura, deixando o card preencher tudo
  .swiper-slide {
    height: auto;
    display: flex;
  }

  .swiper-pagination-bullet {
    background-color: ${colors.white};
  }

  .swiper-pagination-bullet-active {
    background-color: ${colors.green};
  }
`

export const List = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 24px;
  align-items: stretch;

  margin-top: 40px;

  // cada item estica para a altura da linha, fazendo o card preencher tudo
  li {
    display: flex;
  }
`

export const Title = styled.h2`
  font-size: 18px;
  font-weight: bold;
`
