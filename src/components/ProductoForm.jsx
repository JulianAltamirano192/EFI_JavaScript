import { useState } from 'react'
import { Link } from 'react-router-dom'
import Campo, { claseInput } from './Campo.jsx'
import ErrorMessage from './ErrorMessage.jsx'

const VACIO = {
  nombre: '',
  descripcion: '',
  material: '',
  precio: '',
  stock: '0',
  imagen: '',
  marca_id: '',
  categoria_id: '',
}

// Same limits as the API models, so most errors are caught before sending.
function validar(datos) {
  const errores = {}
  const nombre = datos.nombre.trim()
  const material = datos.material.trim()
  const imagen = datos.imagen.trim()

  if (!nombre) errores.nombre = 'El nombre es obligatorio.'
  else if (nombre.length > 150) errores.nombre = 'Máximo 150 caracteres.'

  if (!material) errores.material = 'El material es obligatorio.'
  else if (material.length > 60) errores.material = 'Máximo 60 caracteres.'

  if (datos.descripcion.length > 1000) errores.descripcion = 'Máximo 1000 caracteres.'

  // Up to 8 digits and 2 decimals, the precision the API stores.
  if (!datos.precio) errores.precio = 'El precio es obligatorio.'
  else if (!/^\d{1,8}(\.\d{1,2})?$/.test(datos.precio)) {
    errores.precio = 'Usá un número con hasta 2 decimales, por ejemplo 1500.50.'
  } else if (Number(datos.precio) <= 0) errores.precio = 'El precio tiene que ser mayor a 0.'

  if (!/^\d+$/.test(datos.stock)) errores.stock = 'El stock es un número entero, 0 o más.'

  if (imagen) {
    if (!/^https?:\/\/\S+\.\S+/.test(imagen)) errores.imagen = 'Tiene que ser una URL que empiece con http:// o https://.'
    else if (imagen.length > 500) errores.imagen = 'Máximo 500 caracteres.'
  }

  if (!datos.marca_id) errores.marca_id = 'Elegí una marca.'
  if (!datos.categoria_id) errores.categoria_id = 'Elegí una categoría.'

  return errores
}

// Controlled product form: validates the fields and hands the clean product to onGuardar.
// The page decides what saving means (API call, reload, navigation).
function ProductoForm({ titulo, marcas, categorias, onGuardar }) {
  const [datos, setDatos] = useState(VACIO)
  const [errores, setErrores] = useState({})
  const [enviando, setEnviando] = useState(false)
  const [errorApi, setErrorApi] = useState(null)

  function cambiar(event) {
    const { name, value } = event.target
    setDatos({ ...datos, [name]: value })
    // The error of a field disappears as soon as the user edits it.
    if (errores[name]) setErrores({ ...errores, [name]: undefined })
  }

  async function enviar(event) {
    event.preventDefault()
    const nuevosErrores = validar(datos)
    setErrores(nuevosErrores)
    if (Object.keys(nuevosErrores).length > 0) return

    setEnviando(true)
    setErrorApi(null)
    try {
      await onGuardar({
        nombre: datos.nombre.trim(),
        descripcion: datos.descripcion.trim() || null,
        material: datos.material.trim(),
        precio: datos.precio,
        stock: Number(datos.stock),
        imagen: datos.imagen.trim() || null,
        marca_id: Number(datos.marca_id),
        categoria_id: Number(datos.categoria_id),
      })
    } catch (err) {
      setErrorApi(err.message)
      setEnviando(false)
    }
  }

  // Props shared by every input: value, onChange and the accessibility links to its error.
  const props = (nombre) => ({
    id: nombre,
    name: nombre,
    value: datos[nombre],
    onChange: cambiar,
    'aria-invalid': Boolean(errores[nombre]),
    'aria-describedby': errores[nombre] ? `${nombre}-error` : undefined,
    className: claseInput,
  })

  return (
    <form
      onSubmit={enviar}
      noValidate
      className="space-y-4 rounded-lg border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 p-6"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{titulo}</h2>
        <Link to="/productos" className="text-sm text-stone-500 dark:text-stone-400 hover:underline">
          Cerrar
        </Link>
      </div>

      {errorApi && <ErrorMessage mensaje={errorApi} />}

      <div className="grid gap-4 sm:grid-cols-2">
        <Campo etiqueta="Nombre" nombre="nombre" error={errores.nombre}>
          <input {...props('nombre')} maxLength={150} />
        </Campo>
        <Campo etiqueta="Material" nombre="material" error={errores.material}>
          <input {...props('material')} maxLength={60} placeholder="Oro, plata 925, acero..." />
        </Campo>
        <Campo etiqueta="Precio (USD)" nombre="precio" error={errores.precio}>
          <input {...props('precio')} inputMode="decimal" placeholder="1500.50" />
        </Campo>
        <Campo etiqueta="Stock" nombre="stock" error={errores.stock}>
          <input {...props('stock')} inputMode="numeric" />
        </Campo>
        <Campo etiqueta="Marca" nombre="marca_id" error={errores.marca_id}>
          <select {...props('marca_id')}>
            <option value="">Elegí una marca</option>
            {marcas.map((marca) => (
              <option key={marca.id} value={marca.id}>
                {marca.nombre}
              </option>
            ))}
          </select>
        </Campo>
        <Campo etiqueta="Categoría" nombre="categoria_id" error={errores.categoria_id}>
          <select {...props('categoria_id')}>
            <option value="">Elegí una categoría</option>
            {categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.nombre}
              </option>
            ))}
          </select>
        </Campo>
      </div>
      <Campo etiqueta="URL de la imagen (opcional)" nombre="imagen" error={errores.imagen}>
        <input {...props('imagen')} type="url" placeholder="https://..." />
      </Campo>
      <Campo etiqueta="Descripción (opcional)" nombre="descripcion" error={errores.descripcion}>
        <textarea {...props('descripcion')} rows={3} maxLength={1000} />
      </Campo>

      <button
        type="submit"
        disabled={enviando}
        className="rounded-md bg-amber-700 px-4 py-2 font-medium text-white hover:bg-amber-800 disabled:opacity-60"
      >
        {enviando ? 'Guardando...' : 'Guardar producto'}
      </button>
    </form>
  )
}

export default ProductoForm
