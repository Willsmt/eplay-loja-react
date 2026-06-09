import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Game } from '../types'
import { categoriesConfig } from '../config/categoriesConfig'

type Product = {
  id: number
  price: number
}

type PurchasePayload = {
  products: Product[]
  billing: {
    name: string
    email: string
    document: string
  }
  delivery: {
    email: string
  }
  payment: {
    card: {
      active: boolean
      owner?: {
        name: string
        document: string
      }
      name?: string
      number?: string
      expires?: {
        month: number
        year: number
      }
      code?: number
    }
    installments: number
  }
}

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api-ebac.vercel.app/api/eplay'
  }),
  endpoints: builder => ({
    getOnSale: builder.query<Game[], void>({
      query: () => 'promocoes'
    }),
    getComingSoon: builder.query<Game[], void>({
      query: () => 'em-breve'
    }),
    // busca todas as categorias do config em paralelo, em uma única query
    getCategories: builder.query<Record<string, Game[]>, void>({
      async queryFn(_arg, _queryApi, _extraOptions, baseQuery) {
        const results = await Promise.all(
          categoriesConfig.map(category => baseQuery(category.key))
        )

        // se qualquer categoria falhar, propaga o erro
        const failed = results.find(result => result.error)
        if (failed?.error) {
          return { error: failed.error }
        }

        const data: Record<string, Game[]> = {}
        categoriesConfig.forEach((category, index) => {
          data[category.key] = results[index].data as Game[]
        })

        return { data }
      }
    }),
    getGame: builder.query<Game, string>({
      query: id => `jogos/${id}`
    }),
    getFeatured: builder.query<Game, void>({
      query: () => 'destaque'
    }),
    purchase: builder.mutation<any, PurchasePayload>({
      query: body => ({
        url: 'checkout',
        method: 'POST',
        body
      })
    })
  })
})

export const {
  useGetOnSaleQuery,
  useGetComingSoonQuery,
  useGetCategoriesQuery,
  useGetGameQuery,
  useGetFeaturedQuery,
  usePurchaseMutation
} = api
