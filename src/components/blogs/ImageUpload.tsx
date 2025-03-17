import { useState } from "react";
import { uploadImage } from "../../apis/imageApi";

interface ImageUploadProps {
  onImageUpload: (url: string) => void;
  label?: string;
  currentImage?: string;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  onImageUpload,
  label = "Upload Image",
  currentImage = "",
}) => {
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const validateFile = (file: File): string => {
    if (!file.type.startsWith('image/')) return 'Please upload an image file';
    if (file.size > 10 * 1024 * 1024) return 'Image size should be less than 10MB';
    return '';
  };

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file
    const errorMessage = validateFile(file);
    if (errorMessage) {
      setError(errorMessage);
      return;
    }

    setError("");
    setIsUploading(true);

    try {
      const uploadedImageUrl = await uploadImage(file);
      onImageUpload(uploadedImageUrl);
    } catch (error) {
      console.error("Error uploading image", error);
      setError('Failed to upload image. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-50">
        {label}
      </label>

      <div className="flex flex-col sm:flex-row gap-4 items-start">
        <div className="flex-1 w-full">
          <input
            type="file"
            onChange={handleImageUpload}
            accept="image/*"
            className="w-full p-2 border rounded-md text-sm
                     file:mr-4 file:py-2 file:px-4 file:rounded-md
                     file:border-0 file:text-sm file:font-medium
                     file:bg-blue-50 file:text-blue-700
                     hover:file:bg-blue-100"
            disabled={isUploading}
          />
          {error && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>
          )}
          {isUploading && (
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-50">Uploading...</p>
          )}
        </div>

        {currentImage && (
          <div className="w-full sm:w-48 h-48 relative">
            <img
              src={currentImage}
              alt="Preview"
              className="w-full h-full object-cover rounded-lg"
            />
            <button
              onClick={() => onImageUpload("")}
              className="absolute top-2 right-2 p-1 bg-red-600 text-green-600
                       rounded-full hover:bg-red-700 focus:outline-none"
            >
              ×
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
