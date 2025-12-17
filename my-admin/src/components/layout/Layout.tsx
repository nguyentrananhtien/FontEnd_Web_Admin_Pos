import { Outlet } from "react-router-dom"
import Header from "./Header"
import Sidebar from "./Sidebar"
import useDarkMode from "../../hooks/useDarkMode"

export default function Layout() {
  const { darkMode } = useDarkMode()

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="d-flex">
        <Sidebar />
        <div className="flex-grow-1" style={{ marginLeft: 'var(--sidebar-width)' }}>
          <Header />
          <main className="p-4 bg-light dark:bg-gray-900 min-vh-100">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}