import { useEffect, useState } from 'react'
import ErrorMessage from '../components/ErrorMessage.jsx'
import Loader from '../components/Loader.jsx'
import { getMarcas } from '../services/api.js'

function Marcas() {
  const [marcas, setMarcas] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let ignorar = false
    getMarcas()
      .then((data) => !ignorar && setMarcas(data.items))
      .catch((err) => !ignorar && setError(err.message))
      .finally(() => !ignorar && setLoading(false))
    return () => {
      ignorar = true
    }
  }, [])

  return (
    <section className="space-y-8">
      <h1 className="border-b border-stone-200 pb-6 text-5xl font-medium tracking-tight text-stone-900 sm:text-6xl dark:border-stone-800 dark:text-stone-50">Marcas</h1>
      {loading && <Loader texto="Cargando marcas..." />}
      {error && <ErrorMessage mensaje={error} />}
      {!loading && !error && (
        <ul className="grid border-l border-t border-stone-200 sm:grid-cols-2 lg:grid-cols-3 dark:border-stone-800">
          {marcas.map((marca) => (
            <li key={marca.id} className="flex flex-col items-center justify-center gap-2 border-b border-r border-stone-200 px-6 py-10 text-center transition-colors hover:bg-white dark:border-stone-800 dark:hover:bg-noche-claro">
              <p className="font-display text-3xl text-stone-900 dark:text-stone-50">{marca.nombre}</p>
              {marca.pais && <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-oro-700 dark:text-oro-300">{marca.pais}</p>}
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default Marcas
