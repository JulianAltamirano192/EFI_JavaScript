const formato = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'USD' })

// The API sends precio as a string ("10500.00") to keep the decimals exact.
export function formatearPrecio(precio) {
  return formato.format(Number(precio))
}
