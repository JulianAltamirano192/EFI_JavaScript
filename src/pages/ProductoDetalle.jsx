import { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ErrorMessage from '../components/ErrorMessage.jsx'
import FavoritoBoton from '../components/FavoritoBoton.jsx'
import { IconoBolsa, IconoCheck, IconoFlechaIzquierda, IconoMas, IconoMenos } from '../components/Iconos.jsx'
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
        <Link to="/productos" className="inline-flex min-h-11 items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-stone-500 transition-colors hover:text-stone-900 sm:min-h-0 dark:text-stone-400 dark:hover:text-stone-50">
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
    <article className="grid items-start gap-10 md:grid-cols-2 lg:gap-16">
      {producto.imagen && (
        <div className="relative bg-stone-100 md:sticky md:top-28 dark:bg-noche-claro">
          <img
            src={producto.imagen}
            alt={producto.nombre}
            className="aspect-4/5 w-full object-cover saturate-[.85] dark:brightness-90"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-stone-900/5 dark:ring-white/5"
          />
        </div>
      )}
      <div className="space-y-6">
        <Link to="/productos" className="inline-flex min-h-11 items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-stone-500 transition-colors hover:text-stone-900 sm:min-h-0 dark:text-stone-400 dark:hover:text-stone-50">
          <IconoFlechaIzquierda className="size-4" />
          Volver a productos
        </Link>
        <h1 className="text-5xl font-medium leading-[1.05] tracking-tight text-stone-900 sm:text-6xl dark:text-stone-50">{producto.nombre}</h1>
        <p className="text-xl font-light tracking-wide text-stone-700 dark:text-oro-200">{formatearPrecio(producto.precio)}</p>
        <FavoritoBoton producto={{ ...producto, marca: producto.marca.nombre }} />

        {/* Sección de compra / Carrito */}
        <div className="space-y-5 border-y border-stone-200 py-6 dark:border-stone-800">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-stone-500 dark:text-stone-400">Cantidad:</span>
            <div className="flex items-center border border-stone-300 dark:border-stone-700">
              <button
                type="button"
                onClick={() => setCantidad((c) => Math.max(1, c - 1))}
                disabled={sinStock || cantidad <= 1}
                className="flex size-11 items-center justify-center text-stone-600 transition-colors hover:bg-stone-100 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent sm:size-10 dark:text-stone-300 dark:hover:bg-stone-800"
              >
                <IconoMenos className="size-4" />
                <span className="sr-only">-</span>
              </button>
              <span className="min-w-8 text-center text-sm tabular-nums">{cantidad}</span>
              <button
                type="button"
                onClick={() => setCantidad((c) => (producto.stock ? Math.min(producto.stock, c + 1) : c + 1))}
                disabled={sinStock || (typeof producto.stock === 'number' && cantidad >= producto.stock)}
                className="flex size-11 items-center justify-center text-stone-600 transition-colors hover:bg-stone-100 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent sm:size-10 dark:text-stone-300 dark:hover:bg-stone-800"
              >
                <IconoMas className="size-4" />
                <span className="sr-only">+</span>
              </button>
            </div>
            {producto.stock > 0 && (
              <span className="text-xs tracking-wide text-stone-500 dark:text-stone-400">
                ({producto.stock} disponibles)
              </span>
            )}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={handleAgregar}
              disabled={sinStock}
              className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 bg-stone-900 px-6 text-xs font-medium uppercase tracking-[0.2em] text-marfil transition-colors hover:bg-oro-700 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-stone-900 dark:bg-oro-300 dark:text-stone-950 dark:hover:bg-oro-200 dark:disabled:hover:bg-oro-300"
            >
              {sinStock ? (
                'Sin stock'
              ) : agregado ? (
                <>
                  <IconoCheck className="size-4" />
                  ¡Agregado al carrito!
                </>
              ) : (
                'Agregar al carrito'
              )}
            </button>
            <button
              type="button"
              onClick={abrirCarrito}
              className="inline-flex min-h-12 items-center justify-center gap-2 border border-stone-300 px-6 text-xs font-medium uppercase tracking-[0.2em] text-stone-800 transition-colors hover:border-stone-900 dark:border-stone-700 dark:text-stone-200 dark:hover:border-oro-300"
            >
              Ver carrito
              <IconoBolsa className="size-4" />
            </button>
          </div>
        </div>

        {producto.descripcion && <p className="text-pretty font-light leading-relaxed text-stone-600 dark:text-stone-300">{producto.descripcion}</p>}
        <dl className="grid grid-cols-[auto_1fr] border-b border-stone-200 text-sm dark:border-stone-800">
          <dt className="border-t border-stone-200 py-3 dark:border-stone-800 pr-8 text-[11px] font-medium uppercase leading-5 tracking-[0.2em] text-stone-500 dark:text-stone-400">Marca</dt>
          <dd className="border-t border-stone-200 py-3 leading-5 text-stone-800 dark:border-stone-800 dark:text-stone-200">
            {producto.marca.nombre}
            {producto.marca.pais && ` (${producto.marca.pais})`}
          </dd>
          <dt className="border-t border-stone-200 py-3 dark:border-stone-800 pr-8 text-[11px] font-medium uppercase leading-5 tracking-[0.2em] text-stone-500 dark:text-stone-400">Categoría</dt>
          <dd className="border-t border-stone-200 py-3 leading-5 text-stone-800 dark:border-stone-800 dark:text-stone-200">{producto.categoria.nombre}</dd>
          <dt className="border-t border-stone-200 py-3 dark:border-stone-800 pr-8 text-[11px] font-medium uppercase leading-5 tracking-[0.2em] text-stone-500 dark:text-stone-400">Material</dt>
          <dd className="border-t border-stone-200 py-3 leading-5 text-stone-800 dark:border-stone-800 dark:text-stone-200">{producto.material}</dd>
          <dt className="border-t border-stone-200 py-3 dark:border-stone-800 pr-8 text-[11px] font-medium uppercase leading-5 tracking-[0.2em] text-stone-500 dark:text-stone-400">Stock</dt>
          <dd className="border-t border-stone-200 py-3 leading-5 text-stone-800 dark:border-stone-800 dark:text-stone-200">{producto.stock > 0 ? `${producto.stock} unidades` : 'Sin stock'}</dd>
        </dl>
      </div>
    </article>
  )
}

export default ProductoDetalle
