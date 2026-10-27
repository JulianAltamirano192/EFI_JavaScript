import { useEffect, useState } from 'react'
import { TemaContext } from './TemaContext.js'

const CLAVE = 'tema'

// Saved choice first; otherwise follow the operating system setting.
// index.html repeats this rule in an inline script so the first paint already has the right theme.
function temaInicial() {
  try {
    const guardado = localStorage.getItem(CLAVE)
    if (guardado === 'claro' || guardado === 'oscuro') return guardado
  } catch {
    // Storage blocked: fall through to the system setting.
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'oscuro' : 'claro'
}

function TemaProvider({ children }) {
  const [tema, setTema] = useState(temaInicial)

  // Tailwind's dark: classes apply while <html> has the "dark" class.
  useEffect(() => {
    const html = document.documentElement
    html.classList.toggle('dark', tema === 'oscuro')
    html.style.colorScheme = tema === 'oscuro' ? 'dark' : 'light'
    try {
      localStorage.setItem(CLAVE, tema)
    } catch {
      // Not saved; the theme still applies for this visit.
    }
  }, [tema])

  function alternarTema() {
    setTema((actual) => (actual === 'oscuro' ? 'claro' : 'oscuro'))
  }

  return <TemaContext.Provider value={{ tema, alternarTema }}>{children}</TemaContext.Provider>
}

export default TemaProvider
