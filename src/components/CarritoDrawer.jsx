import { useCallback, useContext, useEffect, useState } from 'react'
import { CarritoContext } from '../context/CarritoContext.js'
import { formatearPrecio } from '../utils/precio.js'
import { IconoBolsa, IconoCerrar, IconoExito, IconoMas, IconoMenos } from './Iconos.jsx'

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
        className="fixed inset-0 bg-stone-950/40 backdrop-blur-[2px] transition-opacity dark:bg-black/60"
        onClick={handleCerrar}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Carrito de compras"
        className="relative z-10 flex h-full w-full max-w-md flex-col border-stone-200 bg-marfil sm:border-l shadow-2xl shadow-stone-900/20 dark:border-stone-800 dark:bg-noche-claro dark:shadow-black/50"
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-4 border-b border-stone-200 px-5 py-4 sm:px-8 sm:py-6 dark:border-stone-800">
          <div className="flex items-baseline gap-3">
            <h2 className="text-3xl font-medium text-stone-900 dark:text-stone-50">Carrito de compras</h2>
            {cantidadTotal > 0 && (
              <span className="whitespace-nowrap text-[11px] font-medium uppercase tracking-[0.2em] text-oro-700 dark:text-oro-300">
                {cantidadTotal} {cantidadTotal === 1 ? 'ítem' : 'ítems'}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={handleCerrar}
            className="-mr-2 flex size-11 shrink-0 items-center justify-center text-stone-500 transition-colors hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-50"
            aria-label="Cerrar carrito"
          >
            <IconoCerrar className="size-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-5 py-2 sm:px-8">
          {comprado ? (
            <div className="flex h-full flex-col items-center justify-center space-y-4 py-10 text-center">
              <span className="text-oro-600 dark:text-oro-300" role="img" aria-label="Éxito">
                <IconoExito className="size-14" />
              </span>
              <h3 className="font-display text-3xl text-stone-900 dark:text-stone-50">
                ¡Compra simulada con éxito!
              </h3>
              <p className="max-w-xs text-sm font-light leading-relaxed text-stone-600 dark:text-stone-300">
                Compra simulada: no se registra en la API ni descuenta stock.
              </p>
              <button
                type="button"
                onClick={handleCerrar}
                className="inline-flex min-h-12 items-center justify-center bg-stone-900 px-6 text-xs font-medium uppercase tracking-[0.2em] text-marfil transition-colors hover:bg-oro-700 dark:bg-oro-300 dark:text-stone-950 dark:hover:bg-oro-200 mt-4"
              >
                Cerrar
              </button>
            </div>
          ) : items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center space-y-3 py-10 text-center">
              <span className="text-stone-400 dark:text-stone-500" role="img" aria-label="Carrito vacío">
                <IconoBolsa className="size-14" />
              </span>
              <p className="pt-2 font-display text-2xl italic text-stone-700 dark:text-stone-300">
                Tu carrito está vacío.
              </p>
              <p className="max-w-xs text-sm font-light text-stone-500 dark:text-stone-400">
                Explorá el catálogo y agregá las joyas que más te gusten.
              </p>
              <button
                type="button"
                onClick={handleCerrar}
                className="inline-flex min-h-12 items-center justify-center border border-stone-300 px-6 text-xs font-medium uppercase tracking-[0.2em] text-stone-800 transition-colors hover:border-stone-900 dark:border-stone-700 dark:text-stone-200 dark:hover:border-oro-300 mt-3"
              >
                Volver a la tienda
              </button>
            </div>
          ) : (
            <ul className="divide-y divide-stone-200 dark:divide-stone-800">
              {items.map((item) => (
                <li key={item.id} className="flex gap-4 py-5">
                  {item.imagen ? (
                    <img
                      src={item.imagen}
                      alt={item.nombre}
                      className="h-28 w-22 shrink-0 bg-stone-100 object-cover saturate-[.85] dark:bg-noche dark:brightness-90"
                    />
                  ) : (
                    <div className="h-28 w-22 shrink-0 bg-linear-to-br from-stone-100 to-oro-100/60 dark:from-noche dark:to-oro-950/40" />
                  )}
                  <div className="flex min-w-0 flex-1 flex-col justify-between">
                    <div>
                      {item.marca && (
                        <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-oro-700 dark:text-oro-300">
                          {item.marca}
                        </p>
                      )}
                      <p className="font-display text-lg leading-snug text-stone-900 dark:text-stone-50">{item.nombre}</p>
                      <p className="text-sm tracking-wide text-stone-600 dark:text-stone-300">
                        {formatearPrecio(item.precio)}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center border border-stone-300 dark:border-stone-700">
                        <button
                          type="button"
                          onClick={() => actualizarCantidad(item.id, item.cantidad - 1)}
                          className="flex size-11 items-center justify-center text-stone-600 transition-colors hover:bg-stone-100 sm:size-8 dark:text-stone-300 dark:hover:bg-stone-800"
                          aria-label={`Restar una unidad de ${item.nombre}`}
                        >
                          <IconoMenos className="size-3.5" />
                        </button>
                        <span className="min-w-7 text-center text-sm tabular-nums">{item.cantidad}</span>
                        <button
                          type="button"
                          onClick={() => actualizarCantidad(item.id, item.cantidad + 1)}
                          disabled={typeof item.stock === 'number' && item.cantidad >= item.stock}
                          className="flex size-11 items-center justify-center text-stone-600 transition-colors hover:bg-stone-100 sm:size-8 dark:text-stone-300 dark:hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent"
                          aria-label={`Sumar una unidad de ${item.nombre}`}
                        >
                          <IconoMas className="size-3.5" />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => quitarDelCarrito(item.id)}
                        className="min-h-11 text-[11px] uppercase tracking-[0.18em] text-stone-400 underline-offset-4 transition-colors hover:text-red-700 hover:underline sm:min-h-0 dark:text-stone-500 dark:hover:text-red-400"
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
          <div className="space-y-5 border-t border-stone-200 px-5 py-5 sm:px-8 sm:py-6 dark:border-stone-800">
            <div className="flex items-baseline justify-between gap-4">
              <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-stone-500 dark:text-stone-400">Total estimado</span>
              <span className="font-display text-3xl text-stone-900 dark:text-oro-200">
                {formatearPrecio(total)}
              </span>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={vaciarCarrito}
                className="inline-flex min-h-12 items-center justify-center border border-stone-300 text-xs font-medium uppercase tracking-[0.2em] text-stone-800 transition-colors hover:border-stone-900 dark:border-stone-700 dark:text-stone-200 dark:hover:border-oro-300 w-1/3 px-3"
              >
                Vaciar
              </button>
              <button
                type="button"
                onClick={finalizarCompra}
                className="inline-flex min-h-12 items-center justify-center bg-stone-900 text-xs font-medium uppercase tracking-[0.2em] text-marfil transition-colors hover:bg-oro-700 dark:bg-oro-300 dark:text-stone-950 dark:hover:bg-oro-200 w-2/3 px-4"
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
