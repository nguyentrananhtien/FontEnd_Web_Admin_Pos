import React, { useState } from 'react';
import { ImageUpload } from './ImageUpload';
import { useCategories, useIngredients, useAllergens } from '../../hooks/useDishes';
import type { DishRequest, Category, Ingredient, Allergen } from '../../props/Dish';

interface CreateDishModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (dish: DishRequest) => Promise<void>;
}

export const CreateDishModal: React.FC<CreateDishModalProps> = ({ isOpen, onClose, onCreate }) => {
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

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const dishData: DishRequest = {
        ...formData,
        allergens: selectedAllergens.map(id => ({ id })),
        ingredients: selectedIngredients,
      };

      await onCreate(dishData);
      handleClose();
    } catch (error) {
      console.error('Error creating dish:', error);
      alert('Lỗi khi tạo món ăn!');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
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
    setSelectedIngredients([]);
    setSelectedAllergens([]);
    onClose();
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
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl my-8 animate-in fade-in duration-200">
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-4 rounded-t-2xl">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Thêm món ăn mới
            </h2>
            <button
              onClick={handleClose}
              className="text-white hover:bg-white/20 rounded-lg p-2 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 max-h-[calc(90vh-100px)] overflow-y-auto">
          <div className="space-y-6">
          <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Thông tin cơ bản
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tên món ăn <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg
                    focus:ring-2 focus:ring-blue-500 focus:border-transparent
                    placeholder-gray-400 transition-all duration-200"
                  placeholder="Nhập tên món ăn..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Danh mục <span className="text-red-500">*</span>
                </label>
                <select
                  required
                  value={formData.categoryId}
                  onChange={(e) => setFormData({ ...formData, categoryId: Number(e.target.value) })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg
                    focus:ring-2 focus:ring-blue-500 focus:border-transparent
                    transition-all duration-200"
                >
                  <option value={0}>Chọn danh mục</option>
                  {categories.map((cat: Category) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mô tả món ăn
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg
                  focus:ring-2 focus:ring-blue-500 focus:border-transparent
                  placeholder-gray-400 transition-all duration-200 resize-none"
                placeholder="Mô tả ngắn gọn về món ăn..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Giá (VNĐ) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    required
                    min={0}
                    step={1000}
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg
                      focus:ring-2 focus:ring-blue-500 focus:border-transparent
                      transition-all duration-200"
                    placeholder="0"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">đ</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Thời gian chuẩn bị (phút) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    required
                    min={0}
                    value={formData.preparationTime}
                    onChange={(e) => setFormData({ ...formData, preparationTime: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg
                      focus:ring-2 focus:ring-blue-500 focus:border-transparent
                      dark:bg-gray-700 dark:text-white
                      transition-all duration-200"
                    placeholder="0"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">phút</span>
                </div>
              </div>
            </div>
          </div>

          {/* Image Upload */}
          <ImageUpload
            currentImage={formData.imageUrl}
            onImageChange={(base64) => setFormData({ ...formData, imageUrl: base64 })}
          />

          {/* Properties Section */}
          <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-5 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              Thuộc tính
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <label className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <input
                  type="checkbox"
                  checked={formData.isVegetarian}
                  onChange={(e) => setFormData({ ...formData, isVegetarian: e.target.checked })}
                  className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">🥬 Món chay</span>
              </label>

              <label className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <input
                  type="checkbox"
                  checked={formData.isVegan}
                  onChange={(e) => setFormData({ ...formData, isVegan: e.target.checked })}
                  className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">🌱 Vegan</span>
              </label>

              <label className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <input
                  type="checkbox"
                  checked={formData.isSpicy}
                  onChange={(e) => setFormData({ ...formData, isSpicy: e.target.checked })}
                  className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">🌶️ Món cay</span>
              </label>

              <label className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <input
                  type="checkbox"
                  checked={formData.active}
                  onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                  className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">✅ Hoạt động</span>
              </label>
            </div>
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
          <div className="flex justify-end gap-3 pt-6 border-t border-gray-200 dark:border-gray-700">
            <button
              type="button"
              onClick={handleClose}
              className="px-6 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg
                hover:bg-gray-50 dark:hover:bg-gray-700
                text-gray-700 dark:text-gray-300 font-medium
                transition-all duration-200 flex items-center gap-2"
              disabled={loading}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Hủy
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg
                hover:from-blue-700 hover:to-blue-600
                disabled:opacity-50 disabled:cursor-not-allowed
                font-medium shadow-lg shadow-blue-500/50
                transition-all duration-200 flex items-center gap-2"
              disabled={loading}
            >
              {loading ? (
                <>
                  <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Đang tạo...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Tạo món ăn
                </>
              )}
            </button>
          </div>
          </div>
        </form>
      </div>
    </div>
  );
};

