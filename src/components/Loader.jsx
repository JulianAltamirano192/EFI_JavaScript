function Loader({ texto = 'Cargando...' }) {
  return (
    <p role="status" className="flex items-center gap-3 text-stone-500">
      <span className="size-4 animate-spin rounded-full border-2 border-stone-300 border-t-amber-700" />
      {texto}
    </p>
  )
}

export default Loader
