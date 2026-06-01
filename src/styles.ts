import { createGlobalStyle } from 'styled-components'

export const cores = {
  branca: '#eee',
  preta: '#111111',
  cinza: '#333',
  verde: '#10AC84'
}

export const GlobalCss = createGlobalStyle`
*{
margin:0;
padding: 0;
box-sizing: border-box;
font-family: Roboto, sans-serif;
color: ${cores.branca}
}
body {
background-color:${cores.preta}
}
`
