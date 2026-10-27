const API_URL = import.meta.env.VITE_API_URL

// FastAPI sends { "detail": "..." }, or a list of field errors for a 422.
function mensajeDeError(body, status) {
  if (Array.isArray(body.detail)) return body.detail.map((e) => e.msg).join('. ')
  return body.detail ?? `Error ${status}`
}

async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...options.headers },
  })
  if (!response.ok) {
    const body = await response.json().catch(() => ({}))
    throw new Error(mensajeDeError(body, response.status))
  }
  // DELETE answers 204 with no body.
  if (response.status === 204) return null
  return response.json()
}

// Builds "?page=1&size=9&marca_id=2", skipping empty filters.
function query(params) {
  const definidos = Object.entries(params).filter(([, valor]) => valor !== '' && valor != null)
  return `?${new URLSearchParams(definidos)}`
}

export function getProductos(params) {
  return request(`/productos${query(params)}`)
}

export function getProducto(id) {
  return request(`/productos/${id}`)
}

export function createProducto(producto) {
  return request('/productos', { method: 'POST', body: JSON.stringify(producto) })
}

export function deleteProducto(id) {
  return request(`/productos/${id}`, { method: 'DELETE' })
}

// 100 is the largest page the API allows; enough to fill the selects.
export function getMarcas() {
  return request('/marcas?size=100')
}

export function getCategorias() {
  return request('/categorias?size=100')
}
