import type { Game } from '../pages/Home'

export const getGamesByCategory = async (category: string): Promise<Game[]> => {
  const res = await fetch(`https://api-ebac.vercel.app/api/eplay/${category}`)
  return res.json()
}
