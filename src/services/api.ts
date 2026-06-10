// Camada de dados com RTK Query: declaramos os endpoints e a lib gera, de graça,
// hooks com cache, loading e erro (ex.: useGetOnSaleQuery). Evita fetch + useState
// + useEffect na mão para cada requisição.
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
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

type PurchaseResponse = {
  orderId: string
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
    // recebe o id do jogo e monta a URL dinâmica (ex.: jogos/123)
    getGame: builder.query<Game, string>({
      query: id => `jogos/${id}`
    }),
    getFeatured: builder.query<Game, void>({
      query: () => 'destaque'
    }),
    // mutation = operação que ALTERA dados no servidor (POST do checkout).
    // diferente das queries (GET), é disparada manualmente: usePurchaseMutation()
    purchase: builder.mutation<PurchaseResponse, PurchasePayload>({
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
