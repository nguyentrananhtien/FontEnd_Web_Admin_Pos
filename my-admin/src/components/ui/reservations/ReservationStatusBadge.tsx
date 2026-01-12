import { Badge } from "react-bootstrap";
import type { ReservationStatus } from "../../../props/Reservations";
const STATUS_CONFIG: Record<
  ReservationStatus,
  { label: string; bg: string; text?: string }
> = {
  PENDING: { label: "Chờ xác nhận", bg: "secondary" },
  CONFIRMED: { label: "Đã xác nhận", bg: "warning", text: "dark" },
  CANCELLED: { label: "Đã hủy", bg: "danger" },
  CHECKED_IN: { label: "Đã vào bàn", bg: "primary" },
  COMPLETED: { label: "Đã rời bàn", bg: "success" },
};

export const ReservationStatusBadge = ({ status }: { status: ReservationStatus }) => {
  const config = STATUS_CONFIG[status];
  return <Badge bg={config.bg} text={config.text} pill>{config.label}</Badge>;
};
