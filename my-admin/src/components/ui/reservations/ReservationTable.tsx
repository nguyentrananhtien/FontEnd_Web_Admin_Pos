import { Button, Table } from "react-bootstrap";
import type { ReservationResponse } from "../../../props/Reservations";
import { ReservationStatusBadge } from "./ReservationStatusBadge";
import { Eye } from "lucide-react";

interface Props {
  data: ReservationResponse[];
  onView: (item: ReservationResponse) => void;
}

export const ReservationTable = ({ data, onView }: Props) => (
  <Table striped bordered hover responsive className="align-middle">
    <thead>
      <tr>
        <th>Mã đơn</th>
        <th>Tên khách</th>
        <th>Email</th>
        <th>SĐT</th>
        <th className="text-center">Số khách</th>
        <th>Trạng thái</th>
        <th>Hành động</th>
      </tr>
    </thead>
    <tbody>
      {data.map((item) => (
        <tr key={item.reservationId}>
          <td>{item.reservationId}</td>
          <td>{item.contactName}</td>
          <td>{item.contactEmail}</td>
          <td>{item.contactPhone}</td>
          <td className="text-center">{item.totalGuests}</td>
          <td><ReservationStatusBadge status={item.reservationStatus} /></td>
          <td>
            <Button size="sm" variant="outline-info" onClick={() => onView(item)}>
              <Eye size={16} /> Xem
            </Button>
          </td>
        </tr>
      ))}
    </tbody>
  </Table>
);