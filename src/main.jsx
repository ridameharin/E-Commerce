import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import Addcart from './contexts/cartContext.jsx'
import { Provider } from 'react-redux'
import { store } from './redux/store'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
       <Addcart>
          <Provider store={store}>
            <App />
          </Provider>
       </Addcart>
    </BrowserRouter>
  </StrictMode>,
)
