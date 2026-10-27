// Label + input + error message, shared by the form fields.
function Campo({ etiqueta, nombre, error, children }) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={nombre} className="text-sm font-medium">
        {etiqueta}
      </label>
      {children}
      {error && (
        <p id={`${nombre}-error`} className="text-sm text-red-700">
          {error}
        </p>
      )}
    </div>
  )
}

export const claseInput =
  'rounded-md border border-stone-300 bg-white px-3 py-2 aria-invalid:border-red-500'

export default Campo
