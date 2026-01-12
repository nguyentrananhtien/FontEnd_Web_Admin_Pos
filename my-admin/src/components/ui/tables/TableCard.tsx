import { Badge, Card } from "react-bootstrap";
import { useState } from "react";
import { UpdateTableModal } from "./UpdateTableModal";
import type { DiningTableResponse } from "../../../props/DiningTables";

interface Props {
  table: DiningTableResponse;
  onReload: () => void;
}

export const TableCard = ({ table, onReload }: Props) => {
  const [showModal, setShowModal] = useState(false);
  const isEmpty = table.status === 'EMPTY';

  return (
    <>
      <Card
        onClick={() => setShowModal(true)}
        className="text-center shadow-sm table-card"
        style={{
          borderRadius: "16px",
          cursor: 'pointer',
          backgroundColor: isEmpty ? "#d4f8d4" : "#e0e0e0",
          transition: 'transform 0.2s',
        }}
      >
        <Card.Body>
          <Card.Title className="fw-bold">{table.tableCode}</Card.Title>
          <Badge bg={isEmpty ? "success" : "secondary"} className="mb-2">
            {isEmpty ? "Trống" : "Đang sử dụng"}
          </Badge>
          <Card.Text>Chỗ ngồi: {table.seatingCapacity}</Card.Text>
          <Card.Text>Khu vực: {table.area}</Card.Text>
        </Card.Body>
      </Card>

      <UpdateTableModal
        show={showModal}
        onHide={() => setShowModal(false)}
        table={table}
        onSuccess={() => {
          setShowModal(false);
          onReload();
        }}
      />
    </>
  );
};