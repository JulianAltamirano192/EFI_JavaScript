import { Link, NavLink } from 'react-router-dom'

const enlaces = [
  { to: '/productos', texto: 'Productos' },
  { to: '/marcas', texto: 'Marcas' },
  { to: '/favoritos', texto: 'Favoritos' },
]

function Navbar() {
  return (
    <header className="border-b border-stone-200 bg-white">
      <nav className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-4 py-4">
        <Link to="/" className="text-lg font-semibold tracking-tight">
          Joyería y Relojería
        </Link>
        <ul className="flex gap-1">
          {enlaces.map(({ to, texto }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `rounded-md px-3 py-2 text-sm font-medium ${
                    isActive ? 'bg-amber-100 text-amber-900' : 'text-stone-600 hover:bg-stone-100'
                  }`
                }
              >
                {texto}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

export default Navbar
