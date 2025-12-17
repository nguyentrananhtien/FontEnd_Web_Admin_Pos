import { Bell, Moon, Search, Sun } from "lucide-react"
import useDarkMode from "../../hooks/useDarkMode"
import "../../styles/Header.css"
export default function Header() {
  {
    const { darkMode, toggleDarkMode } = useDarkMode()

    return (
      <header className="bg-white dark:bg-gray-800 shadow-sm border-bottom">
        <div className="d-flex justify-content-between align-items-center p-3 px-4">
          <div className="position-relative">
            <Search className="position-absolute top-50 start-3 translate-middle-y text-muted search-icon" size={20} />
            <input
              type="text"
              placeholder="Tìm kiếm..."
              className="ps-5 py-2 border rounded-pill w-96"
            />
          </div>

          <div className="d-flex align-items-center gap-3">
            <button className="btn btn-link position-relative">
              <Bell size={22} />
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                3
              </span>
            </button>

            <button onClick={toggleDarkMode} className="btn btn-link">
              {darkMode ? <Sun size={22} /> : <Moon size={22} />}
            </button>

            <img
              src="https://i.pravatar.cc/40"
              alt="Admin"
              className="rounded-circle"
              width={40}
            />
          </div>
        </div>
      </header>
    )
  }
}