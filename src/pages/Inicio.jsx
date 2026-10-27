import { Link } from 'react-router-dom'

function Inicio() {
  return (
    <section className="space-y-6 py-12">
      <h1 className="text-4xl font-semibold tracking-tight">Joyería y Relojería</h1>
      <p className="max-w-xl text-lg text-stone-600 dark:text-stone-300">
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
