import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './reducers/cart.ts'
import { api } from '../services/api'

// Criamos a store central
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    [api.reducerPath]: api.reducer
  },
  // habilita cache, invalidação, polling e os demais recursos do RTK Query
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(api.middleware)
})

// Tipos auxiliares para usar com useSelector e useDispatch
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
