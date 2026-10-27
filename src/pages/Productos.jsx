import { Link, Outlet } from 'react-router-dom'

function Productos() {
  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold">Productos</h1>
        <Link
          to="nuevo"
          className="rounded-md bg-amber-700 px-4 py-2 text-sm font-medium text-white hover:bg-amber-800"
        >
          Nuevo producto
        </Link>
      </div>
      {/* Child routes such as /productos/nuevo render here */}
      <Outlet />
      <p className="text-stone-500">Listado de productos.</p>
    </section>
  )
}

export default Productos
