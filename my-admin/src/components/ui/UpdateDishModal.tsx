import React, { useState, useEffect } from 'react';
import { ImageUpload } from './ImageUpload';
import { useCategories, useIngredients, useAllergens } from '../../hooks/useDishes';
import type { DishRequest, DishResponse, Category, Ingredient, Allergen } from '../../props/Dish';

interface UpdateDishModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (id: number, dish: DishRequest) => Promise<void>;
  dish: DishResponse | null;
}

export const UpdateDishModal: React.FC<UpdateDishModalProps> = ({ isOpen, onClose, onUpdate, dish }) => {
  const { categories } = useCategories();
  const { ingredients } = useIngredients();
  const { allergens } = useAllergens();

  const [formData, setFormData] = useState({
    categoryId: 0,
    name: '',
    description: '',
    price: 0,
    imageUrl: '',
    isVegetarian: false,
    isVegan: false,
    isSpicy: false,
    preparationTime: 0,
    active: true,
  });

  const [selectedIngredients, setSelectedIngredients] = useState<{ ingredientId: number; quantity: number }[]>([]);
  const [selectedAllergens, setSelectedAllergens] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (dish) {
      setFormData({
        categoryId: dish.categoryId,
        name: dish.name,
        description: dish.description,
        price: dish.price,
        imageUrl: dish.imageUrl,
        isVegetarian: dish.isVegetarian,
        isVegan: dish.isVegan,
        isSpicy: dish.isSpicy,
        preparationTime: dish.preparationTime,
        active: dish.active,
      });

      setSelectedIngredients(
        dish.ingredients.map(i => ({
          ingredientId: i.ingredientId,
          quantity: i.quantity,
        }))
      );

      setSelectedAllergens(dish.allergens.map(a => a.id));
    }
  }, [dish]);

  if (!isOpen || !dish) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const dishData: DishRequest = {
        ...formData,
        allergens: selectedAllergens.map(id => ({ id })),
        ingredients: selectedIngredients,
      };

      await onUpdate(dish.id, dishData);
      onClose();
    } catch (error) {
      console.error('Error updating dish:', error);
      alert('Lỗi khi cập nhật món ăn!');
    } finally {
      setLoading(false);
    }
  };

  const handleIngredientToggle = (ingredientId: number) => {
    const exists = selectedIngredients.find(i => i.ingredientId === ingredientId);
    if (exists) {
      setSelectedIngredients(selectedIngredients.filter(i => i.ingredientId !== ingredientId));
    } else {
      setSelectedIngredients([...selectedIngredients, { ingredientId, quantity: 1 }]);
    }
  };

  const handleIngredientQuantityChange = (ingredientId: number, quantity: number) => {
    setSelectedIngredients(
      selectedIngredients.map(i =>
        i.ingredientId === ingredientId ? { ...i, quantity } : i
      )
    );
  };

  const handleAllergenToggle = (allergenId: number) => {
    if (selectedAllergens.includes(allergenId)) {
      setSelectedAllergens(selectedAllergens.filter(id => id !== allergenId));
    } else {
      setSelectedAllergens([...selectedAllergens, allergenId]);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-4xl my-8 max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Cập nhật món ăn</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Basic Information */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Tên món ăn *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Danh mục *
              </label>
              <select
                required
                value={formData.categoryId}
                onChange={(e) => setFormData({ ...formData, categoryId: Number(e.target.value) })}
                className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white"
              >
                <option value={0}>Chọn danh mục</option>
                {categories.map((cat: Category) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Mô tả
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Giá (VNĐ) *
              </label>
              <input
                type="number"
                required
                min={0}
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Thời gian chuẩn bị (phút) *
              </label>
              <input
                type="number"
                required
                min={0}
                value={formData.preparationTime}
                onChange={(e) => setFormData({ ...formData, preparationTime: Number(e.target.value) })}
                className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>

          {/* Image Upload */}
          <ImageUpload
            currentImage={formData.imageUrl}
            onImageChange={(base64) => setFormData({ ...formData, imageUrl: base64 })}
          />

          {/* Checkboxes */}
          <div className="flex gap-6">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.isVegetarian}
                onChange={(e) => setFormData({ ...formData, isVegetarian: e.target.checked })}
                className="rounded"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">Món chay</span>
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.isVegan}
                onChange={(e) => setFormData({ ...formData, isVegan: e.target.checked })}
                className="rounded"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">Vegan</span>
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.isSpicy}
                onChange={(e) => setFormData({ ...formData, isSpicy: e.target.checked })}
                className="rounded"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">Món cay</span>
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.active}
                onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                className="rounded"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">Hoạt động</span>
            </label>
          </div>

          {/* Allergens */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Chất dị ứng
            </label>
            <div className="grid grid-cols-3 gap-2">
              {allergens.map((allergen: Allergen) => (
                <label key={allergen.id} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedAllergens.includes(allergen.id)}
                    onChange={() => handleAllergenToggle(allergen.id)}
                    className="rounded"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{allergen.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Ingredients */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Nguyên liệu
            </label>
            <div className="space-y-2 max-h-60 overflow-y-auto border rounded p-3">
              {ingredients.map((ingredient: Ingredient) => {
                const selected = selectedIngredients.find(i => i.ingredientId === ingredient.id);
                return (
                  <div key={ingredient.id} className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={!!selected}
                      onChange={() => handleIngredientToggle(ingredient.id)}
                      className="rounded"
                    />
                    <span className="text-sm flex-1 text-gray-700 dark:text-gray-300">
                      {ingredient.name} ({ingredient.unit})
                    </span>
                    {selected && (
                      <input
                        type="number"
                        min={0}
                        step={0.1}
                        value={selected.quantity}
                        onChange={(e) => handleIngredientQuantityChange(ingredient.id, Number(e.target.value))}
                        className="w-24 px-2 py-1 border rounded text-sm dark:bg-gray-700 dark:text-white"
                        placeholder="Số lượng"
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
              disabled={loading}
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? 'Đang cập nhật...' : 'Cập nhật'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

