import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import type { DiningTablesRequest } from "../../../props/DiningTables";
import { createTable } from "../../../api/DiningTables.service";

interface Props {
  show: boolean;
  onHide: () => void;
  onCreated: () => void;
}

export function CreateTableModal({ show, onHide, onCreated }: Props) {
  const [form, setForm] = useState<DiningTablesRequest>({
    tableCode: "",
    seatingCapacity: 1,
    area: "",
    status: "EMPTY",
    notes: null,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]:
        name === "seatingCapacity" ? Number(value) : value,
    });
  };

  const handleSubmit = async () => {
    try {
      await createTable(form);
      onCreated();
      onHide();
    } catch (error) {
      console.error("Lỗi khi tạo bàn", error);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Thêm bàn mới</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Mã bàn</Form.Label>
            <Form.Control
              name="tableCode"
              value={form.tableCode}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Số chỗ ngồi</Form.Label>
            <Form.Control
              type="number"
              name="seatingCapacity"
              value={form.seatingCapacity}
              onChange={handleChange}
            />
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
              name="notes"
              value={form.notes ?? ""}
              onChange={(e) =>
                setForm({ ...form, notes: e.target.value })
              }
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Hủy
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Lưu
        </Button>
      </Modal.Footer>
    </Modal>
  );
}