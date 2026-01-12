import { useState, useEffect } from 'react';
import {
  getAllDishes,
  createDish,
  updateDish,
  deleteDish,
  activateDish,
  deactivateDish,
  getAllCategories,
  getAllIngredients,
  getAllAllergens
} from '../api/Dish.service';
import type { DishResponse, DishRequest, Category, Ingredient, Allergen } from '../props/Dish';

export const useDishes = () => {
  const [dishes, setDishes] = useState<DishResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDishes = async () => {
    try {
      setLoading(true);
      const data = await getAllDishes();
      setDishes(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch dishes');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDishes();
  }, []);

  const handleCreateDish = async (payload: DishRequest) => {
    await createDish(payload);
    await fetchDishes();
  };

  const handleUpdateDish = async (id: number, payload: DishRequest) => {
    await updateDish(id, payload);
    await fetchDishes();
  };

  const handleDeleteDish = async (id: number) => {
    await deleteDish(id);
    await fetchDishes();
  };

  const handleActivateDish = async (id: number) => {
    await activateDish(id);
    await fetchDishes();
  };

  const handleDeactivateDish = async (id: number) => {
    await deactivateDish(id);
    await fetchDishes();
  };

  return {
    dishes,
    loading,
    error,
    refreshDishes: fetchDishes,
    createDish: handleCreateDish,
    updateDish: handleUpdateDish,
    deleteDish: handleDeleteDish,
    activateDish: handleActivateDish,
    deactivateDish: handleDeactivateDish,
  };
};

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const data = await getAllCategories();
        setCategories(data);
      } catch (err) {
        console.error('Failed to fetch categories', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading };
};

export const useIngredients = () => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchIngredients = async () => {
    try {
      setLoading(true);
      const data = await getAllIngredients();
      setIngredients(data);
    } catch (err) {
      console.error('Failed to fetch ingredients', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIngredients();
  }, []);

  return { ingredients, loading, refreshIngredients: fetchIngredients };
};

export const useAllergens = () => {
  const [allergens, setAllergens] = useState<Allergen[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAllergens = async () => {
    try {
      setLoading(true);
      const data = await getAllAllergens();
      setAllergens(data);
    } catch (err) {
      console.error('Failed to fetch allergens', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllergens();
  }, []);

  return { allergens, loading, refreshAllergens: fetchAllergens };
};

