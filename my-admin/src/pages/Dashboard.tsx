import { useEffect, useState } from "react"
import { DollarSign, ShoppingBag, TrendingUp, Users } from "lucide-react"
import { Card, Col, Row } from "react-bootstrap"
import axios from "axios"
import RevenueChart from "../components/charts/RevenueChart"
import TableRevenueChart from "../components/charts/TableRevenueChart"
import type { ApiResponse, DashboardTodayStats, OrderItem } from "../props/statistic"

export default function Dashboard() {
    const [summary, setSummary] = useState({
        totalRevenue: 0,
        totalOrders: 0,
        paidOrders: 0,
        recentOrders: [] as OrderItem[]
    });

    useEffect(() => {
        axios.get<ApiResponse<DashboardTodayStats>>('http://localhost:8080/api/admin/orders/statistics/today')
            .then(res => {
                if (res.data.success) {
                    const stats = res.data.data;
                    const dailyRevenue = stats.orders
                        .filter(o => o.paymentStatus === 'paid')
                        .reduce((sum, o) => sum + o.totalAmount, 0);

                    setSummary({
                        totalOrders: stats.totalOrders,
                        paidOrders: stats.paidOrders,
                        totalRevenue: dailyRevenue,
                        recentOrders: stats.orders.slice(0, 5)
                    });
                }
            }).catch(err => console.error(err));
    }, []);

    const stats = [
        { title: 'Doanh thu', value: `${summary.totalRevenue.toLocaleString('vi-VN')} VNĐ`, icon: DollarSign, color: 'primary', change: 'Hôm nay' },
        { title: 'Đơn hàng', value: summary.totalOrders.toString(), icon: ShoppingBag, color: 'success', change: `Đã trả: ${summary.paidOrders}` },
        { title: 'Khách hàng', value: '---', icon: Users, color: 'info', change: 'Mới' },
        { title: 'Hiệu suất', value: summary.totalOrders > 0 ? `${((summary.paidOrders / summary.totalOrders) * 100).toFixed(0)}%` : '0%', icon: TrendingUp, color: 'warning', change: 'Tỉ lệ thanh toán' },
    ];

    return (
        <div className="p-4 bg-light min-vh-100">
            <h2 className="mb-4 fw-bold text-uppercase text-primary">Hệ thống quản trị POS</h2>

            {/* Hàng 1: Thẻ thống kê nhanh */}
            <Row className="g-4 mb-4">
                {stats.map((stat, i) => (
                    <Col key={i} md={6} lg={3}>
                        <Card className="h-100 border-0 shadow-sm">
                            <Card.Body className="d-flex justify-content-between align-items-center">
                                <div>
                                    <p className="text-muted small mb-1">{stat.title}</p>
                                    <h4 className="mb-0 fw-bold">{stat.value}</h4>
                                    <p className={`mb-0 text-${stat.color} small mt-1`}>{stat.change}</p>
                                </div>
                                <div className={`p-3 rounded-circle bg-${stat.color} bg-opacity-10`}>
                                    <stat.icon size={24} className={`text-${stat.color}`} />
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* Hàng 2: Doanh thu theo bàn */}
            <Row className="mb-4">
                <Col lg={12}>
                    <Card className="border-0 shadow-sm p-4">
                        <h5 className="fw-bold mb-4">Doanh thu theo bàn (Triệu VNĐ)</h5>
                        <TableRevenueChart />
                    </Card>
                </Col>
            </Row>

            {/* Hàng 3: Doanh thu 12 tháng (Dưới biểu đồ bàn - Chiếm trọn chiều ngang) */}
            <Row className="mb-4">
                <Col lg={12}>
                    <Card className="border-0 shadow-sm p-4">
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h5 className="fw-bold mb-0">Xu hướng doanh thu 12 tháng gần nhất</h5>
                            <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-2">Đơn vị: Triệu VNĐ</span>
                        </div>
                        <RevenueChart />
                    </Card>
                </Col>
            </Row>

            {/* Hàng 4: Đơn hàng gần đây */}
            <Row>
                <Col lg={12}>
                    <Card className="border-0 shadow-sm">
                        <div className="p-4 border-bottom">
                            <h5 className="fw-bold mb-0">Đơn hàng gần đây</h5>
                        </div>
                        <div className="list-group list-group-flush">
                            {summary.recentOrders.map(order => (
                                <div key={order.id} className="list-group-item d-flex justify-content-between align-items-center p-3">
                                    <div>
                                        <span className="fw-bold text-primary">#ORD-{order.id}</span>
                                        <p className="mb-0 text-muted small">{order.paymentMethod || 'Tiền mặt'}</p>
                                    </div>
                                    <div className="text-end">
                                        <span className="fw-bold d-block">{order.totalAmount.toLocaleString('vi-VN')} VNĐ</span>
                                        <span className={`badge bg-${order.paymentStatus === 'paid' ? 'success' : 'warning'} bg-opacity-10 text-${order.paymentStatus === 'paid' ? 'success' : 'warning'}`}>
                                            {order.paymentStatus === 'paid' ? 'Hoàn tất' : 'Đang xử lý'}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}