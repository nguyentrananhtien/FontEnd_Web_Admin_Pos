import { CheckCircle, Eye, Package, Truck, XCircle } from "lucide-react"
import Card from "../components/ui/Card"

const orders = [
  { id: '#ORD-1201', customer: 'Nguyễn Văn An', total: 28990000, status: 'delivered', date: '10/12/2025' },
  { id: '#ORD-1200', customer: 'Trần Bích', total: 12990000, status: 'processing', date: '10/12/2025' },
  { id: '#ORD-1199', customer: 'Lê Minh C', total: 6490000, status: 'cancelled', date: '09/12/2025' },
  { id: '#ORD-1198', customer: 'Phạm Thị D', total: 45990000, status: 'shipped', date: '09/12/2025' },
]

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'delivered': return <CheckCircle className="text-success" />
    case 'processing': return <Package className="text-warning" />
    case 'shipped': return <Truck className="text-primary" />
    case 'cancelled': return <XCircle className="text-danger" />
    default: return null
  }
}

export default function Orders() {
  return (
    <>
      <h3 className="mb-4 fw-bold">Quản lý đơn hàng</h3>

      <Card title="Tất cả đơn hàng">
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Mã đơn</th>
                <th>Khách hàng</th>
                <th>Ngày đặt</th>
                <th>Tổng tiền</th>
                <th>Trạng thái</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id}>
                  <td><strong>{order.id}</strong></td>
                  <td>{order.customer}</td>
                  <td>{order.date}</td>
                  <td className="fw-bold text-danger">{order.total.toLocaleString('vi-VN')}₫</td>
                  <td>
                    <span className="d-flex align-items-center gap-2">
                      {getStatusIcon(order.status)}
                      {order.status === 'delivered' ? 'Đã giao' :
                        order.status === 'processing' ? 'Đang xử lý' :
                          order.status === 'shipped' ? 'Đang giao' : 'Đã hủy'}
                    </span>
                  </td>
                  <td>
                    <button className="btn btn-sm btn-outline-info">
                      <Eye size={16} /> Xem
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