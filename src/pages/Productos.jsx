import { useContext, useEffect, useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import ErrorMessage from '../components/ErrorMessage.jsx'
import Loader from '../components/Loader.jsx'
import ProductoCard from '../components/ProductoCard.jsx'
import { FavoritosContext } from '../context/FavoritosContext.js'
import { deleteProducto, getCategorias, getMarcas, getProductos } from '../services/api.js'

const POR_PAGINA = 9

function Productos() {
  const { quitarFavorito } = useContext(FavoritosContext)
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
      // A deleted product cannot stay in favorites.
      quitarFavorito(producto.id)
      // If it was the last product of the page, go back one page.
      if (productos.length === 1 && pagina > 1) cambiarPagina(pagina - 1)
      else recargar()
    } catch (err) {
      setError(err.message)
    }
  }

  const nombreDeMarca = (id) => marcas.find((marca) => marca.id === id)?.nombre

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl font-bold">Productos</h1>
        <Link
          to="nuevo"
          className="rounded-md bg-amber-700 px-4 py-2 text-sm font-medium text-white hover:bg-amber-800"
        >
          Nuevo producto
        </Link>
      </div>

      {/* Child routes such as /productos/nuevo render here and get these values */}
      <Outlet context={{ marcas, categorias, recargar }} />

      <div className="flex flex-wrap gap-3">
        <select
          name="marca_id"
          value={filtros.marca_id}
          onChange={cambiarFiltro}
          aria-label="Filtrar por marca"
          className="rounded-md border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 px-3 py-2 text-sm"
        >
          <option value="">Todas las marcas</option>
          {marcas.map((marca) => (
            <option key={marca.id} value={marca.id}>
              {marca.nombre}
            </option>
          ))}
        </select>
        <select
          name="categoria_id"
          value={filtros.categoria_id}
          onChange={cambiarFiltro}
          aria-label="Filtrar por categoría"
          className="rounded-md border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 px-3 py-2 text-sm"
        >
          <option value="">Todas las categorías</option>
          {categorias.map((categoria) => (
            <option key={categoria.id} value={categoria.id}>
              {categoria.nombre}
            </option>
          ))}
        </select>
      </div>

      {error && <ErrorMessage mensaje={error} />}

      {loading ? (
        <Loader texto="Cargando productos..." />
      ) : productos.length === 0 ? (
        <p className="text-stone-500 dark:text-stone-400">No hay productos para mostrar.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
        <nav aria-label="Paginación" className="flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => cambiarPagina(pagina - 1)}
            disabled={pagina === 1 || loading}
            className="rounded-md border border-stone-300 dark:border-stone-700 px-3 py-1.5 text-sm disabled:opacity-40"
          >
            Anterior
          </button>
          <span className="text-sm text-stone-600 dark:text-stone-300">
            Página {pagina} de {paginas}
          </span>
          <button
            type="button"
            onClick={() => cambiarPagina(pagina + 1)}
            disabled={pagina === paginas || loading}
            className="rounded-md border border-stone-300 dark:border-stone-700 px-3 py-1.5 text-sm disabled:opacity-40"
          >
            Siguiente
          </button>
        </nav>
      )}
    </section>
  )
}

export default Productos
