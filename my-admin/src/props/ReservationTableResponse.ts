export interface ReservationTableResponse {
  reservationTableId: number;
  reservationId: number;
  tableId: number,
  date: string;
  startTime: string;
  endTime: string;
  guestsAtTable: number;
  reservationTableStatus: ReservationTableStatus;
}

export type ReservationTableStatus = "PENDING" | "CONFIRMED" | "CHECKED_IN" | "COMPLETED" | "CANCELLED";
