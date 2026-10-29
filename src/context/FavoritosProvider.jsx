import { useEffect, useState } from 'react'
import { FavoritosContext } from './FavoritosContext.js'

const CLAVE = 'favoritos'

// localStorage can be blocked (private mode, disabled storage); then favorites last until reload.
function leerGuardados() {
  try {
    return JSON.parse(localStorage.getItem(CLAVE)) ?? []
  } catch {
    return []
  }
}

function FavoritosProvider({ children }) {
  const [favoritos, setFavoritos] = useState(leerGuardados)

  useEffect(() => {
    try {
      localStorage.setItem(CLAVE, JSON.stringify(favoritos))
    } catch {
      // Not saved; the list still works for this visit.
    }
  }, [favoritos])

  const esFavorito = (id) => favoritos.some((favorito) => favorito.id === id)

  function quitarFavorito(id) {
    setFavoritos((actuales) => actuales.filter((favorito) => favorito.id !== id))
  }

  // Only the fields the card needs are stored, so the Favoritos page works without calling the API.
  // stock is kept so the card can still cap the cart quantity and show "Sin stock".
  function alternarFavorito({ id, nombre, precio, imagen, marca, stock }) {
    if (esFavorito(id)) quitarFavorito(id)
    else setFavoritos((actuales) => [...actuales, { id, nombre, precio, imagen, marca, stock }])
  }

  return (
    <FavoritosContext.Provider value={{ favoritos, esFavorito, alternarFavorito, quitarFavorito }}>
      {children}
    </FavoritosContext.Provider>
  )
}

export default FavoritosProvider
