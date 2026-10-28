import { useContext } from 'react'
import { Link } from 'react-router-dom'
import ProductoCard from '../components/ProductoCard.jsx'
import { FavoritosContext } from '../context/FavoritosContext.js'

function Favoritos() {
  const { favoritos } = useContext(FavoritosContext)

  return (
    <section className="space-y-8">
      <h1 className="border-b border-stone-200 pb-6 text-5xl font-medium tracking-tight text-stone-900 sm:text-6xl dark:border-stone-800 dark:text-stone-50">Favoritos</h1>
      {favoritos.length === 0 ? (
        <p className="py-16 text-center font-display text-2xl italic text-stone-500 dark:text-stone-400">
          Todavía no marcaste ningún favorito.{' '}
          <Link to="/productos" className="not-italic text-oro-700 underline decoration-oro-300 decoration-1 underline-offset-4 transition-colors hover:text-stone-900 dark:text-oro-300 dark:decoration-oro-700 dark:hover:text-oro-200">
            Ver productos
          </Link>
        </p>
      ) : (
        <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8">
          {favoritos.map((favorito) => (
            <ProductoCard key={favorito.id} producto={favorito} marca={favorito.marca} />
          ))}
        </div>
      )}
    </section>
  )
}

export default Favoritos
