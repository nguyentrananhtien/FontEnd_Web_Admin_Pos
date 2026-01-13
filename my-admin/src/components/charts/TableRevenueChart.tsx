import { useEffect, useState } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import type { ApiResponse, TableStatisticResponse } from "../../props/statistic";

const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f43f5e', '#f59e0b'];

export default function TableRevenueChart() {
    const [data, setData] = useState<TableStatisticResponse[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get<ApiResponse<TableStatisticResponse[]>>('http://localhost:8080/api/admin/statistics/tables')
            .then(res => {
                // Kiểm tra kỹ cấu trúc res.data.data
                if (res.data && res.data.success && Array.isArray(res.data.data)) {
                    const formattedData = res.data.data.map(item => ({
                        ...item,
                        // Chia 1 triệu để đồng bộ với biểu đồ 12 tháng
                        totalRevenue: item.totalRevenue / 1000000
                    }));
                    setData(formattedData);
                }
                setLoading(false);
            })
            .catch(err => {
                console.error("Lỗi lấy dữ liệu bàn:", err);
                setLoading(false);
            });
    }, []);

    // Nếu đang tải hoặc không có dữ liệu, hiển thị thông báo thay vì để trống
    if (loading) return <div style={{ height: 350 }} className="d-flex align-items-center justify-content-center">Đang tải dữ liệu bàn...</div>;
    if (data.length === 0) return <div style={{ height: 350 }} className="d-flex align-items-center justify-content-center text-muted">Không có dữ liệu doanh thu bàn</div>;

    return (
        /* Thêm width 100% và minHeight để tránh lỗi width(-1) */
        <div className="chart-wrapper" style={{ width: '100%', height: 350, minHeight: 350 }}>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={data}
                    margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
                >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis
                        dataKey="tableCode"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12, fill: '#666' }}
                    />
                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12, fill: '#666' }}
                        width={50}
                        // Định dạng trục Y hiển thị số triệu
                        tickFormatter={(value) => `${value}`}
                    />
                    <Tooltip
                        formatter={(value: number) => [`${value.toFixed(2)} triệu VNĐ`, "Doanh thu"]}
                        cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
                        contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}
                    />

                    <Bar dataKey="totalRevenue" radius={[6, 6, 0, 0]} barSize={45}>
                        {data.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}