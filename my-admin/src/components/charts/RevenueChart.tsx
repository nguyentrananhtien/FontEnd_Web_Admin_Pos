import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { name: 'Tháng 1', revenue: 65 },
  { name: 'Tháng 2', revenue: 78 },
  { name: 'Tháng 3', revenue: 90 },
  { name: 'Tháng 4', revenue: 81 },
  { name: 'Tháng 5', revenue: 105 },
  { name: 'Tháng 6', revenue: 132 },
  { name: 'Tháng 7', revenue: 145 },
  { name: 'Tháng 8', revenue: 160 },
  { name: 'Tháng 9', revenue: 175 },
  { name: 'Tháng 10', revenue: 190 },
  { name: 'Tháng 11', revenue: 210 },
  { name: 'Tháng 12', revenue: 245 },
]

export default function RevenueChart() {
  return (
    <div className="chart-container" style={{ height: 300 }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip formatter={(value) => `${value} triệu`} />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#6366f1"
            strokeWidth={3}
            dot={{ fill: '#6366f1' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}