import type { Game } from '../pages/Home'
import { formataPreco } from './formatPrice'

export const getGameTags = (game: Game) => {
  const tags = []

  if (game.release_date) {
    tags.push(game.release_date)
  }

  if (game.prices.discount) {
    tags.push(`${game.prices.discount}%`)
  }

  if (game.prices.current) {
    tags.push(formataPreco(game.prices.current))
  }
  return tags
}
