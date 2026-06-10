import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { type RootState } from '../../store'
import { removeItem, clearCart, closeCart } from '../../store/reducers/cart'
import { formatPrice } from '../../utils/formatPrice'
import { getTotalPrice } from '../../utils/getTotalPrice'
import Tag from '../Tag'
import * as S from './styles'

const Cart = () => {
  const dispatch = useDispatch()
  const { items, isOpen } = useSelector((state: RootState) => state.cart)
  const navigate = useNavigate()

  // soma o valor de todos os itens do carrinho
  const totalPrice = getTotalPrice(items)

  const goToCheckout = () => {
    navigate('/checkout')
    dispatch(closeCart())
  }

  return (
    <S.CartContainer isOpen={isOpen}>
      <S.Overlay onClick={() => dispatch(closeCart())} />
      <S.Sidebar isOpen={isOpen}>
        <S.CartHeader>
          <h2>Carrinho</h2>
          <button type="button" onClick={() => dispatch(closeCart())}>
            ✕
          </button>
        </S.CartHeader>

        {items.length === 0 ? (
          <p>Seu carrinho está vazio.</p>
        ) : (
          <>
            <S.CartList>
              {items.map(item => (
                <S.CartItem key={item.id}>
                  <img src={item.media.thumbnail} alt={item.name} />
                  <div>
                    <h3>{item.name}</h3>
                    <S.Tags>
                      <Tag>{item.details.system}</Tag>
                      <Tag>{item.details.category}</Tag>
                    </S.Tags>
                  </div>
                  <button
                    type="button"
                    aria-label={`Remover ${item.name} do carrinho`}
                    onClick={() => dispatch(removeItem(item.id))}
                  >
                    ✕
                  </button>
                </S.CartItem>
              ))}
            </S.CartList>

            <S.Quantity>
              {items.length} {items.length === 1 ? 'jogo' : 'jogos'} no carrinho
            </S.Quantity>

            <S.Total>
              <span>Total a pagar</span>
              <span>{formatPrice(totalPrice)}</span>
            </S.Total>

            <S.Installments>em até 6x sem juros</S.Installments>

            <S.CartFooter>
              <button type="button" onClick={goToCheckout}>
                Continuar com a compra
              </button>
              <button
                type="button"
                className="secondary"
                onClick={() => dispatch(clearCart())}
              >
                Limpar a lista
              </button>
            </S.CartFooter>
          </>
        )}
      </S.Sidebar>
    </S.CartContainer>
  )
}

export default Cart
