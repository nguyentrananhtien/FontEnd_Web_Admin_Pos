
export interface MonthlyData {
    monthLabel: string;
    revenue: number;
}

export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}

export interface TableStatisticResponse {
    tableCode: string;
    orderCount: number;
    totalRevenue: number;
}

export interface OrderItem {
    id: number;
    paymentStatus: 'paid' | 'unpaid' | 'refunded';
    totalAmount: number;
    paymentMethod?: string;
}

export interface DashboardTodayStats {
    totalOrders: number;
    pendingOrders: number;
    completedOrders: number;
    paidOrders: number;
    orders: OrderItem[];
}

