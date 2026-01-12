import React, { useState } from 'react';

interface ImageUploadProps {
  currentImage?: string;
  onImageChange: (base64Image: string) => void;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ currentImage, onImageChange }) => {
  const [preview, setPreview] = useState<string>(currentImage || '');
  const [error, setError] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setError('Chỉ chấp nhận file ảnh: JPEG, PNG, GIF, WEBP');
      return;
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      setError('Kích thước file không được vượt quá 5MB');
      return;
    }

    setError('');
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64String = reader.result as string;
      setPreview(base64String);
      onImageChange(base64String);
    };

    reader.readAsDataURL(file);
  };

  const handleRemove = () => {
    setPreview('');
    onImageChange('');
    setError('');
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Hình ảnh món ăn
      </label>

      <div className="flex items-center gap-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100
            dark:file:bg-blue-900 dark:file:text-blue-300"
        />
        {preview && (
          <button
            type="button"
            onClick={handleRemove}
            className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
          >
            Xóa ảnh
          </button>
        )}
      </div>

      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}

      {preview && (
        <div className="mt-4">
          <img
            src={preview}
            alt="Preview"
            className="max-w-full h-64 object-cover rounded-lg shadow-md"
          />
        </div>
      )}

      <p className="text-xs text-gray-500">
        Chấp nhận: JPEG, PNG, GIF, WEBP. Tối đa 5MB.
      </p>
    </div>
  );
};

