import { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'
import CarritoDrawer from './CarritoDrawer.jsx'
import { IconoBolsa, IconoLuna, IconoSol } from './Iconos.jsx'
import { CarritoContext } from '../context/CarritoContext.js'
import { FavoritosContext } from '../context/FavoritosContext.js'
import { TemaContext } from '../context/TemaContext.js'

const enlaces = [
  { to: '/productos', texto: 'Productos' },
  { to: '/marcas', texto: 'Marcas' },
  { to: '/favoritos', texto: 'Favoritos' },
]

function Navbar() {
  const { favoritos } = useContext(FavoritosContext)
  const { tema, alternarTema } = useContext(TemaContext)
  const { cantidadTotal, abrirCarrito } = useContext(CarritoContext)

  return (
    <>
      <header className="z-40 border-b border-stone-200/80 bg-marfil/90 backdrop-blur-md sm:sticky sm:top-0 dark:border-stone-800/80 dark:bg-noche/90">
        <nav className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-4 gap-y-1 px-4 py-3 sm:px-6 sm:py-4">
          <Link to="/" className="font-display text-2xl font-medium tracking-tight text-stone-900 sm:text-[1.7rem] dark:text-stone-50">
            Joyería y Relojería
          </Link>
          {/* Wraps on narrow screens instead of pushing the page wider than the viewport. */}
          <div className="-mx-2 flex flex-wrap items-center gap-x-1 sm:mx-0 sm:gap-x-2">
            <ul className="flex">
              {enlaces.map(({ to, texto }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    className={({ isActive }) =>
                      `flex min-h-11 items-center border-b px-1.5 text-xs font-medium uppercase tracking-[0.1em] transition-colors sm:min-h-9 sm:px-3 sm:tracking-[0.16em] ${
                        isActive
                          ? 'border-oro-500 text-stone-900 dark:border-oro-300 dark:text-stone-50'
                          : 'border-transparent text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-50'
                      }`
                    }
                  >
                    {texto}
                    {to === '/favoritos' && favoritos.length > 0 && ` (${favoritos.length})`}
                  </NavLink>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={abrirCarrito}
              aria-label="Abrir carrito de compras"
              className="relative flex min-h-11 items-center gap-2 px-1.5 text-xs font-medium uppercase tracking-[0.16em] text-stone-600 transition-colors hover:text-stone-900 sm:min-h-9 sm:px-3 dark:text-stone-300 dark:hover:text-stone-50"
            >
              <IconoBolsa className="size-5" />
              <span className="hidden sm:inline">Carrito</span>
              {cantidadTotal > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-stone-900 px-1 text-[11px] font-medium tracking-normal text-marfil dark:bg-oro-300 dark:text-stone-950">
                  {cantidadTotal}
                </span>
              )}
            </button>
            <button
              type="button"
              onClick={alternarTema}
              aria-label={tema === 'oscuro' ? 'Usar tema claro' : 'Usar tema oscuro'}
              className="flex min-h-11 items-center gap-2 px-1.5 text-xs font-medium uppercase tracking-[0.16em] text-stone-600 transition-colors hover:text-stone-900 sm:min-h-9 sm:px-3 dark:text-stone-300 dark:hover:text-stone-50"
            >
              {tema === 'oscuro' ? <IconoSol className="size-5" /> : <IconoLuna className="size-5" />}
              <span className="hidden sm:inline"> {tema === 'oscuro' ? 'Claro' : 'Oscuro'}</span>
            </button>
          </div>
        </nav>
      </header>
      <CarritoDrawer />
    </>
  )
}

export default Navbar
