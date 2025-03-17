import { Sun, Moon } from 'lucide-react';
import useTheme from "../../hooks/useTheme";

const ThemeToggle = () => {
  const { isDarkMode, toggle } = useTheme();

  return (
    <button
      onClick={toggle}
      className="p-2 text-text dark:text-text-dark rounded-full cursor-pointer transition duration-300 hover:scale-110 hover:rotate-12"
    >
      {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
    </button>
  );
};

export default ThemeToggle;