import { BrowserRouter } from 'react-router-dom'
import Rotas from './routes'
import Header from './components/Header'
import { GlobalCss } from './styles'
import Footer from './components/Footer'
import Cart from './components/Cart'
import ScrollToHash from './components/ScrollToHash'
import BackToTop from './components/BackToTop'

function App() {
  return (
    <BrowserRouter>
      <GlobalCss />
      <ScrollToHash />
      <div className="container">
        <Header />
      </div>
      <Rotas />
      <Footer />
      <Cart />
      <BackToTop />
    </BrowserRouter>
  )
}

export default App
