function ErrorMessage({ mensaje }) {
  return (
    <p role="alert" className="rounded-md border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/40 p-4 text-red-700 dark:text-red-400">
      {mensaje}
    </p>
  )
}

export default ErrorMessage
