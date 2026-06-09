import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Game } from '../../types'

interface CartState {
  items: Game[]
  isOpen: boolean
}

const initialState: CartState = {
  items: [],
  isOpen: false
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Game>) => {
      // evita adicionar o mesmo jogo duas vezes
      const alreadyExists = state.items.find(
        item => item.id === action.payload.id
      )
      if (!alreadyExists) {
        state.items.push(action.payload)
      }
      // ao adicionar, abrimos o carrinho automaticamente
      state.isOpen = true
    },
    removeItem: (state, action: PayloadAction<number>) => {
      // remove pelo id do jogo
      state.items = state.items.filter(item => item.id !== action.payload)
    },
    clearCart: state => {
      // limpa todo o carrinho
      state.items = []
    },
    openCart: state => {
      state.isOpen = true
    },
    closeCart: state => {
      state.isOpen = false
    }
  }
})

export const { addItem, removeItem, clearCart, openCart, closeCart } =
  cartSlice.actions
export default cartSlice.reducer
