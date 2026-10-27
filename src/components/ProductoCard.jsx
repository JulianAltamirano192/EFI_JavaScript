import { Link } from 'react-router-dom'
import { formatearPrecio } from '../utils/precio.js'

function ProductoCard({ producto, marca, onEliminar }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-lg border border-stone-200 bg-white">
      <Link to={`/productos/${producto.id}`}>
        {producto.imagen ? (
          <img
            src={producto.imagen}
            alt={producto.nombre}
            className="aspect-square w-full object-cover"
          />
        ) : (
          <div className="aspect-square w-full bg-stone-100" />
        )}
      </Link>
      <div className="flex flex-1 flex-col gap-1 p-4">
        {marca && <p className="text-xs uppercase tracking-wide text-stone-500">{marca}</p>}
        <Link to={`/productos/${producto.id}`} className="font-medium hover:underline">
          {producto.nombre}
        </Link>
        <p className="text-amber-900">{formatearPrecio(producto.precio)}</p>
        <button
          type="button"
          onClick={() => onEliminar(producto)}
          className="mt-auto self-start pt-2 text-sm text-red-700 hover:underline"
        >
          Eliminar
        </button>
      </div>
    </article>
  )
}

export default ProductoCard
