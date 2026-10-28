import { Link } from 'react-router-dom'

function NoEncontrado() {
  return (
    <section className="flex flex-col items-center gap-6 py-24 text-center">
      <h1 className="text-5xl font-medium tracking-tight text-stone-900 sm:text-6xl dark:text-stone-50">Página no encontrada</h1>
      <Link to="/" className="inline-flex min-h-11 items-center border-b border-oro-400 text-xs font-medium uppercase tracking-[0.2em] text-stone-800 transition-colors hover:text-oro-700 dark:border-oro-300 dark:text-stone-200 dark:hover:text-oro-200">
        Volver al inicio
      </Link>
    </section>
  )
}

export default NoEncontrado
