import { Outlet } from 'react-router-dom'
import Navbar from './Navbar.jsx'

function Layout() {
  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-800 dark:text-stone-100">
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 py-8">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
