import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Favoritos from './pages/Favoritos.jsx'
import Inicio from './pages/Inicio.jsx'
import Marcas from './pages/Marcas.jsx'
import NoEncontrado from './pages/NoEncontrado.jsx'
import ProductoDetalle from './pages/ProductoDetalle.jsx'
import ProductoNuevo from './pages/ProductoNuevo.jsx'
import Productos from './pages/Productos.jsx'

function App() {
  return (
    <Routes>
      {/* Layout renders the Navbar and an <Outlet /> where each page goes */}
      <Route element={<Layout />}>
        <Route index element={<Inicio />} />
        {/* Nested route: /productos/nuevo renders inside the <Outlet /> of Productos */}
        <Route path="productos" element={<Productos />}>
          <Route path="nuevo" element={<ProductoNuevo />} />
        </Route>
        <Route path="productos/:id" element={<ProductoDetalle />} />
        <Route path="marcas" element={<Marcas />} />
        <Route path="favoritos" element={<Favoritos />} />
        <Route path="*" element={<NoEncontrado />} />
      </Route>
    </Routes>
  )
}

export default App
