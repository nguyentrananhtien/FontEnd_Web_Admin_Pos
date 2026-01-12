import { Button, Form, Modal } from "react-bootstrap";
import { useTableModal } from "../../../hooks/useTableModal";
import type { DiningTableResponse } from "../../../props/DiningTables";

interface Props {
  show: boolean;
  onHide: () => void;
  table: DiningTableResponse;
  onSuccess: () => void;
}

export const UpdateTableModal = ({ show, onHide, table, onSuccess }: Props) => {
  const {
    form,
    handleChange,
    handleUpdate,
    handleDelete,
  } = useTableModal(table, onSuccess);

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>🪑 Cập nhật bàn</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Mã bàn</Form.Label>
            <Form.Control
              name="tableCode"
              value={form.tableCode}
              onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Số chỗ ngồi</Form.Label>
            <Form.Control
              type="number"
              name="seatingCapacity"
              value={form.seatingCapacity}
              onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Khu vực</Form.Label>
            <Form.Control
              name="area"
              value={form.area}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Trạng thái</Form.Label>
            <Form.Select
              name="status"
              value={form.status}
              onChange={handleChange}
            >
              <option value="EMPTY">Trống</option>
              <option value="OCCUPIED">Đang sử dụng</option>
            </Form.Select>
          </Form.Group>

          <Form.Group>
            <Form.Label>Ghi chú</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              name="notes"
              value={form.notes ?? ""}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer className="justify-content-between">
        <Button variant="outline-danger" onClick={handleDelete}>
          🗑 Xóa bàn
        </Button>

        <div>
          <Button variant="secondary" onClick={onHide} className="me-2">
            Hủy
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            💾 Lưu
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};