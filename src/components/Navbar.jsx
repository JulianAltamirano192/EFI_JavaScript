import { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'
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

  return (
    <header className="border-b border-stone-200 bg-white dark:border-stone-800 dark:bg-stone-900">
      <nav className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-4 py-4">
        <Link to="/" className="text-lg font-semibold tracking-tight">
          Joyería y Relojería
        </Link>
        <div className="flex items-center gap-2">
          <ul className="flex gap-1">
            {enlaces.map(({ to, texto }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    `rounded-md px-3 py-2 text-sm font-medium ${
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
            onClick={alternarTema}
            aria-label={tema === 'oscuro' ? 'Usar tema claro' : 'Usar tema oscuro'}
            className="rounded-md px-3 py-2 text-sm text-stone-600 hover:bg-stone-100 dark:text-stone-300 dark:hover:bg-stone-800"
          >
            {tema === 'oscuro' ? '☀ Claro' : '☾ Oscuro'}
          </button>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
