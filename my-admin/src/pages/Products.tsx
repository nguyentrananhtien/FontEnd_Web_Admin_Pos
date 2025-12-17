import { Pencil, Plus, Search, Trash2 } from "lucide-react"
import { useState } from "react"
import Card from "../components/ui/Card"

const mockProducts = [
  { id: 1, name: 'iPhone 15 Pro', category: 'Điện thoại', price: 28990000, stock: 45, status: 'Còn hàng' },
  { id: 2, name: 'MacBook Air M2', category: 'Laptop', price: 32990000, stock: 12, status: 'Sắp hết' },
  { id: 3, name: 'AirPods Pro 2', category: 'Tai nghe', price: 6490000, stock: 0, status: 'Hết hàng' },
  { id: 4, name: 'Samsung S24 Ultra', category: 'Điện thoại', price: 31990000, stock: 78, status: 'Còn hàng' },
]

export default function Products() {
  const [search, setSearch] = useState('')

  const filtered = mockProducts.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="mb-0 fw-bold">Quản lý sản phẩm</h3>
        <button className="btn btn-primary ms-auto d-flex align-items-center gap-2">
          <Plus size={20} /> Thêm sản phẩm
        </button>
      </div>

      <Card title={`Danh sách sản phẩm (${filtered.length})`}>
        <div className="mb-4">
          <div className="position-relative">
            <Search className="position-absolute top-50 start-3 translate-middle-y text-muted" size={20} />
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              className="form-control ps-5 py-2"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Tên sản phẩm</th>
                <th>Danh mục</th>
                <th>Giá</th>
                <th>Kho</th>
                <th>Trạng thái</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(product => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>
                    <div className="d-flex align-items-center gap-3">
                      <div className="bg-light rounded" style={{ width: 50, height: 50 }}></div>
                      <strong>{product.name}</strong>
                    </div>
                  </td>
                  <td>{product.category}</td>
                  <td>{product.price.toLocaleString('vi-VN')}₫</td>
                  <td>{product.stock}</td>
                  <td>
                    <span className={`badge text-white bg-${product.stock > 20 ? 'success' : product.stock > 0 ? 'warning' : 'danger'} bg-opacity-20 text-${product.stock > 20 ? 'success' : product.stock > 0 ? 'warning' : 'danger'}`}>
                      {product.status}
                    </span>
                  </td>
                  <td>
                    <button className="btn btn-sm btn-outline-primary me-2">
                      <Pencil size={16} />
                    </button>
                    <button className="btn btn-sm btn-outline-danger">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  )
}