import { Link } from 'react-router-dom'
import { Esfera } from '../components/Iconos.jsx'

function Inicio() {
  return (
    <section className="grid items-center gap-12 py-4 sm:py-10 lg:min-h-[calc(100vh-14rem)] lg:grid-cols-[1.15fr_1fr] lg:gap-16">
      <div className="space-y-8">
        <span aria-hidden="true" className="block h-px w-16 bg-oro-500 dark:bg-oro-300" />
        <h1 className="text-[3.25rem] font-medium leading-[0.95] tracking-tight text-stone-900 sm:text-7xl lg:text-8xl dark:text-stone-50">Joyería y Relojería</h1>
        <p className="max-w-md text-pretty text-lg font-light leading-relaxed text-stone-600 sm:text-xl dark:text-stone-400">
          Anillos, collares, pulseras, aros y relojes de las mejores marcas.
        </p>
        <div className="flex flex-wrap gap-3 pt-2">
          <Link
            to="/productos"
            className="inline-flex min-h-12 items-center bg-stone-900 px-7 text-xs font-medium uppercase tracking-[0.2em] text-marfil transition-colors hover:bg-oro-700 dark:bg-oro-300 dark:text-stone-950 dark:hover:bg-oro-200"
          >
            Ver productos
          </Link>
          <Link
            to="/marcas"
            className="inline-flex min-h-12 items-center border border-stone-900/70 px-7 text-xs font-medium uppercase tracking-[0.2em] text-stone-900 transition-colors hover:bg-stone-900 hover:text-marfil dark:border-stone-500 dark:text-stone-100 dark:hover:border-oro-300 dark:hover:bg-transparent dark:hover:text-oro-200"
          >
            Ver marcas
          </Link>
        </div>
      </div>

      {/* Decorative panel: fills the right half on desktop and sits under the text on phones. */}
      <div aria-hidden="true" className="relative mx-auto aspect-square w-full max-w-sm border border-stone-200 bg-linear-to-br from-white via-oro-50 to-oro-100 sm:max-w-md lg:max-w-none dark:border-stone-800 dark:from-noche-claro dark:via-noche dark:to-oro-950/60">
        <span className="absolute inset-3 border border-oro-300/50 sm:inset-4 dark:border-oro-800/50" />
        <Esfera className="absolute inset-[14%] text-oro-600 dark:text-oro-300/80" />
      </div>
    </section>
  )
}

export default Inicio
