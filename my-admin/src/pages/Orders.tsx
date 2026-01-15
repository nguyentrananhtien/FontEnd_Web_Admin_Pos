import { useEffect, useState } from "react"
import { CheckCircle, Eye, Package, Clock, CreditCard, Trash2 } from "lucide-react"
import Card from "../components/ui/Card"
import { getAllOrders, getOrdersByStatus, updateOrderStatus, updatePaymentStatus, deleteOrder, getTodayStatistics} from "../api/Order.service"
import type {
  Order,
  TodayStatistics,
} from "../props/Order";

const getStatusText = (status: string) => {
  switch (status) {
    case 'pending': return 'Chờ xử lý'
    case 'confirmed': return 'Đã xác nhận'
    case 'preparing': return 'Đang chuẩn bị'
    case 'ready': return 'Sẵn sàng'
    case 'served': return 'Đã phục vụ'
    case 'cancelled': return 'Đã hủy'
    default: return status
  }
}

const getPaymentStatusText = (status: string) => {
  switch (status) {
    case 'unpaid': return 'Chưa thanh toán'
    case 'paid': return 'Đã thanh toán'
    case 'refunded': return 'Đã hoàn tiền'
    default: return status
  }
}

const getPaymentStatusBadge = (status: string) => {
  switch (status) {
    case 'paid': return 'badge bg-success'
    case 'unpaid': return 'badge bg-warning'
    case 'refunded': return 'badge bg-info'
    default: return 'badge bg-secondary'
  }
}

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [statistics, setStatistics] = useState<TodayStatistics | null>(null)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  useEffect(() => {
    loadOrders()
    loadStatistics()
  }, [filterStatus])

  const loadOrders = async () => {
    try {
      setLoading(true)
      let data: Order[]
      if (filterStatus === 'all') {
        data = await getAllOrders()
      } else {
        data = await getOrdersByStatus(filterStatus)
      }
      setOrders(data)
    } catch (error) {
      console.error('Error loading orders:', error)
      alert('Lỗi khi tải danh sách đơn hàng')
    } finally {
      setLoading(false)
    }
  }

  const loadStatistics = async () => {
    try {
      const stats = await getTodayStatistics()
      setStatistics(stats)
    } catch (error) {
      console.error('Error loading statistics:', error)
    }
  }

  const handleUpdateStatus = async (orderId: number, newStatus: string) => {
    try {
      await updateOrderStatus(orderId, newStatus)
      alert('Cập nhật trạng thái thành công!')
      loadOrders()
      loadStatistics()
    } catch (error) {
      console.error('Error updating status:', error)
      alert('Lỗi khi cập nhật trạng thái')
    }
  }

  const handleUpdatePaymentStatus = async (orderId: number, newPaymentStatus: string, currentStatus: string) => {
    if (currentStatus === 'paid' && newPaymentStatus === 'unpaid') {
      alert('Không thể chuyển từ Đã thanh toán về Chưa thanh toán!')
      return
    }

    try {
      await updatePaymentStatus(orderId, newPaymentStatus)
      alert('Cập nhật trạng thái thanh toán thành công!')
      loadOrders()
      loadStatistics()
    } catch (error: any) {
      console.error('Error updating payment status:', error)
      if (error.response?.status === 400) {
        alert(error.response.data.message)
      } else {
        alert('Lỗi khi cập nhật trạng thái thanh toán')
      }
    }
  }

  const handleDeleteOrder = async (orderId: number) => {
    if (!confirm('Bạn có chắc chắn muốn xóa đơn hàng này?')) {
      return
    }

    try {
      await deleteOrder(orderId)
      alert('Xóa đơn hàng thành công!')
      loadOrders()
      loadStatistics()
    } catch (error) {
      console.error('Error deleting order:', error)
      alert('Lỗi khi xóa đơn hàng')
    }
  }

  const formatDateTime = (dateString?: string) => {
    if (!dateString) return 'N/A'
    const date = new Date(dateString)
    return date.toLocaleString('vi-VN')
  }

  return (
    <>
      <h3 className="mb-4 fw-bold">Quản lý đơn hàng</h3>

      {statistics && (
        <div className="row mb-4">
          <div className="col-md-3">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="d-flex align-items-center">
                <Package className="text-primary me-3" size={40} />
                <div>
                  <h6 className="mb-0">Tổng đơn hôm nay</h6>
                  <h4 className="mb-0">{statistics.totalOrders}</h4>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="d-flex align-items-center">
                <Clock className="text-warning me-3" size={40} />
                <div>
                  <h6 className="mb-0">Đang chờ</h6>
                  <h4 className="mb-0">{statistics.pendingOrders}</h4>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="d-flex align-items-center">
                <CheckCircle className="text-success me-3" size={40} />
                <div>
                  <h6 className="mb-0">Hoàn thành</h6>
                  <h4 className="mb-0">{statistics.completedOrders}</h4>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="d-flex align-items-center">
                <CreditCard className="text-info me-3" size={40} />
                <div>
                  <h6 className="mb-0">Đã thanh toán</h6>
                  <h4 className="mb-0">{statistics.paidOrders}</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Card title="Tất cả đơn hàng">
        <div className="mb-3">
          <label className="form-label">Lọc theo trạng thái:</label>
          <select
            className="form-select w-auto"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">Tất cả</option>
            <option value="pending">Chờ xử lý</option>
            <option value="confirmed">Đã xác nhận</option>
            <option value="preparing">Đang chuẩn bị</option>
            <option value="ready">Sẵn sàng</option>
            <option value="served">Đã phục vụ</option>
            <option value="cancelled">Đã hủy</option>
          </select>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Đang tải...</span>
            </div>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Mã đơn</th>
                  <th>Khách hàng ID</th>
                  <th>Thời gian</th>
                  <th>Tổng tiền</th>
                  <th>Trạng thái</th>
                  <th>Thanh toán</th>
                  <th>Phương thức</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="text-center py-4">
                      Không có đơn hàng nào
                    </td>
                  </tr>
                ) : (
                  orders.map(order => (
                    <tr key={order.id}>
                      <td><strong>#{order.id}</strong></td>
                      <td>{order.customerId}</td>
                      <td>{formatDateTime(order.orderTime)}</td>
                      <td className="fw-bold text-danger">
                        {order.totalAmount?.toLocaleString('vi-VN')}₫
                      </td>
                      <td>
                        <select
                          className="form-select form-select-sm"
                          value={order.status}
                          onChange={(e) => handleUpdateStatus(order.id!, e.target.value)}
                        >
                          <option value="pending">Chờ xử lý</option>
                          <option value="confirmed">Đã xác nhận</option>
                          <option value="preparing">Đang chuẩn bị</option>
                          <option value="ready">Sẵn sàng</option>
                          <option value="served">Đã phục vụ</option>
                          <option value="cancelled">Đã hủy</option>
                        </select>
                      </td>
                      <td>
                        <select
                          className="form-select form-select-sm"
                          value={order.paymentStatus}
                          onChange={(e) => handleUpdatePaymentStatus(order.id!, e.target.value, order.paymentStatus)}
                          disabled={order.paymentStatus === 'paid'}
                        >
                          <option value="unpaid">Chưa thanh toán</option>
                          <option value="paid">Đã thanh toán</option>
                          <option value="refunded">Đã hoàn tiền</option>
                        </select>
                        {order.paymentStatus === 'paid' && (
                          <small className="text-danger d-block">Không thể đổi</small>
                        )}
                      </td>
                      <td>{order.paymentMethod}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-outline-info me-2"
                          onClick={() => setSelectedOrder(order)}
                          data-bs-toggle="modal"
                          data-bs-target="#orderDetailModal"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDeleteOrder(order.id!)}
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <div className="modal fade" id="orderDetailModal" tabIndex={-1}>
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Chi tiết đơn hàng #{selectedOrder?.id}</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              {selectedOrder && (
                <>
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <p><strong>Khách hàng ID:</strong> {selectedOrder.customerId}</p>
                      <p><strong>Reservation ID:</strong> {selectedOrder.reservationId || 'N/A'}</p>
                      <p><strong>Thời gian đặt:</strong> {formatDateTime(selectedOrder.orderTime)}</p>
                    </div>
                    <div className="col-md-6">
                      <p><strong>Trạng thái:</strong> <span className={`badge ${selectedOrder.status === 'served' ? 'bg-success' : 'bg-warning'}`}>{getStatusText(selectedOrder.status)}</span></p>
                      <p><strong>Thanh toán:</strong> <span className={getPaymentStatusBadge(selectedOrder.paymentStatus)}>{getPaymentStatusText(selectedOrder.paymentStatus)}</span></p>
                      <p><strong>Phương thức:</strong> {selectedOrder.paymentMethod}</p>
                    </div>
                  </div>

                  {selectedOrder.notes && (
                    <div className="mb-3">
                      <strong>Ghi chú:</strong>
                      <p className="text-muted">{selectedOrder.notes}</p>
                    </div>
                  )}

                  <h6>Món ăn:</h6>
                  <table className="table table-sm">
                    <thead>
                      <tr>
                        <th>Món</th>
                        <th>Số lượng</th>
                        <th>Đơn giá</th>
                        <th>Thành tiền</th>
                        <th>Ghi chú đặc biệt</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedOrder.items.map((item, index) => (
                        <tr key={index}>
                          <td>{item.dishName}</td>
                          <td>{item.quantity}</td>
                          <td>{item.unitPrice?.toLocaleString('vi-VN')}₫</td>
                          <td>{((item.unitPrice || 0) * item.quantity).toLocaleString('vi-VN')}₫</td>
                          <td>{item.specialRequests || '-'}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colSpan={3} className="text-end"><strong>Tổng cộng:</strong></td>
                        <td colSpan={2} className="fw-bold text-danger">
                          {selectedOrder.totalAmount?.toLocaleString('vi-VN')}₫
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </>
              )}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}