import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import addCart from './contexts/cartContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
       <addCart>
          <App />
       </addCart>
    </BrowserRouter>
  </StrictMode>,
)
