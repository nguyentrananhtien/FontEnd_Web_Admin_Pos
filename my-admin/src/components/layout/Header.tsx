import { Search } from "lucide-react"
import "../../styles/Header.css"
export default function Header() {
  {
    return (
      <header className="bg-white shadow-sm border-bottom">
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

            <img
              src="/src/assets/logo.png"
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