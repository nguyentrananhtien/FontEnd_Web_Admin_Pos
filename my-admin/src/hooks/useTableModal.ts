import React, { useState } from "react";
import type { DiningTableResponse } from "../props/DiningTables";
import { deleteTable, updateTable } from "../api/DiningTables.service";

export const useTableModal = (
  table: DiningTableResponse,
  onSuccess: () => void,
) => {
  const [form, setForm] = useState({
    tableCode: table.tableCode,
    seatingCapacity: table.seatingCapacity,
    area: table.area,
    status: table.status,
    notes: table.notes,
  });

  const handleChange = (e: React.ChangeEvent<any>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () =>{
    await updateTable(table.tableId, form);
    onSuccess();
  };

  const handleDelete = async () => {
    if(!window.confirm("Bạn có chắc muốn xóa bàn này không ?")) return;
    await deleteTable(table.tableId);
    onSuccess();
  };

  return {
    form,
    handleChange,
    handleDelete,
    handleUpdate,
  }
};