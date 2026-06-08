import { useCallback, useSyncExternalStore } from 'react'

// Retorna true quando a media query bate (ex.: '(max-width: 768px)').
// Usa useSyncExternalStore por ser a forma idiomática de ler um estado
// externo (matchMedia) e reagir às suas mudanças.
export const useMediaQuery = (query: string) => {
  const subscribe = useCallback(
    (callback: () => void) => {
      const mql = window.matchMedia(query)
      mql.addEventListener('change', callback)
      return () => mql.removeEventListener('change', callback)
    },
    [query]
  )

  const getSnapshot = () => window.matchMedia(query).matches

  return useSyncExternalStore(subscribe, getSnapshot)
}
