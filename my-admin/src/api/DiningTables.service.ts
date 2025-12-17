import axios from "axios";
import type { DiningTableResponse, DiningTablesRequest } from "../props/DiningTables";

const BASE_API_URL = 'http://localhost:8080/api';

export const getAllTables = async (): Promise<DiningTableResponse[]> => {
  const res = await axios.get(`${BASE_API_URL}/tables`);
  return res.data.data;
};

export const createTable = async (payload: DiningTablesRequest): Promise<void> => {
  await axios.post(`${BASE_API_URL}/tables`, payload);
};

export const updateTable = async (tableId: number, payload: DiningTablesRequest) => {
  return axios.put(`${BASE_API_URL}/tables/${tableId}`, payload);
};

export const deleteTable = async (tableId: number) => {
  return axios.delete(`${BASE_API_URL}/tables/${tableId}`);
};