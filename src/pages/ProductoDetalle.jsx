import { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ErrorMessage from '../components/ErrorMessage.jsx'
import FavoritoBoton from '../components/FavoritoBoton.jsx'
import Loader from '../components/Loader.jsx'
import { CarritoContext } from '../context/CarritoContext.js'
import { getProducto } from '../services/api.js'
import { formatearPrecio } from '../utils/precio.js'

function ProductoDetalle() {
  const { id } = useParams()
  const { agregarAlCarrito, abrirCarrito } = useContext(CarritoContext)
  const [cantidad, setCantidad] = useState(1)
  const [agregado, setAgregado] = useState(false)

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

  const sinStock = producto.stock <= 0

  function handleAgregar() {
    agregarAlCarrito(
      {
        ...producto,
        marca: producto.marca.nombre,
      },
      cantidad,
    )
    setAgregado(true)
    setTimeout(() => setAgregado(false), 2500)
  }

  return (
    <article className="grid gap-8 md:grid-cols-2">
      {producto.imagen && (
        <img
          src={producto.imagen}
          alt={producto.nombre}
          className="aspect-square w-full rounded-lg object-cover dark:brightness-90"
        />
      )}
      <div className="space-y-4">
        <Link to="/productos" className="text-sm text-amber-800 dark:text-amber-400 hover:underline">
          ← Volver a productos
        </Link>
        <h1 className="text-4xl font-bold">{producto.nombre}</h1>
        <p className="text-2xl text-amber-900 dark:text-amber-300">{formatearPrecio(producto.precio)}</p>
        <FavoritoBoton producto={{ ...producto, marca: producto.marca.nombre }} />

        {/* Sección de compra / Carrito */}
        <div className="rounded-lg border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 p-4 space-y-3">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-stone-700 dark:text-stone-300">Cantidad:</span>
            <div className="flex items-center rounded-md border border-stone-300 dark:border-stone-700">
              <button
                type="button"
                onClick={() => setCantidad((c) => Math.max(1, c - 1))}
                disabled={sinStock || cantidad <= 1}
                className="px-3 py-1 text-sm font-bold disabled:opacity-40"
              >
                -
              </button>
              <span className="px-3 text-sm font-semibold">{cantidad}</span>
              <button
                type="button"
                onClick={() => setCantidad((c) => (producto.stock ? Math.min(producto.stock, c + 1) : c + 1))}
                disabled={sinStock || (typeof producto.stock === 'number' && cantidad >= producto.stock)}
                className="px-3 py-1 text-sm font-bold disabled:opacity-40"
              >
                +
              </button>
            </div>
            {producto.stock > 0 && (
              <span className="text-xs text-stone-500 dark:text-stone-400">
                ({producto.stock} disponibles)
              </span>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={handleAgregar}
              disabled={sinStock}
              className="flex-1 rounded-md bg-amber-700 px-4 py-2.5 text-sm font-medium text-white hover:bg-amber-800 disabled:opacity-40"
            >
              {sinStock ? 'Sin stock' : agregado ? '✓ ¡Agregado al carrito!' : 'Agregar al carrito'}
            </button>
            <button
              type="button"
              onClick={abrirCarrito}
              className="rounded-md border border-stone-300 dark:border-stone-700 px-4 py-2.5 text-sm font-medium hover:bg-stone-100 dark:hover:bg-stone-800"
            >
              Ver carrito 🛒
            </button>
          </div>
        </div>

        {producto.descripcion && <p className="text-stone-600 dark:text-stone-300">{producto.descripcion}</p>}
        <dl className="grid grid-cols-[auto_1fr] gap-x-8 gap-y-2 text-sm">
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
