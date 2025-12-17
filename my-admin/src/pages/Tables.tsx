import { Plus } from "lucide-react";
import { Col, Form, Row } from "react-bootstrap";
import { useTables } from "../hooks/useTables";
import { TableCard } from "../components/ui/TableCard";
import { useState } from "react";
import { CreateTableModal } from "../components/ui/CreateTableModal";

export default function Tables() {
  const { tables, uniqueAreas, filterArea, setFilterArea, reload } = useTables();
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="p-3">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="mb-0 fw-bold">Quản lý sản phẩm</h3>
        <button
          className="btn btn-primary ms-auto d-flex align-items-center gap-2"
          onClick={() => setShowModal(true)}>
          <Plus size={20} /> Thêm bàn mới
        </button>
      </div>

      {/* Phần lọc bàn theo khu vực */}
      <Form.Group className="mb-4" controlId="filterArea">
        <Form.Select
          value={filterArea}
          onChange={(e) => setFilterArea(e.target.value)}
        >
          <option value="">Tất cả</option>
          {uniqueAreas.map((area) => (
            <option key={area} value={area}>
              {area}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      {/* Hiển thị danh sách bàn */}
      <Row xs={1} sm={2} md={3} className="g-4">
        {tables.map((t) => (
          <Col key={t.tableId}>
            <TableCard table={t} onReload={reload}/>
          </Col>
        ))}
      </Row>

      {/* Form khi nhấn thêm bàn mới */}
      <CreateTableModal
        show={showModal}
        onHide={() => setShowModal(false)}
        onCreated={reload}
      />
    </div>
  );
}