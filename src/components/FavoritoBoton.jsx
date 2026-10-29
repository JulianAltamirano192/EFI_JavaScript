import { useContext } from 'react'
import { FavoritosContext } from '../context/FavoritosContext.js'
import { IconoCorazon, IconoCorazonLleno } from './Iconos.jsx'

// producto must include the marca name as a string: { id, nombre, precio, imagen, marca, stock }
function FavoritoBoton({ producto }) {
  const { esFavorito, alternarFavorito } = useContext(FavoritosContext)
  const activo = esFavorito(producto.id)

  return (
    <button
      type="button"
      onClick={() => alternarFavorito(producto)}
      aria-pressed={activo}
      aria-label={activo ? `Quitar ${producto.nombre} de favoritos` : `Agregar ${producto.nombre} a favoritos`}
      className={`inline-flex min-h-11 items-center gap-1.5 text-xs uppercase tracking-[0.16em] transition-colors sm:min-h-8 ${
        activo
          ? 'text-oro-700 dark:text-oro-300'
          : 'text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-50'
      }`}
    >
      {activo ? <IconoCorazonLleno className="size-4" /> : <IconoCorazon className="size-4" />}
      Favorito
    </button>
  )
}

export default FavoritoBoton
