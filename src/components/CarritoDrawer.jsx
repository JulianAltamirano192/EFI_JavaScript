import { useCallback, useContext, useEffect, useState } from 'react'
import { CarritoContext } from '../context/CarritoContext.js'
import { formatearPrecio } from '../utils/precio.js'

function CarritoDrawer() {
  const {
    items,
    abierto,
    cerrarCarrito,
    quitarDelCarrito,
    actualizarCantidad,
    vaciarCarrito,
    total,
    cantidadTotal,
  } = useContext(CarritoContext)

  const [comprado, setComprado] = useState(false)

  const handleCerrar = useCallback(() => {
    setComprado(false)
    cerrarCarrito()
  }, [cerrarCarrito])

  // Close when pressing Escape key
  useEffect(() => {
    if (!abierto) return

    function alPresionarTecla(event) {
      if (event.key === 'Escape') handleCerrar()
    }

    window.addEventListener('keydown', alPresionarTecla)
    return () => window.removeEventListener('keydown', alPresionarTecla)
  }, [abierto, handleCerrar])

  if (!abierto) return null

  function finalizarCompra() {
    setComprado(true)
    vaciarCarrito()
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-stone-950/50 backdrop-blur-xs transition-opacity"
        onClick={handleCerrar}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Carrito de compras"
        className="relative z-10 flex h-full w-full max-w-md flex-col bg-white dark:bg-stone-900 border-l border-stone-200 dark:border-stone-800 shadow-xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 px-6 py-4">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold">Carrito de compras</h2>
            {cantidadTotal > 0 && (
              <span className="rounded-full bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-200 px-2 py-0.5 text-xs font-semibold">
                {cantidadTotal} {cantidadTotal === 1 ? 'ítem' : 'ítems'}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={handleCerrar}
            className="rounded-md p-1.5 text-stone-500 hover:bg-stone-100 hover:text-stone-800 dark:text-stone-400 dark:hover:bg-stone-800 dark:hover:text-stone-200"
            aria-label="Cerrar carrito"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {comprado ? (
            <div className="flex h-full flex-col items-center justify-center text-center space-y-4">
              <span className="text-4xl" role="img" aria-label="Éxito">
                🎉
              </span>
              <h3 className="text-xl font-semibold text-amber-800 dark:text-amber-300">
                ¡Compra simulada con éxito!
              </h3>
              <p className="text-sm text-stone-600 dark:text-stone-300">
                Compra simulada: no se registra en la API ni descuenta stock.
              </p>
              <button
                type="button"
                onClick={handleCerrar}
                className="mt-2 rounded-md bg-amber-700 px-4 py-2 text-sm font-medium text-white hover:bg-amber-800"
              >
                Cerrar
              </button>
            </div>
          ) : items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center space-y-3">
              <span className="text-4xl" role="img" aria-label="Carrito vacío">
                🛒
              </span>
              <p className="text-stone-500 dark:text-stone-400 font-medium">
                Tu carrito está vacío.
              </p>
              <p className="text-xs text-stone-400 dark:text-stone-500">
                Explorá el catálogo y agregá las joyas que más te gusten.
              </p>
              <button
                type="button"
                onClick={handleCerrar}
                className="rounded-md border border-stone-300 dark:border-stone-700 px-4 py-2 text-sm font-medium hover:bg-stone-100 dark:hover:bg-stone-800"
              >
                Volver a la tienda
              </button>
            </div>
          ) : (
            <ul className="divide-y divide-stone-200 dark:divide-stone-800">
              {items.map((item) => (
                <li key={item.id} className="flex gap-4 py-4">
                  {item.imagen ? (
                    <img
                      src={item.imagen}
                      alt={item.nombre}
                      className="h-20 w-20 shrink-0 rounded-md object-cover border border-stone-200 dark:border-stone-800"
                    />
                  ) : (
                    <div className="h-20 w-20 shrink-0 rounded-md bg-stone-100 dark:bg-stone-800" />
                  )}
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      {item.marca && (
                        <p className="text-xs uppercase tracking-wide text-stone-400 dark:text-stone-500">
                          {item.marca}
                        </p>
                      )}
                      <p className="text-sm font-medium">{item.nombre}</p>
                      <p className="text-sm font-semibold text-amber-900 dark:text-amber-300">
                        {formatearPrecio(item.precio)}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center rounded-md border border-stone-300 dark:border-stone-700">
                        <button
                          type="button"
                          onClick={() => actualizarCantidad(item.id, item.cantidad - 1)}
                          className="px-2.5 py-0.5 text-sm font-bold text-stone-600 hover:bg-stone-100 dark:text-stone-300 dark:hover:bg-stone-800"
                          aria-label={`Restar una unidad de ${item.nombre}`}
                        >
                          -
                        </button>
                        <span className="px-2 text-xs font-semibold">{item.cantidad}</span>
                        <button
                          type="button"
                          onClick={() => actualizarCantidad(item.id, item.cantidad + 1)}
                          disabled={typeof item.stock === 'number' && item.cantidad >= item.stock}
                          className="px-2.5 py-0.5 text-sm font-bold text-stone-600 hover:bg-stone-100 dark:text-stone-300 dark:hover:bg-stone-800 disabled:opacity-40"
                          aria-label={`Sumar una unidad de ${item.nombre}`}
                        >
                          +
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => quitarDelCarrito(item.id)}
                        className="text-xs text-red-600 hover:underline dark:text-red-400"
                      >
                        Quitar
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && !comprado && (
          <div className="border-t border-stone-200 dark:border-stone-800 p-6 space-y-4">
            <div className="flex items-center justify-between text-base font-semibold">
              <span>Total estimado</span>
              <span className="text-xl text-amber-900 dark:text-amber-300">
                {formatearPrecio(total)}
              </span>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={vaciarCarrito}
                className="w-1/3 rounded-md border border-stone-300 dark:border-stone-700 px-3 py-2 text-sm font-medium hover:bg-stone-100 dark:hover:bg-stone-800"
              >
                Vaciar
              </button>
              <button
                type="button"
                onClick={finalizarCompra}
                className="w-2/3 rounded-md bg-amber-700 px-4 py-2 text-sm font-medium text-white hover:bg-amber-800"
              >
                Finalizar compra
              </button>
            </div>
          </div>
        )}
      </aside>
    </div>
  )
}

export default CarritoDrawer
