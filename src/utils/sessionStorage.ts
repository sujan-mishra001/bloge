
export const tokenKey = "token";
export const userKey = "user";

const saveToSessionStorage = (key: string, value: any): void => {
  sessionStorage.setItem(key, JSON.stringify(value));
};

const getFromSessionStorage = (key: string): any | null => {
  const storedValue = sessionStorage.getItem(key);
  return storedValue ? JSON.parse(storedValue) : null;
};

const clearSessionStorage = (key: string): void => {
  sessionStorage.removeItem(key);
};

const clearAllSessionStorage = (): void => {
  sessionStorage.clear();
};

export const getToken = (): string | null => {
  return getFromSessionStorage(tokenKey);
};

export const getUser = ()=>{
  return getFromSessionStorage(userKey);
}



export {
  saveToSessionStorage,
  getFromSessionStorage,
  clearSessionStorage,
  clearAllSessionStorage,
};
