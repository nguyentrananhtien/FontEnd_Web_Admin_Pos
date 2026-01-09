export interface Allergen {
  id: number;
  name: string;
  description: string;
}

export interface Ingredient {
  id: number;
  name: string;
  unit: string;
  currentStock: number;
  minimumStock: number;
}

export interface DishIngredient {
  ingredientId: number;
  ingredientName: string;
  quantity: number;
  unit?: string;
}

export interface DishAllergen {
  id: number;
  name: string;
  description?: string;
}

export interface Category {
  id: number;
  name: string;
  description: string;
  active: boolean;
}

export interface DishResponse {
  id: number;
  categoryId: number;
  categoryName: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  isVegetarian: boolean;
  isVegan: boolean;
  isSpicy: boolean;
  preparationTime: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  allergens: DishAllergen[];
  ingredients: DishIngredient[];
}

export interface DishRequest {
  categoryId: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  isVegetarian: boolean;
  isVegan: boolean;
  isSpicy: boolean;
  preparationTime: number;
  active: boolean;
  allergens: { id: number }[];
  ingredients: { ingredientId: number; quantity: number }[];
}

export interface CategoryRequest {
  name: string;
  description: string;
  active: boolean;
}

export interface IngredientRequest {
  name: string;
  unit: string;
  currentStock: number;
  minimumStock: number;
}

export interface AllergenRequest {
  name: string;
  description: string;
}

