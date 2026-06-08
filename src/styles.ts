import { createGlobalStyle } from 'styled-components'

export const cores = {
  branca: '#eee',
  preta: '#111111',
  cinza: '#333',
  cinzaClaro: '#a3a3a3',
  verde: '#10AC84',
  vermelha: '#fa0303'
}

// pontos de quebra para responsividade
export const breakpoints = {
  tablet: '768px',
  celular: '480px'
}

export const GlobalCss = createGlobalStyle`
*{
margin:0;
padding: 0;
box-sizing: border-box;
font-family: Roboto, sans-serif;
color: ${cores.branca};
list-style:none;


}
body {
background-color:${cores.preta};
margin-top: 40px;
}

.container {
  max-width: 1024px;
  width: 100%;
  margin: 0 auto;

  @media (max-width: ${breakpoints.tablet}) {
    max-width: 80%;
  }

  @media (max-width: ${breakpoints.celular}) {
    max-width: 90%;
  }
}

`
