import { Link } from 'react-router-dom'
import { formatearPrecio } from '../utils/precio.js'
import FavoritoBoton from './FavoritoBoton.jsx'

// onEliminar is optional: the Favoritos page shows the card without the delete button.
function ProductoCard({ producto, marca, onEliminar }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-lg border border-stone-200 bg-white dark:border-stone-800 dark:bg-stone-900">
      <Link to={`/productos/${producto.id}`}>
        {producto.imagen ? (
          <img
            src={producto.imagen}
            alt={producto.nombre}
            className="aspect-square w-full object-cover"
          />
        ) : (
          <div className="aspect-square w-full bg-stone-100 dark:bg-stone-800" />
        )}
      </Link>
      <div className="flex flex-1 flex-col gap-1 p-4">
        {marca && (
          <p className="text-xs uppercase tracking-wide text-stone-500 dark:text-stone-400">
            {marca}
          </p>
        )}
        <Link to={`/productos/${producto.id}`} className="font-medium hover:underline">
          {producto.nombre}
        </Link>
        <p className="text-amber-900 dark:text-amber-300">{formatearPrecio(producto.precio)}</p>
        <div className="mt-auto flex items-center justify-between gap-2 pt-2">
          <FavoritoBoton producto={{ ...producto, marca }} />
          {onEliminar && (
            <button
              type="button"
              onClick={() => onEliminar(producto)}
              className="text-sm text-red-700 hover:underline dark:text-red-400"
            >
              Eliminar
            </button>
          )}
        </div>
      </div>
    </article>
  )
}

export default ProductoCard
