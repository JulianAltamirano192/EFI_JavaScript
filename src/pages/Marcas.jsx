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
    <section className="space-y-6">
      <h1 className="text-2xl font-semibold">Marcas</h1>
      {loading && <Loader texto="Cargando marcas..." />}
      {error && <ErrorMessage mensaje={error} />}
      {!loading && !error && (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {marcas.map((marca) => (
            <li key={marca.id} className="rounded-lg border border-stone-200 bg-white p-4">
              <p className="font-medium">{marca.nombre}</p>
              {marca.pais && <p className="text-sm text-stone-500">{marca.pais}</p>}
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default Marcas
