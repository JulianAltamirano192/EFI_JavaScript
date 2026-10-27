import { Link } from 'react-router-dom'

function ProductoNuevo() {
  return (
    <div className="rounded-lg border border-stone-200 bg-white p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Nuevo producto</h2>
        <Link to="/productos" className="text-sm text-stone-500 hover:underline">
          Cerrar
        </Link>
      </div>
      <p className="mt-2 text-stone-500">Formulario de alta de producto.</p>
    </div>
  )
}

export default ProductoNuevo
