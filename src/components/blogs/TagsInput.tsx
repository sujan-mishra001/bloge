interface TagsInputProps {
  tags: string[];
  onTagsChange: (tags: string[]) => void;
}

const TagsInput: React.FC<TagsInputProps> = ({ tags, onTagsChange }) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && event.currentTarget.value.trim()) {
      const newTag = event.currentTarget.value.trim();
      if (!tags.includes(newTag)) {
        onTagsChange([...tags, newTag]);
        event.currentTarget.value = "";
      }
    }
  };

  const removeTag = (indexToRemove: number) => {
    onTagsChange(tags.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-50">
        Tags
      </label>
      <input
        type="text"
        onKeyDown={handleKeyDown}
        className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 
                 focus:ring-blue-500 focus:border-blue-500 dark:focus:border-gray-100 dark:focus:ring-gray-100
                 dark:bg-gray-800 dark:text-gray-50 dark:border-gray-600"
        placeholder="Type a tag and press Enter"
      />

      <div className="flex flex-wrap gap-2">
        {tags?.map((tag, index) => (
          <span
            key={index}
            className="inline-flex items-center px-3 py-1 rounded-full 
                     text-sm font-medium bg-emerald-50 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-200"
          >
            {tag}
            <button
              onClick={() => removeTag(index)}
              className="ml-2 focus:outline-none dark:text-emerald-200"
            >
              ×
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};

export { TagsInput };
