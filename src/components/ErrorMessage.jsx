function ErrorMessage({ mensaje }) {
  return (
    <p role="alert" className="rounded-md border border-red-200 bg-red-50 p-4 text-red-700">
      {mensaje}
    </p>
  )
}

export default ErrorMessage
