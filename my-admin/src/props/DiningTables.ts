export interface DiningTableResponse {
  tableId: number;
  tableCode: string;
  seatingCapacity: number;
  area: string;
  status: TableStatus;
  notes: string | null;
}
export type TableStatus = "EMPTY" | "OCCUPIED";

export interface DiningTablesRequest {
  tableCode: string;
  seatingCapacity: number;
  area: string;
  status: TableStatus;
  notes: string | null;
}