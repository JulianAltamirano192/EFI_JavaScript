import { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'
import CarritoDrawer from './CarritoDrawer.jsx'
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
      <header className="border-b border-stone-200 bg-white dark:border-stone-800 dark:bg-stone-900">
        <nav className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-4 py-4">
          <Link to="/" className="font-display text-2xl font-bold tracking-tight">
            Joyería y Relojería
          </Link>
          {/* Wraps on narrow screens instead of pushing the page wider than the viewport. */}
          <div className="flex flex-wrap items-center gap-1 sm:gap-2">
            <ul className="flex gap-1">
              {enlaces.map(({ to, texto }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    className={({ isActive }) =>
                      `block rounded-md px-2.5 py-2 text-sm font-medium sm:px-3 ${
                        isActive
                          ? 'bg-amber-100 text-amber-900 dark:bg-amber-900/40 dark:text-amber-200'
                          : 'text-stone-600 hover:bg-stone-100 dark:text-stone-300 dark:hover:bg-stone-800'
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
              className="relative flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium text-stone-600 hover:bg-stone-100 dark:text-stone-300 dark:hover:bg-stone-800"
            >
              <span>🛒</span>
              <span className="hidden sm:inline">Carrito</span>
              {cantidadTotal > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-amber-700 px-1 text-xs font-bold text-white">
                  {cantidadTotal}
                </span>
              )}
            </button>
            <button
              type="button"
              onClick={alternarTema}
              aria-label={tema === 'oscuro' ? 'Usar tema claro' : 'Usar tema oscuro'}
              className="rounded-md px-3 py-2 text-sm text-stone-600 hover:bg-stone-100 dark:text-stone-300 dark:hover:bg-stone-800"
            >
              {tema === 'oscuro' ? '☀' : '☾'}
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
