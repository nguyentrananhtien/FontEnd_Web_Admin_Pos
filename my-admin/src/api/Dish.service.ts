import axios from "axios";
import type {
  DishResponse,
  DishRequest,
  Category,
  CategoryRequest,
  Ingredient,
  IngredientRequest,
  Allergen,
  AllergenRequest
} from "../props/Dish";

const BASE_API_URL = 'http://localhost:8080/api/admin';

// Dish APIs
export const getAllDishes = async (): Promise<DishResponse[]> => {
  const res = await axios.get(`${BASE_API_URL}/dishes`);
  return res.data.data;
};

export const getActiveDishes = async (): Promise<DishResponse[]> => {
  const res = await axios.get(`${BASE_API_URL}/dishes/active`);
  return res.data.data;
};

export const getDishById = async (id: number): Promise<DishResponse> => {
  const res = await axios.get(`${BASE_API_URL}/dishes/${id}`);
  return res.data.data;
};

export const searchDishesByName = async (name: string): Promise<DishResponse[]> => {
  const res = await axios.get(`${BASE_API_URL}/dishes/search`, {
    params: { name }
  });
  return res.data.data;
};

export const getDishesByCategory = async (categoryId: number): Promise<DishResponse[]> => {
  const res = await axios.get(`${BASE_API_URL}/dishes/category/${categoryId}`);
  return res.data.data;
};

export const createDish = async (payload: DishRequest): Promise<void> => {
  await axios.post(`${BASE_API_URL}/dishes`, payload);
};

export const updateDish = async (id: number, payload: DishRequest): Promise<void> => {
  await axios.put(`${BASE_API_URL}/dishes/${id}`, payload);
};

export const deleteDish = async (id: number): Promise<void> => {
  await axios.delete(`${BASE_API_URL}/dishes/${id}`);
};

export const activateDish = async (id: number): Promise<void> => {
  await axios.patch(`${BASE_API_URL}/dishes/${id}/activate`);
};

export const deactivateDish = async (id: number): Promise<void> => {
  await axios.patch(`${BASE_API_URL}/dishes/${id}/deactivate`);
};

// Category APIs
export const getAllCategories = async (): Promise<Category[]> => {
  const res = await axios.get(`${BASE_API_URL}/categories`);
  return res.data.data;
};

export const createCategory = async (payload: CategoryRequest): Promise<void> => {
  await axios.post(`${BASE_API_URL}/categories`, payload);
};

export const updateCategory = async (id: number, payload: CategoryRequest): Promise<void> => {
  await axios.put(`${BASE_API_URL}/categories/${id}`, payload);
};

export const deleteCategory = async (id: number): Promise<void> => {
  await axios.delete(`${BASE_API_URL}/categories/${id}`);
};

// Ingredient APIs
export const getAllIngredients = async (): Promise<Ingredient[]> => {
  const res = await axios.get(`${BASE_API_URL}/ingredients`);
  return res.data.data;
};

export const createIngredient = async (payload: IngredientRequest): Promise<void> => {
  await axios.post(`${BASE_API_URL}/ingredients`, payload);
};

export const updateIngredient = async (id: number, payload: IngredientRequest): Promise<void> => {
  await axios.put(`${BASE_API_URL}/ingredients/${id}`, payload);
};

export const deleteIngredient = async (id: number): Promise<void> => {
  await axios.delete(`${BASE_API_URL}/ingredients/${id}`);
};

// Allergen APIs
export const getAllAllergens = async (): Promise<Allergen[]> => {
  const res = await axios.get(`${BASE_API_URL}/allergens`);
  return res.data.data;
};

export const createAllergen = async (payload: AllergenRequest): Promise<void> => {
  await axios.post(`${BASE_API_URL}/allergens`, payload);
};

export const updateAllergen = async (id: number, payload: AllergenRequest): Promise<void> => {
  await axios.put(`${BASE_API_URL}/allergens/${id}`, payload);
};

export const deleteAllergen = async (id: number): Promise<void> => {
  await axios.delete(`${BASE_API_URL}/allergens/${id}`);
};

