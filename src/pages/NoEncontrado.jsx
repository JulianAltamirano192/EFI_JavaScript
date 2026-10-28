import { Link } from 'react-router-dom'

function NoEncontrado() {
  return (
    <section className="space-y-4 py-12 text-center">
      <h1 className="text-3xl font-bold">Página no encontrada</h1>
      <Link to="/" className="text-amber-800 dark:text-amber-400 hover:underline">
        Volver al inicio
      </Link>
    </section>
  )
}

export default NoEncontrado
