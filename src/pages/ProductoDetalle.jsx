import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ErrorMessage from '../components/ErrorMessage.jsx'
import FavoritoBoton from '../components/FavoritoBoton.jsx'
import Loader from '../components/Loader.jsx'
import { getProducto } from '../services/api.js'
import { formatearPrecio } from '../utils/precio.js'

function ProductoDetalle() {
  const { id } = useParams()
  // Stores which id the data belongs to, so loading is derived instead of set inside the effect.
  const [resultado, setResultado] = useState({ id: null, producto: null, error: null })

  useEffect(() => {
    let ignorar = false
    getProducto(id)
      .then((producto) => !ignorar && setResultado({ id, producto, error: null }))
      .catch((err) => !ignorar && setResultado({ id, producto: null, error: err.message }))
    // If the id changes before the response arrives, the old response is ignored.
    return () => {
      ignorar = true
    }
  }, [id])

  const loading = resultado.id !== id
  const { producto, error } = resultado

  if (loading) return <Loader texto="Cargando producto..." />
  if (error) {
    return (
      <div className="space-y-4">
        <ErrorMessage mensaje={error} />
        <Link to="/productos" className="text-amber-800 dark:text-amber-400 hover:underline">
          Volver a productos
        </Link>
      </div>
    )
  }

  return (
    <article className="grid gap-8 md:grid-cols-2">
      {producto.imagen && (
        <img
          src={producto.imagen}
          alt={producto.nombre}
          className="aspect-square w-full rounded-lg object-cover"
        />
      )}
      <div className="space-y-4">
        <Link to="/productos" className="text-sm text-amber-800 dark:text-amber-400 hover:underline">
          ← Volver a productos
        </Link>
        <h1 className="text-3xl font-semibold">{producto.nombre}</h1>
        <p className="text-2xl text-amber-900 dark:text-amber-300">{formatearPrecio(producto.precio)}</p>
        <FavoritoBoton producto={{ ...producto, marca: producto.marca.nombre }} />
        {producto.descripcion && <p className="text-stone-600 dark:text-stone-300">{producto.descripcion}</p>}
        <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
          <dt className="text-stone-500 dark:text-stone-400">Marca</dt>
          <dd>
            {producto.marca.nombre}
            {producto.marca.pais && ` (${producto.marca.pais})`}
          </dd>
          <dt className="text-stone-500 dark:text-stone-400">Categoría</dt>
          <dd>{producto.categoria.nombre}</dd>
          <dt className="text-stone-500 dark:text-stone-400">Material</dt>
          <dd>{producto.material}</dd>
          <dt className="text-stone-500 dark:text-stone-400">Stock</dt>
          <dd>{producto.stock > 0 ? `${producto.stock} unidades` : 'Sin stock'}</dd>
        </dl>
      </div>
    </article>
  )
}

export default ProductoDetalle
