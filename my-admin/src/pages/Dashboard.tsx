import { DollarSign, ShoppingBag, TrendingUp, Users } from "lucide-react"
import { Card, Col, Row } from "react-bootstrap"
import RevenueChart from "../components/charts/RevenueChart"

const stats = [
  { title: 'Doanh thu', value: '₫124,500', icon: DollarSign, color: 'primary', change: '+12%' },
  { title: 'Đơn hàng', value: '1,423', icon: ShoppingBag, color: 'success', change: '+8%' },
  { title: 'Khách hàng', value: '8,459', icon: Users, color: 'info', change: '+23%' },
  { title: 'Tăng trưởng', value: '24%', icon: TrendingUp, color: 'warning', change: '+5%' },
]

export default function Dashboard() {
  return (
    <>
      <h2 className="mb-4">Tổng quan</h2>

      <Row className="g-4 mb-5">
        {stats.map((stat, i) => (
          <Col key={i} md={6} lg={3}>
            <Card title={stat.title}>
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex flex-wrap justify-content-center">
                  <h2 className="mb-2 fw-bold">{stat.value}</h2>
                  <p className={`mb-0 text-${stat.color} fw-medium`}>{stat.change} so với tháng trước</p>
                </div>
                <div className={`p-3 rounded-3`}>
                  <stat.icon size={32} className={`text-${stat.color}`} />
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Có thể thêm chart ở đây sau */}
      <Row className="g-4">
        <Col lg={8}>
          <Card title="Doanh thu 12 tháng gần nhất (triệu VND)">
            <RevenueChart />
          </Card>
        </Col>
        <Col lg={4}>
          <Card title="Đơn hàng gần đây">
            <div className="list-group list-group-flush">
              {[
                { id: '#ORD-2025', customer: 'Nguyễn Văn A', amount: '₫2,350,000', status: 'success' },
                { id: '#ORD-2024', customer: 'Trần Thị B', amount: '₫890,000', status: 'warning' },
                { id: '#ORD-2023', customer: 'Lê Văn C', amount: '₫5,200,000', status: 'success' },
                { id: '#ORD-2022', customer: 'Phạm D', amount: '₫420,000', status: 'danger' },
              ].map(order => (
                <div key={order.id} className="list-group-item d-flex flex-row justify-content-between align-items-center p-3 border-bottom">
                  <div>
                    <strong>{order.id}</strong>
                    <p className="mb-0 text-muted small">{order.customer}</p>
                  </div>
                  <div className="text-end">
                    <span className="fw-bold">{order.amount}</span><br />
                    <span className={`badge bg-${order.status} bg-opacity-20 text-white text-${order.status}`}>
                      {order.status === 'success' ? 'Đã giao' : order.status === 'warning' ? 'Đang xử lý' : 'Hủy'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </Col>
      </Row>
    </>
  )
}