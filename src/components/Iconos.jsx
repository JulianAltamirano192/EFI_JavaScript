// Inline SVG icons that replace the emojis. Only markup: the accessible name stays on the button.
function Icono({ className = 'size-5', children }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {children}
    </svg>
  )
}

export function IconoBolsa({ className }) {
  return (
    <Icono className={className}>
      <path d="M5 8h14l-1 12H6L5 8Z" />
      <path d="M9 10V6a3 3 0 0 1 6 0v4" />
    </Icono>
  )
}

export function IconoSol({ className }) {
  return (
    <Icono className={className}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </Icono>
  )
}

export function IconoLuna({ className }) {
  return (
    <Icono className={className}>
      <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" />
    </Icono>
  )
}

export function IconoCorazon({ className }) {
  return (
    <Icono className={className}>
      <path d="M12 20s-7-4.35-7-10a4 4 0 0 1 7-2.65A4 4 0 0 1 19 10c0 5.65-7 10-7 10Z" />
    </Icono>
  )
}

export function IconoCorazonLleno({ className }) {
  return (
    <Icono className={className}>
      <path d="M12 20s-7-4.35-7-10a4 4 0 0 1 7-2.65A4 4 0 0 1 19 10c0 5.65-7 10-7 10Z" fill="currentColor" />
    </Icono>
  )
}

export function IconoCerrar({ className }) {
  return (
    <Icono className={className}>
      <path d="M6 6l12 12M18 6 6 18" />
    </Icono>
  )
}

export function IconoExito({ className }) {
  return (
    <Icono className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="m8 12.5 2.5 2.5L16 9.5" />
    </Icono>
  )
}

export function IconoCheck({ className }) {
  return (
    <Icono className={className}>
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </Icono>
  )
}

export function IconoFlechaIzquierda({ className }) {
  return (
    <Icono className={className}>
      <path d="M19 12H5M11 6l-6 6 6 6" />
    </Icono>
  )
}

export function IconoMas({ className }) {
  return (
    <Icono className={className}>
      <path d="M12 5v14M5 12h14" />
    </Icono>
  )
}

export function IconoMenos({ className }) {
  return (
    <Icono className={className}>
      <path d="M5 12h14" />
    </Icono>
  )
}

export function IconoChevron({ className }) {
  return (
    <Icono className={className}>
      <path d="m6 9 6 6 6-6" />
    </Icono>
  )
}

// Decorative watch dial for the home page: 60 minute marks, longer ones at the hours.
const marcas = Array.from({ length: 60 }, (_, i) => i)

export function Esfera({ className }) {
  return (
    <svg viewBox="0 0 200 200" fill="none" stroke="currentColor" aria-hidden="true" className={className}>
      <circle cx="100" cy="100" r="96" strokeWidth="0.75" />
      <circle cx="100" cy="100" r="88" strokeWidth="0.5" />
      <circle cx="100" cy="100" r="62" strokeWidth="0.5" strokeDasharray="1 3" />
      {marcas.map((i) => (
        <line
          key={i}
          x1="100"
          y1="14"
          x2="100"
          y2={i % 5 === 0 ? 26 : 18}
          strokeWidth={i % 5 === 0 ? 1.25 : 0.5}
          transform={`rotate(${i * 6} 100 100)`}
        />
      ))}
      <line x1="100" y1="100" x2="100" y2="44" strokeWidth="1.5" strokeLinecap="round" transform="rotate(305 100 100)" />
      <line x1="100" y1="100" x2="100" y2="28" strokeWidth="1" strokeLinecap="round" transform="rotate(60 100 100)" />
      <circle cx="100" cy="100" r="3" fill="currentColor" stroke="none" />
    </svg>
  )
}
