import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux'
import { store } from './store'

// Ponto de entrada da aplicação.
// - Provider: dá a toda a árvore de componentes acesso ao estado do Redux.
// - StrictMode: ajuda a detectar problemas em desenvolvimento (não afeta produção).
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)
