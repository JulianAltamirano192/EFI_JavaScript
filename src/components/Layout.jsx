import { Outlet } from 'react-router-dom'
import Navbar from './Navbar.jsx'

function Layout() {
  return (
    <div className="min-h-screen bg-marfil font-sans text-stone-800 dark:bg-noche dark:text-stone-200">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
