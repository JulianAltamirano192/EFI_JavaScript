import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import CarritoProvider from './context/CarritoProvider.jsx'
import FavoritosProvider from './context/FavoritosProvider.jsx'
import TemaProvider from './context/TemaProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TemaProvider>
      <FavoritosProvider>
        <CarritoProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </CarritoProvider>
      </FavoritosProvider>
    </TemaProvider>
  </StrictMode>,
)
