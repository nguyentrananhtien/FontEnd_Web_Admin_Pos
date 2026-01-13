import { useEffect, useState } from "react";
import axios from "axios";
import { CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";
import type { ApiResponse, MonthlyData } from "../../props/statistic";

export default function RevenueChart() {
    const [data, setData] = useState<{ name: string; revenue: number }[]>([]);

    useEffect(() => {
        axios.get<ApiResponse<MonthlyData[]>>('http://localhost:8080/api/admin/statistics/monthly')
            .then(res => {
                if (res.data.success && res.data.data) {
                    const formattedData = res.data.data.map(item => ({
                        name: item.monthLabel,
                        revenue: item.revenue / 1000000
                    }));
                    setData(formattedData);
                }
            }).catch(err => console.error(err));
    }, []);

    if (data.length === 0) return <div style={{ height: 350 }} className="d-flex align-items-center justify-content-center">Đang tải dữ liệu...</div>;

    return (
        <div style={{ width: '100%', height: 350, minHeight: 350 }}>
            <ResponsiveContainer width="100%" height="100%">
                {/* Tăng margin right lên 45 để hiện rõ số 6 của năm 2026 */}
                <AreaChart data={data} margin={{ top: 10, right: 45, left: 0, bottom: 20 }}>
                    <defs>
                        <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis
                        dataKey="name"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 11, fill: '#666' }}
                        interval={0}
                        padding={{ right: 20 }} // Tạo thêm khoảng đệm bên phải
                    />
                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12, fill: '#666' }}
                        width={40}
                    />
                    <Tooltip
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 8px 30px rgba(0,0,0,0.1)' }}
                        formatter={(value: number) => [`${value.toFixed(2)} triệu VNĐ`, "Doanh thu"]}
                    />
                    <Area
                        type="monotone"
                        dataKey="revenue"
                        stroke="#6366f1"
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#colorRev)"
                        animationDuration={1500}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}