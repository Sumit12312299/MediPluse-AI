import { useState } from "react";
export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try { const item = window.localStorage.getItem(key); return item !== null ? JSON.parse(item) : initialValue; }
    catch { return initialValue; }
  });
  const setValue = (value) => {
    try {
      const v = typeof value === "function" ? value(storedValue) : value;
      setStoredValue(v);
      v == null ? window.localStorage.removeItem(key) : window.localStorage.setItem(key, JSON.stringify(v));
    } catch {}
  };
  return [storedValue, setValue];
};
export default useLocalStorage;
