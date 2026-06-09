import { createGlobalStyle } from 'styled-components'

export const colors = {
  white: '#eee',
  black: '#111111',
  gray: '#333',
  lightGray: '#a3a3a3',
  green: '#10AC84',
  red: '#fa0303'
}

// pontos de quebra para responsividade
export const breakpoints = {
  tablet: '768px',
  mobile: '480px'
}

export const GlobalCss = createGlobalStyle`
*{
margin:0;
padding: 0;
box-sizing: border-box;
font-family: Roboto, sans-serif;
color: ${colors.white};
list-style:none;


}
body {
background-color:${colors.black};
margin-top: 40px;
}

.container {
  max-width: 1024px;
  width: 100%;
  margin: 0 auto;

  @media (max-width: ${breakpoints.tablet}) {
    max-width: 80%;
  }

  @media (max-width: ${breakpoints.mobile}) {
    max-width: 90%;
  }
}

`
