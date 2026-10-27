const API_URL = import.meta.env.VITE_API_URL

async function request(path) {
  const response = await fetch(`${API_URL}${path}`)
  if (!response.ok) {
    // FastAPI sends errors as { "detail": "..." }
    const body = await response.json().catch(() => ({}))
    throw new Error(body.detail ?? `Error ${response.status}`)
  }
  return response.json()
}

export function getProducto(id) {
  return request(`/productos/${id}`)
}
