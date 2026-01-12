import type { ReservationTableResponse } from "./ReservationTableResponse";

export interface ReservationResponse {
  reservationId: number;
  userId: number;
  bookingCode: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  totalGuests: number;          // LocalDate -> string (yyyy-MM-dd)
  reservationStatus: ReservationStatus;
  otpVerified: boolean;
  createdAt: string;
  reservationTables: ReservationTableResponse[];
}

export type ReservationStatus = "PENDING" | "CONFIRMED" | "CHECKED_IN" | "COMPLETED" | "CANCELLED";
