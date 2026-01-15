import React from 'react';
import type { DishResponse } from '../../props/Dish';

interface DishCardProps {
  dish: DishResponse;
  onEdit: (dish: DishResponse) => void;
  onDelete: (id: number) => void;
  onToggleActive: (id: number, isActive: boolean) => void;
}

export const DishCard: React.FC<DishCardProps> = ({ dish, onEdit, onDelete, onToggleActive }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  return (
    <div className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100">
      <div className="relative overflow-hidden">
        {dish.imageUrl && (
          <img
            src={dish.imageUrl}
            alt={dish.name}
            className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
          />
        )}
        {!dish.imageUrl && (
          <div className="w-full h-56 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
            <svg className="w-20 h-20 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          {dish.isVegetarian && (
            <span className="bg-green-500/90 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full font-medium shadow-lg">
              🥬 Chay
            </span>
          )}
          {dish.isVegan && (
            <span className="bg-green-600/90 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full font-medium shadow-lg">
              🌱 Vegan
            </span>
          )}
          {dish.isSpicy && (
            <span className="bg-red-500/90 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full font-medium shadow-lg">
              🌶️ Cay
            </span>
          )}
        </div>
        <div className="absolute top-3 left-3">
          <span className={`px-3 py-1.5 rounded-full text-xs font-medium shadow-lg backdrop-blur-sm ${
            dish.active 
              ? 'bg-emerald-500/90 text-white' 
              : 'bg-gray-500/90 text-white'
          }`}>
            {dish.active ? '✓ Hoạt động' : '⊘ Ngưng'}
          </span>
        </div>
      </div>

      <div className="p-5 space-y-3">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-xl text-gray-800 line-clamp-1 group-hover:text-blue-600 transition-colors">
            {dish.name}
          </h3>
        </div>

        <p className="text-sm font-medium text-blue-600 mb-2">
          📁 {dish.categoryName}
        </p>

        <p className="text-sm text-gray-600 line-clamp-2 min-h-[2.5rem]">
          {dish.description || 'Chưa có mô tả'}
        </p>

        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {formatPrice(dish.price)}
          </span>
          <span className="text-sm text-gray-500 flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {dish.preparationTime} phút
          </span>
        </div>

        {dish.allergens && dish.allergens.length > 0 && (
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-2.5">
            <p className="text-xs text-orange-700 font-medium">
              ⚠️ Dị ứng: {dish.allergens.map(a => a.name).join(', ')}
            </p>
          </div>
        )}

        {dish.ingredients && dish.ingredients.length > 0 && (
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            {dish.ingredients.length} nguyên liệu
          </div>
        )}

        <div className="grid grid-cols-3 gap-2 pt-3">
          <button
            onClick={() => onEdit(dish)}
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2.5 rounded-lg
              transition-all duration-200 text-sm font-medium shadow-lg shadow-blue-500/30
              hover:shadow-xl hover:shadow-blue-500/40 hover:-translate-y-0.5
              flex items-center justify-center gap-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Sửa
          </button>

          <button
            onClick={() => onToggleActive(dish.id, dish.active)}
            className={`flex-1 px-3 py-2.5 rounded-lg text-sm font-medium shadow-lg
              transition-all duration-200 hover:-translate-y-0.5
              flex items-center justify-center gap-1 ${
              dish.active 
                ? 'bg-yellow-500 hover:bg-yellow-600 text-white shadow-yellow-500/30 hover:shadow-xl hover:shadow-yellow-500/40' 
                : 'bg-green-500 hover:bg-green-600 text-white shadow-green-500/30 hover:shadow-xl hover:shadow-green-500/40'
            }`}
          >
            {dish.active ? (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                </svg>
                Tắt
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Bật
              </>
            )}
          </button>

          <button
            onClick={() => onDelete(dish.id)}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white px-3 py-2.5 rounded-lg
              transition-all duration-200 text-sm font-medium shadow-lg shadow-red-500/30
              hover:shadow-xl hover:shadow-red-500/40 hover:-translate-y-0.5
              flex items-center justify-center gap-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Xóa
          </button>
        </div>
      </div>
    </div>
  );
};

