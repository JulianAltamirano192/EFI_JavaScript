# EFI JavaScript - Joyería y Relojería

Aplicación en React que consume la API de joyería y relojería del EFI de Python.

## En producción

- App: https://efi-javascript.vercel.app
- API: `https://efi-joyeria.duckdns.org` (documentación interactiva en https://efi-joyeria.duckdns.org/docs)

## Cómo correrlo

1. Levantar la API del EFI de Python (queda en `http://localhost:8000`).
2. Crear un archivo `.env` en la raíz con la URL de la API:

   ```
   VITE_API_URL=http://localhost:8000
   ```

3. Instalar y arrancar:

   ```bash
   npm install
   npm run dev
   ```

La app queda en `http://localhost:5173`.

## Tecnologías y Funcionalidades

- **React con Vite y Tailwind CSS**
- **Enrutamiento (React Router):** Rutas base (`/`, `/productos`, `/marcas`, `/favoritos`), ruta dinámica (`/productos/:id`) y ruta anidada (`/productos/nuevo`).
- **Consumo de API:** Peticiones asíncronas para lectura paginada, filtros por marca/categoría, creación con validación y eliminación.
- **Estado Global (Context API):**
  - **Favoritos (`FavoritosContext`):** Guardado y persistencia en `localStorage`.
  - **Carrito de Compras (`CarritoContext`):** Control de unidades, cálculo de totales, drawer interactivo y persistencia en `localStorage`.
  - **Tema (`TemaContext`):** Modo claro y oscuro con Tailwind y script anti-flash.
- **Hosting:** Preparado para Vercel con reescritura para SPA en `vercel.json`.

## Integrantes

- Altamirano, Julian
- Sosa Zabala, Rodrigo Ezequiel
