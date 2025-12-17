import { useEffect, useMemo, useState } from "react";
import { getAllTables } from "../api/DiningTables.service";
import type { DiningTableResponse } from "../props/DiningTables";

export const useTables = () => {
  const [tables, setTables] = useState<DiningTableResponse[]>([]);
  const [filterArea, setFilterArea] = useState("");

  const fetchTables = async () => {
    const data = await getAllTables();
    setTables(data);
  };

  useEffect(() => {
    fetchTables();
  }, []);

  const filteredTables = useMemo(() => {
    return filterArea ? tables.filter((t) => t.area === filterArea) : tables;
  }, [tables, filterArea]);

  const uniqueAreas = useMemo(() => {
    return Array.from(new Set(tables.map((t) => t.area)));
  }, [tables]);

  return {
    tables: filteredTables,
    uniqueAreas,
    filterArea,
    setFilterArea,
    reload: fetchTables,
  };
}