import { useSelector, useDispatch } from 'react-redux'
import { type RootState } from '../../store'
import { removeItem, clearCart, closeCart } from '../../store/reducers/cart'
import { formataPreco } from '../../utils/formatPrice'
import Tag from '../Tag'
import {
  CartContainer,
  Overlay,
  Sidebar,
  CartHeader,
  CartList,
  CartItem,
  Tags,
  Quantidade,
  Total,
  Parcelas,
  CartFooter
} from './styles'

const Cart = () => {
  const dispatch = useDispatch()
  const { items, isOpen } = useSelector((state: RootState) => state.cart)

  // soma o valor de todos os itens do carrinho
  const valorTotal = items.reduce(
    (acc, item) => acc + (item.prices.current ?? 0),
    0
  )

  return (
    <CartContainer isOpen={isOpen}>
      <Overlay onClick={() => dispatch(closeCart())} />
      <Sidebar isOpen={isOpen}>
        <CartHeader>
          <h2>Carrinho</h2>
          <button type="button" onClick={() => dispatch(closeCart())}>
            ✕
          </button>
        </CartHeader>

        {items.length === 0 ? (
          <p>Seu carrinho está vazio.</p>
        ) : (
          <>
            <CartList>
              {items.map(item => (
                <CartItem key={item.id}>
                  <img src={item.media.thumbnail} alt={item.name} />
                  <div>
                    <h3>{item.name}</h3>
                    <Tags>
                      <Tag>{item.details.system}</Tag>
                      <Tag>{item.details.category}</Tag>
                    </Tags>
                  </div>
                  <button
                    type="button"
                    aria-label={`Remover ${item.name} do carrinho`}
                    onClick={() => dispatch(removeItem(item.id))}
                  >
                    ✕
                  </button>
                </CartItem>
              ))}
            </CartList>

            <Quantidade>
              {items.length} {items.length === 1 ? 'jogo' : 'jogos'} no carrinho
            </Quantidade>

            <Total>
              <span>Total a pagar</span>
              <span>{formataPreco(valorTotal)}</span>
            </Total>

            <Parcelas>em até 6x sem juros</Parcelas>

            <CartFooter>
              <button type="button">Continuar com a compra</button>
              <button
                type="button"
                className="secondary"
                onClick={() => dispatch(clearCart())}
              >
                Limpar a lista
              </button>
            </CartFooter>
          </>
        )}
      </Sidebar>
    </CartContainer>
  )
}

export default Cart
