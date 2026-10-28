import { useContext } from 'react'
import { FavoritosContext } from '../context/FavoritosContext.js'

// producto must include the marca name as a string: { id, nombre, precio, imagen, marca }
function FavoritoBoton({ producto }) {
  const { esFavorito, alternarFavorito } = useContext(FavoritosContext)
  const activo = esFavorito(producto.id)

  return (
    <button
      type="button"
      onClick={() => alternarFavorito(producto)}
      aria-pressed={activo}
      aria-label={activo ? `Quitar ${producto.nombre} de favoritos` : `Agregar ${producto.nombre} a favoritos`}
      className={`min-h-11 rounded-full border px-3 py-1 text-sm sm:min-h-8 ${
        activo
          ? 'border-amber-600 bg-amber-100 text-amber-900 dark:bg-amber-900/40 dark:text-amber-200'
          : 'border-stone-300 text-stone-600 hover:bg-stone-100 dark:border-stone-700 dark:text-stone-300 dark:hover:bg-stone-800'
      }`}
    >
      {activo ? '♥ Favorito' : '♡ Favorito'}
    </button>
  )
}

export default FavoritoBoton
