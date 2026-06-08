import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Game } from '../types'
import { categoriesConfig } from '../config/categoriesConfig'

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api-ebac.vercel.app/api/eplay'
  }),
  endpoints: builder => ({
    getPromocoes: builder.query<Game[], void>({
      query: () => 'promocoes'
    }),
    getEmBreve: builder.query<Game[], void>({
      query: () => 'em-breve'
    }),
    // busca todas as categorias do config em paralelo, em uma única query
    getCategories: builder.query<Record<string, Game[]>, void>({
      async queryFn(_arg, _queryApi, _extraOptions, baseQuery) {
        const resultados = await Promise.all(
          categoriesConfig.map(categoria => baseQuery(categoria.key))
        )

        // se qualquer categoria falhar, propaga o erro
        const comErro = resultados.find(resultado => resultado.error)
        if (comErro?.error) {
          return { error: comErro.error }
        }

        const data: Record<string, Game[]> = {}
        categoriesConfig.forEach((categoria, indice) => {
          data[categoria.key] = resultados[indice].data as Game[]
        })

        return { data }
      }
    }),
    getGame: builder.query<Game, string>({
      query: id => `jogos/${id}`
    }),
    getDestaque: builder.query<Game, void>({
      query: () => 'destaque'
    })
  })
})

export const {
  useGetPromocoesQuery,
  useGetEmBreveQuery,
  useGetCategoriesQuery,
  useGetGameQuery,
  useGetDestaqueQuery
} = api
