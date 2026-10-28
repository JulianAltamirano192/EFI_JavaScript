import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { CarritoContext } from '../context/CarritoContext.js'
import { formatearPrecio } from '../utils/precio.js'
import FavoritoBoton from './FavoritoBoton.jsx'

// onEliminar is optional: the Favoritos page shows the card without the delete button.
function ProductoCard({ producto, marca, onEliminar }) {
  const { agregarAlCarrito } = useContext(CarritoContext)
  const sinStock = typeof producto.stock === 'number' && producto.stock <= 0

  return (
    <article className="flex flex-col overflow-hidden rounded-lg border border-stone-200 bg-white dark:border-stone-800 dark:bg-stone-900">
      <Link to={`/productos/${producto.id}`}>
        {producto.imagen ? (
          <img
            src={producto.imagen}
            alt={producto.nombre}
            className="aspect-square w-full object-cover dark:brightness-90"
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
        <div className="mt-auto flex flex-col gap-2 pt-2">
          <button
            type="button"
            onClick={() => agregarAlCarrito({ ...producto, marca })}
            disabled={sinStock}
            className="min-h-11 w-full rounded-md bg-amber-700 text-sm font-medium text-white transition-colors hover:bg-amber-800 disabled:cursor-not-allowed disabled:opacity-40 sm:min-h-9"
          >
            {sinStock ? 'Sin stock' : '+ Agregar al carrito'}
          </button>
          <div className="flex items-center justify-between gap-2">
            <FavoritoBoton producto={{ ...producto, marca }} />
            {onEliminar && (
              <button
                type="button"
                onClick={() => onEliminar(producto)}
                className="min-h-11 rounded-md px-2 text-sm text-stone-500 transition-colors hover:bg-red-50 hover:text-red-700 sm:min-h-8 dark:text-stone-400 dark:hover:bg-red-950/40 dark:hover:text-red-400"
              >
                Eliminar
              </button>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}

export default ProductoCard
