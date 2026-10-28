import { useEffect, useState } from 'react'
import { CarritoContext } from './CarritoContext.js'

const CLAVE = 'carrito'

function leerGuardados() {
  try {
    return JSON.parse(localStorage.getItem(CLAVE)) ?? []
  } catch {
    return []
  }
}

function CarritoProvider({ children }) {
  const [items, setItems] = useState(leerGuardados)
  const [abierto, setAbierto] = useState(false)

  useEffect(() => {
    try {
      localStorage.setItem(CLAVE, JSON.stringify(items))
    } catch {
      // Storage blocked; items will persist in memory for the session.
    }
  }, [items])

  function abrirCarrito() {
    setAbierto(true)
  }

  function cerrarCarrito() {
    setAbierto(false)
  }

  function agregarAlCarrito(producto, cantidad = 1) {
    setItems((actuales) => {
      const existente = actuales.find((item) => item.id === producto.id)
      const stockMaximo = typeof producto.stock === 'number' && producto.stock > 0 ? producto.stock : Infinity

      if (existente) {
        const nuevaCantidad = Math.min(existente.cantidad + cantidad, stockMaximo)
        return actuales.map((item) =>
          item.id === producto.id ? { ...item, cantidad: nuevaCantidad } : item,
        )
      }

      const cantidadValida = Math.min(cantidad, stockMaximo)
      return [
        ...actuales,
        {
          id: producto.id,
          nombre: producto.nombre,
          precio: producto.precio,
          imagen: producto.imagen,
          marca: producto.marca,
          stock: producto.stock,
          cantidad: Math.max(1, cantidadValida),
        },
      ]
    })
  }

  function quitarDelCarrito(id) {
    setItems((actuales) => actuales.filter((item) => item.id !== id))
  }

  function actualizarCantidad(id, nuevaCantidad) {
    if (nuevaCantidad <= 0) {
      quitarDelCarrito(id)
      return
    }
    setItems((actuales) =>
      actuales.map((item) => {
        if (item.id !== id) return item
        const maximo = typeof item.stock === 'number' && item.stock > 0 ? item.stock : Infinity
        return { ...item, cantidad: Math.min(nuevaCantidad, maximo) }
      }),
    )
  }

  function vaciarCarrito() {
    setItems([])
  }

  const cantidadTotal = items.reduce((total, item) => total + item.cantidad, 0)
  const total = items.reduce((sum, item) => sum + (Number(item.precio) || 0) * item.cantidad, 0)

  return (
    <CarritoContext.Provider
      value={{
        items,
        abierto,
        abrirCarrito,
        cerrarCarrito,
        agregarAlCarrito,
        quitarDelCarrito,
        actualizarCantidad,
        vaciarCarrito,
        cantidadTotal,
        total,
      }}
    >
      {children}
    </CarritoContext.Provider>
  )
}

export default CarritoProvider
