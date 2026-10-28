// Label + input + error message, shared by the form fields.
function Campo({ etiqueta, nombre, error, children }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={nombre} className="text-[11px] font-medium uppercase tracking-[0.2em] text-stone-500 dark:text-stone-400">
        {etiqueta}
      </label>
      {children}
      {error && (
        <p id={`${nombre}-error`} className="text-sm text-red-700 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  )
}

export const claseInput =
  'min-h-11 border border-stone-300 bg-white px-3 py-2 text-stone-900 transition-colors placeholder:text-stone-400 hover:border-stone-400 focus:border-oro-500 focus:outline-none focus:ring-1 focus:ring-oro-500 aria-invalid:border-red-500 dark:border-stone-700 dark:bg-noche dark:text-stone-100 dark:placeholder:text-stone-600 dark:hover:border-stone-500 dark:focus:border-oro-300 dark:focus:ring-oro-300 dark:aria-invalid:border-red-400'

export default Campo
