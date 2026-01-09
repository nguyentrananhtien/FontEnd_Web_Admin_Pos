import { LayoutDashboard, Menu, ShoppingCart, Sofa, X, UtensilsCrossed } from 'lucide-react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const menuItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/dishes', icon: UtensilsCrossed, label: 'Món ăn' },
  { to: '/orders', icon: ShoppingCart, label: 'Đơn hàng' },
  { to: '/tables', icon: Sofa, label: 'Bàn ăn' },
]

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className={`bg-dark text-white vh-100 position-fixed top-0 start-0 transition-all ${collapsed ? 'w-20' : 'w-64'} `}>
      <div className="p-4 d-flex justify-content-between align-items-center">
        <h4 className={`text-white mb-0 ${collapsed ? 'd-none' : ''}`}>Admin Panel</h4>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="btn btn-link text-white p-0"
        >
          {collapsed ? <Menu size={24} /> : <X size={24} />}
        </button>
      </div>

      <nav className="mt-4">
        {menuItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `d-flex align-items-center px-4 py-3 text-white text-decoration-none transition-colors ${isActive ? 'bg-primary text-white' : 'text-white-50 hover:bg-gray-700'
              }`
            }
          >
            <item.icon size={20} />
            {!collapsed && <span className="ms-3">{item.label}</span>}
          </NavLink>
        ))}
      </nav>
    </div>
  )
}