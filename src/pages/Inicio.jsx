import { Link } from 'react-router-dom'

function Inicio() {
  return (
    <section className="space-y-6 rounded-2xl border border-amber-100 bg-linear-to-br from-amber-50 via-stone-50 to-amber-100 px-6 py-20 sm:px-12 sm:py-28 dark:border-stone-800 dark:from-stone-900 dark:via-stone-950 dark:to-amber-950/40">
      <h1 className="text-5xl font-bold tracking-tight sm:text-7xl">Joyería y Relojería</h1>
      <p className="max-w-xl text-pretty text-lg text-stone-600 sm:text-xl dark:text-stone-300">
        Anillos, collares, pulseras, aros y relojes de las mejores marcas.
      </p>
      <div className="flex flex-wrap gap-3">
        <Link
          to="/productos"
          className="rounded-md bg-amber-700 px-5 py-2.5 font-medium text-white hover:bg-amber-800"
        >
          Ver productos
        </Link>
        <Link
          to="/marcas"
          className="rounded-md border border-stone-300 dark:border-stone-700 px-5 py-2.5 font-medium hover:bg-stone-100 dark:hover:bg-stone-800"
        >
          Ver marcas
        </Link>
      </div>
    </section>
  )
}

export default Inicio
