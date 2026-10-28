import { useNavigate, useOutletContext } from 'react-router-dom'
import ProductoForm from '../components/ProductoForm.jsx'
import { createProducto } from '../services/api.js'

function ProductoNuevo() {
  const { marcas, categorias, recargar } = useOutletContext()
  const navigate = useNavigate()

  async function guardar(producto) {
    await createProducto(producto)
    recargar()
    navigate('/productos')
  }

  return <ProductoForm titulo="Nuevo producto" marcas={marcas} categorias={categorias} onGuardar={guardar} />
}

export default ProductoNuevo
