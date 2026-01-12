import axios from "axios";
import type { ReservationResponse } from "../props/Reservations";
const BASE_API_URL = 'http://localhost:8080/api';

export const getAllReservations = async (): Promise<ReservationResponse[]> => {
  const res = await axios.get(`${BASE_API_URL}/reservations`);
  return res.data.data;
};