import { createContext } from 'react'

// Shared by the whole app: { tema: 'claro' | 'oscuro', alternarTema }
export const TemaContext = createContext(null)
