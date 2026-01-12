import { useEffect, useState } from "react";
import type { ReservationResponse } from "../props/Reservations";
import { getAllReservations } from "../api/Reservation.service";

export const useReservation = () => {
  const [reservations, setReservations] = useState<ReservationResponse[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchReservations = async () => {
    setLoading(true);
    const data = await getAllReservations();

    // Group lại bằng map
    const grouped = data.reduce((acc, item) => {
      const key = `${item.contactName}|${item.contactEmail}|${item.contactPhone}|${item.reservationStatus}`;

      if (acc.has(key)) {
        const existing = acc.get(key)!;
        existing.reservationTables.push(...item.reservationTables);
        existing.totalGuests = existing.reservationTables.reduce(
          (sum, t) => sum + t.guestsAtTable, 0);
      } else {
        acc.set(key, { ...item });
      }
      return acc;
    }, new Map<string, ReservationResponse>());

    setReservations(Array.from(grouped.values()));
    setLoading(false);
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  return {
    reservations,
    loading,
    reload: fetchReservations
  };
}
