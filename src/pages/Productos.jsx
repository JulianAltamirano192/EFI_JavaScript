import { useContext, useEffect, useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import ErrorMessage from '../components/ErrorMessage.jsx'
import { IconoChevron } from '../components/Iconos.jsx'
import Loader from '../components/Loader.jsx'
import ProductoCard from '../components/ProductoCard.jsx'
import { CarritoContext } from '../context/CarritoContext.js'
import { FavoritosContext } from '../context/FavoritosContext.js'
import { deleteProducto, getCategorias, getMarcas, getProductos } from '../services/api.js'

const POR_PAGINA = 9

function Productos() {
  const { quitarFavorito } = useContext(FavoritosContext)
  const { quitarDelCarrito } = useContext(CarritoContext)
  const [productos, setProductos] = useState([])
  const [paginas, setPaginas] = useState(1)
  const [pagina, setPagina] = useState(1)
  const [filtros, setFiltros] = useState({ marca_id: '', categoria_id: '' })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  // Changing this number asks the effect to fetch the same page again.
  const [recargas, setRecargas] = useState(0)

  const [marcas, setMarcas] = useState([])
  const [categorias, setCategorias] = useState([])

  // Marcas and categorias fill the filters and the form, so they load once.
  useEffect(() => {
    let ignorar = false
    Promise.all([getMarcas(), getCategorias()])
      .then(([dataMarcas, dataCategorias]) => {
        if (ignorar) return
        setMarcas(dataMarcas.items)
        setCategorias(dataCategorias.items)
      })
      .catch((err) => !ignorar && setError(err.message))
    return () => {
      ignorar = true
    }
  }, [])

  // Fetches again whenever the page, a filter or recargas changes.
  useEffect(() => {
    let ignorar = false
    getProductos({ page: pagina, size: POR_PAGINA, ...filtros })
      .then((data) => {
        if (ignorar) return
        setProductos(data.items)
        setPaginas(Math.max(data.pages, 1))
      })
      .catch((err) => !ignorar && setError(err.message))
      .finally(() => !ignorar && setLoading(false))
    return () => {
      ignorar = true
    }
  }, [pagina, filtros, recargas])

  // loading is turned on by the event that triggers the fetch, not inside the effect.
  function empezarCarga() {
    setLoading(true)
    setError(null)
  }

  function cambiarFiltro(event) {
    empezarCarga()
    setFiltros({ ...filtros, [event.target.name]: event.target.value })
    setPagina(1)
  }

  function cambiarPagina(nueva) {
    empezarCarga()
    setPagina(nueva)
  }

  function recargar() {
    empezarCarga()
    setRecargas((n) => n + 1)
  }

  async function eliminar(producto) {
    if (!window.confirm(`¿Eliminar "${producto.nombre}"?`)) return
    try {
      await deleteProducto(producto.id)
      // A deleted product cannot stay in favorites or in the cart.
      quitarFavorito(producto.id)
      quitarDelCarrito(producto.id)
      // If it was the last product of the page, go back one page.
      if (productos.length === 1 && pagina > 1) cambiarPagina(pagina - 1)
      else recargar()
    } catch (err) {
      setError(err.message)
    }
  }

  const nombreDeMarca = (id) => marcas.find((marca) => marca.id === id)?.nombre

  return (
    <section className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-stone-200 pb-6 dark:border-stone-800">
        <h1 className="text-5xl font-medium tracking-tight text-stone-900 sm:text-6xl dark:text-stone-50">Productos</h1>
        <Link
          to="nuevo"
          className="inline-flex min-h-11 items-center border border-stone-900/70 px-5 text-xs font-medium uppercase tracking-[0.18em] text-stone-900 transition-colors hover:bg-stone-900 hover:text-marfil sm:min-h-10 dark:border-stone-500 dark:text-stone-100 dark:hover:border-oro-300 dark:hover:bg-oro-300 dark:hover:text-stone-950"
        >
          Nuevo producto
        </Link>
      </div>

      {/* Child routes such as /productos/nuevo render here and get these values */}
      <Outlet context={{ marcas, categorias, recargar }} />

      <div className="flex flex-wrap gap-3">
        <div className="relative">
          <select
            name="marca_id"
            value={filtros.marca_id}
            onChange={cambiarFiltro}
            aria-label="Filtrar por marca"
            className="min-h-11 appearance-none border border-stone-300 bg-transparent py-2 pl-4 pr-10 text-sm text-stone-700 transition-colors hover:border-stone-500 sm:min-h-10 dark:border-stone-700 dark:bg-noche dark:text-stone-200 dark:hover:border-stone-500"
          >
            <option value="">Todas las marcas</option>
            {marcas.map((marca) => (
              <option key={marca.id} value={marca.id}>
                {marca.nombre}
              </option>
            ))}
          </select>
          <IconoChevron className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-stone-400" />
        </div>
        <div className="relative">
          <select
            name="categoria_id"
            value={filtros.categoria_id}
            onChange={cambiarFiltro}
            aria-label="Filtrar por categoría"
            className="min-h-11 appearance-none border border-stone-300 bg-transparent py-2 pl-4 pr-10 text-sm text-stone-700 transition-colors hover:border-stone-500 sm:min-h-10 dark:border-stone-700 dark:bg-noche dark:text-stone-200 dark:hover:border-stone-500"
          >
            <option value="">Todas las categorías</option>
            {categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.nombre}
              </option>
            ))}
          </select>
          <IconoChevron className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-stone-400" />
        </div>
      </div>

      {error && <ErrorMessage mensaje={error} />}

      {loading ? (
        <Loader texto="Cargando productos..." />
      ) : productos.length === 0 ? (
        <p className="py-16 text-center font-display text-2xl italic text-stone-500 dark:text-stone-400">No hay productos para mostrar.</p>
      ) : (
        <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8">
          {productos.map((producto) => (
            <ProductoCard
              key={producto.id}
              producto={producto}
              marca={nombreDeMarca(producto.marca_id)}
              onEliminar={eliminar}
            />
          ))}
        </div>
      )}

      {paginas > 1 && (
        <nav aria-label="Paginación" className="flex items-center justify-center gap-6 border-t border-stone-200 pt-8 dark:border-stone-800">
          <button
            type="button"
            onClick={() => cambiarPagina(pagina - 1)}
            disabled={pagina === 1 || loading}
            className="min-h-11 border-b border-transparent px-1 text-xs font-medium uppercase tracking-[0.18em] text-stone-700 transition-colors hover:border-oro-500 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-transparent sm:min-h-9 dark:text-stone-200 dark:hover:border-oro-300"
          >
            Anterior
          </button>
          <span className="font-display text-lg italic text-stone-500 dark:text-stone-400">
            Página {pagina} de {paginas}
          </span>
          <button
            type="button"
            onClick={() => cambiarPagina(pagina + 1)}
            disabled={pagina === paginas || loading}
            className="min-h-11 border-b border-transparent px-1 text-xs font-medium uppercase tracking-[0.18em] text-stone-700 transition-colors hover:border-oro-500 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-transparent sm:min-h-9 dark:text-stone-200 dark:hover:border-oro-300"
          >
            Siguiente
          </button>
        </nav>
      )}
    </section>
  )
}

export default Productos
