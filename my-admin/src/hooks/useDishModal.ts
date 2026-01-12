import { useState } from 'react';
import type { DishResponse } from '../props/Dish';

export const useDishModal = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedDish, setSelectedDish] = useState<DishResponse | null>(null);

  const openCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const closeCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  const openUpdateModal = (dish: DishResponse) => {
    setSelectedDish(dish);
    setIsUpdateModalOpen(true);
  };

  const closeUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setSelectedDish(null);
  };

  return {
    isCreateModalOpen,
    isUpdateModalOpen,
    selectedDish,
    openCreateModal,
    closeCreateModal,
    openUpdateModal,
    closeUpdateModal,
  };
};

