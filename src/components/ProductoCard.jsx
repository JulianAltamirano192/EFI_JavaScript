import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { CarritoContext } from '../context/CarritoContext.js'
import { formatearPrecio } from '../utils/precio.js'
import FavoritoBoton from './FavoritoBoton.jsx'
import { IconoMas } from './Iconos.jsx'

// onEliminar is optional: the Favoritos page shows the card without the delete button.
function ProductoCard({ producto, marca, onEliminar }) {
  const { agregarAlCarrito } = useContext(CarritoContext)
  const sinStock = typeof producto.stock === 'number' && producto.stock <= 0

  return (
    <article className="group flex flex-col">
      <Link
        to={`/productos/${producto.id}`}
        className="relative block overflow-hidden bg-stone-100 dark:bg-noche-claro"
      >
        {producto.imagen ? (
          <img
            src={producto.imagen}
            alt={producto.nombre}
            className="aspect-4/5 w-full object-cover saturate-[.85] transition-transform duration-700 ease-out group-hover:scale-[1.03] dark:brightness-90"
          />
        ) : (
          <div className="aspect-4/5 w-full bg-linear-to-br from-stone-100 to-oro-100/60 dark:from-noche-claro dark:to-oro-950/40" />
        )}
        {/* Same thin inner frame and soft shade on every photo, so light and dark photos read as one set. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-linear-to-t from-stone-900/6 via-transparent to-transparent ring-1 ring-inset ring-stone-900/5 dark:from-black/25 dark:ring-white/5"
        />
      </Link>
      <div className="flex flex-1 flex-col items-center gap-1.5 px-2 pt-5 text-center">
        {marca && (
          <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-oro-700 dark:text-oro-300">
            {marca}
          </p>
        )}
        <Link to={`/productos/${producto.id}`} className="font-display text-xl leading-snug text-stone-900 decoration-oro-400 decoration-1 underline-offset-4 hover:underline dark:text-stone-50">
          {producto.nombre}
        </Link>
        <p className="text-sm tracking-wide text-stone-600 dark:text-stone-300">{formatearPrecio(producto.precio)}</p>
        <div className="mt-auto flex w-full flex-col gap-1 pt-4">
          <button
            type="button"
            onClick={() => agregarAlCarrito({ ...producto, marca })}
            disabled={sinStock}
            className="inline-flex min-h-11 w-full items-center justify-center gap-2 border border-stone-300 text-xs font-medium uppercase tracking-[0.18em] text-stone-800 transition-colors hover:border-stone-900 hover:bg-stone-900 hover:text-marfil disabled:cursor-not-allowed disabled:border-stone-200 disabled:text-stone-400 disabled:hover:bg-transparent sm:min-h-10 dark:border-stone-700 dark:text-stone-200 dark:hover:border-oro-300 dark:hover:bg-oro-300 dark:hover:text-stone-950 dark:disabled:border-stone-800 dark:disabled:text-stone-600 dark:disabled:hover:bg-transparent"
          >
            {sinStock ? (
              'Sin stock'
            ) : (
              <>
                <IconoMas className="size-3.5" />
                Agregar al carrito
              </>
            )}
          </button>
          <div className="flex items-center justify-center gap-6">
            <FavoritoBoton producto={{ ...producto, marca }} />
            {onEliminar && (
              <button
                type="button"
                onClick={() => onEliminar(producto)}
                className="min-h-11 text-xs uppercase tracking-[0.16em] text-stone-400 transition-colors hover:text-red-700 sm:min-h-8 dark:text-stone-500 dark:hover:text-red-400"
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
