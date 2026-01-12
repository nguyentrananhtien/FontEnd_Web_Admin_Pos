import { Badge, Button, Modal, Table } from "react-bootstrap";
import type { ReservationResponse } from "../../../props/Reservations";
import { ReservationStatusBadge } from "./ReservationStatusBadge";
import { useTables } from "../../../hooks/useTables";
import { useMemo } from "react";

interface Props {
  show: boolean;
  data: ReservationResponse | null;
  onClose: () => void;
}

export const ReservationDetailModal = ({ show, data, onClose }: Props) => {
  if (!data) return null;
  const { tables } = useTables();
  const tableMap = useMemo(() => {
    return new Map(tables.map(t => [t.tableId, t.tableCode]));
  }, [tables]);
  return (
    <Modal show={show} onHide={onClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Chi tiết đơn đặt bàn</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p><strong>Mã đặt bàn:</strong> {data.bookingCode}</p>
        <p><strong>Tên khách:</strong> {data.contactName}</p>
        <p><strong>Email:</strong> {data.contactEmail}</p>
        <p><strong>SĐT:</strong> {data.contactPhone}</p>
        <p><strong>Số khách:</strong> {data.totalGuests}</p>
        <p>
          <strong>Trạng thái:</strong>{" "}
          <ReservationStatusBadge status={data.reservationStatus} />
        </p>

        <hr />
        <h6>Bàn đã đặt</h6>

        <Table bordered size="sm">
          <thead>
            <tr>
              <th>Tên bàn</th>
              <th>Ngày</th>
              <th>Bắt đầu</th>
              <th>Kết thúc</th>
              <th>Số khách</th>
              <th>Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {[...data.reservationTables]
              .sort((a, b) => {
                // Sắp xếp theo ngày trước
                if (a.date !== b.date) {
                  return a.date.localeCompare(b.date);
                }

                // Nếu cùng ngày thì sắp xếp theo startTime
                return a.startTime.localeCompare(b.startTime);
              })
              .map((t) => (
                <tr key={t.reservationTableId}>
                  <td>{tableMap.get(t.tableId) || `#${t.tableId}`}</td>
                  <td>{t.date}</td>
                  <td>{t.startTime}</td>
                  <td>{t.endTime}</td>
                  <td>{t.guestsAtTable}</td>
                  <td>
                    <Badge bg="info">{t.reservationTableStatus}</Badge>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Đóng</Button>
      </Modal.Footer>
    </Modal>
  );
};