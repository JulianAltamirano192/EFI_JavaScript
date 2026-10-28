function Loader({ texto = 'Cargando...' }) {
  return (
    <p role="status" className="flex items-center gap-3 py-10 font-display text-xl italic text-stone-500 dark:text-stone-400">
      <span className="size-5 animate-spin rounded-full border border-stone-300 border-t-oro-500 dark:border-stone-700 dark:border-t-oro-300" />
      {texto}
    </p>
  )
}

export default Loader
