import { useContext } from 'react'
import { Link } from 'react-router-dom'
import ProductoCard from '../components/ProductoCard.jsx'
import { FavoritosContext } from '../context/FavoritosContext.js'

function Favoritos() {
  const { favoritos } = useContext(FavoritosContext)

  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-bold">Favoritos</h1>
      {favoritos.length === 0 ? (
        <p className="text-stone-500 dark:text-stone-400">
          Todavía no marcaste ningún favorito.{' '}
          <Link to="/productos" className="text-amber-800 hover:underline dark:text-amber-400">
            Ver productos
          </Link>
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {favoritos.map((favorito) => (
            <ProductoCard key={favorito.id} producto={favorito} marca={favorito.marca} />
          ))}
        </div>
      )}
    </section>
  )
}

export default Favoritos
