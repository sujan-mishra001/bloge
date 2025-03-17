export const themeKey:string = "isDarkMode";

const saveToLocalStorage = (key: string, value: any): void => {
  localStorage.setItem(key, JSON.stringify(value));
};

const getFromLocalStorage = (key: string): any | null => {
  const storedValue = localStorage.getItem(key);
  return storedValue ? JSON.parse(storedValue) : null;
};

const clearLocalStorage = (key: string): void => {
  localStorage.removeItem(key);
};
const clearAllLocalStorage = (): void => {
  localStorage.clear();
};

export {
  saveToLocalStorage,
  getFromLocalStorage,
  clearLocalStorage,
  clearAllLocalStorage,
};
