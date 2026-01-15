import axios from "axios";
import type {
    Order,
    OrderRequest,
    TodayStatistics,
} from "../props/Order";

const BASE_API_URL = 'http://localhost:8080/api/admin';

export const getAllOrders = async (): Promise<Order[]> => {
  const res = await axios.get(`${BASE_API_URL}/orders`);
  return res.data.data;
};

export const getOrderById = async (id: number): Promise<Order> => {
  const res = await axios.get(`${BASE_API_URL}/orders/${id}`);
  return res.data.data;
};

export const getOrdersByCustomer = async (customerId: number): Promise<Order[]> => {
  const res = await axios.get(`${BASE_API_URL}/orders/customer/${customerId}`);
  return res.data.data;
};

export const getOrdersByReservation = async (reservationId: number): Promise<Order[]> => {
  const res = await axios.get(`${BASE_API_URL}/orders/reservation/${reservationId}`);
  return res.data.data;
};

export const getOrdersByStatus = async (status: string): Promise<Order[]> => {
  const res = await axios.get(`${BASE_API_URL}/orders/status/${status}`);
  return res.data.data;
};

export const getOrdersByPaymentStatus = async (paymentStatus: string): Promise<Order[]> => {
  const res = await axios.get(`${BASE_API_URL}/orders/payment-status/${paymentStatus}`);
  return res.data.data;
};

export const getOrdersByDateRange = async (start: string, end: string): Promise<Order[]> => {
  const res = await axios.get(`${BASE_API_URL}/orders/date-range`, {
    params: { start, end }
  });
  return res.data.data;
};

export const updateOrderStatus = async (id: number, status: string): Promise<void> => {
  await axios.patch(`${BASE_API_URL}/orders/${id}/status`, null, {
    params: { status }
  });
};

export const updatePaymentStatus = async (id: number, paymentStatus: string): Promise<void> => {
  await axios.patch(`${BASE_API_URL}/orders/${id}/payment-status`, null, {
    params: { paymentStatus }
  });
};

export const updateOrder = async (id: number, payload: OrderRequest): Promise<void> => {
  await axios.put(`${BASE_API_URL}/orders/${id}`, payload);
};

export const deleteOrder = async (id: number): Promise<void> => {
  await axios.delete(`${BASE_API_URL}/orders/${id}`);
};

export const getTodayStatistics = async (): Promise<TodayStatistics> => {
  const res = await axios.get(`${BASE_API_URL}/orders/statistics/today`);
  return res.data.data;
};
