import { createContext } from 'react'

// Shared by the whole app: { favoritos, esFavorito, alternarFavorito, quitarFavorito }
export const FavoritosContext = createContext(null)
