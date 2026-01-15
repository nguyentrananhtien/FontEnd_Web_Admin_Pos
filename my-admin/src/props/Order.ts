export interface OrderItem {
    id?: number;
    dishId: number;
    dishName?: string;
    quantity: number;
    unitPrice?: number;
    specialRequests?: string;
    status?: string;
}

export interface Order {
    id?: number;
    reservationId?: number;
    customerId: number;
    orderTime?: string;
    totalAmount?: number;
    status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'served' | 'cancelled';
    paymentStatus: 'unpaid' | 'paid' | 'refunded';
    paymentMethod: string;
    notes?: string;
    createdAt?: string;
    updatedAt?: string;
    items: OrderItem[];
}

export interface OrderRequest {
    reservationId?: number;
    customerId: number;
    notes?: string;
    paymentMethod: string;
    status: string;
    paymentStatus: string;
    items: {
        dishId: number;
        quantity: number;
        specialRequests?: string;
    }[];
}

export interface TodayStatistics {
    totalOrders: number;
    pendingOrders: number;
    completedOrders: number;
    paidOrders: number;
    orders: Order[];
}
