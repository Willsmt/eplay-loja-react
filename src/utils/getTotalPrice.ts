// soma o preço atual de todos os jogos do carrinho
export const getTotalPrice = (items: Game[]) => {
  return items.reduce((acc, item) => acc + (item.prices.current ?? 0), 0)
}
