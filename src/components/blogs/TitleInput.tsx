import React from 'react';

interface TitleInputProps {
  title: string;
  onTitleChange: (title: string) => void;
}

export const TitleInput: React.FC<TitleInputProps> = ({
  title,
  onTitleChange
}) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-50">Title</label>
      <input
        type="text"
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
        className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 
                 focus:ring-blue-500 focus:border-blue-500 dark:focus:border-gray-100 dark:focus:ring-gray-100
                 dark:bg-gray-800 dark:text-gray-50 dark:border-gray-600"
        placeholder="Enter the title of your post"
      />
    </div>
  );
};
