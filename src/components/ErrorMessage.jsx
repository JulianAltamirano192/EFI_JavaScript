function ErrorMessage({ mensaje }) {
  return (
    <p role="alert" className="border-l-2 border-red-700 bg-red-50/70 px-4 py-3 text-sm text-red-800 dark:border-red-400 dark:bg-red-950/30 dark:text-red-300">
      {mensaje}
    </p>
  )
}

export default ErrorMessage
