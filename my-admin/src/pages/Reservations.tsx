import { useReservation } from "../hooks/useReservation";
import type { ReservationResponse } from "../props/Reservations";
import { useState } from "react";
import { ReservationTable } from "../components/ui/reservations/ReservationTable";
import { ReservationDetailModal } from "../components/ui/reservations/ReservationDetailModal";
import { Card } from "react-bootstrap";

export default function Reservations() {
  const { reservations } = useReservation();
  const [selected, setSelected] = useState<ReservationResponse | null>(null);

  return (
    <>
      <Card body>
        <Card.Title>Danh sách đơn đặt bàn</Card.Title>
        <ReservationTable
          data={reservations}
          onView={setSelected}
        />
      </Card>

      <ReservationDetailModal
        show={!!selected}
        data={selected}
        onClose={() => setSelected(null)}
      />
    </>
  );
}