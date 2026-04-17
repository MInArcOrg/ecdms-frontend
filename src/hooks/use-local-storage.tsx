import { useState, useEffect } from 'react';

// ----------------------------------------------------------------------

export default function useLocalStorage<ValueType>(key: string, defaultValue: ValueType) {
  const [value, setValue] = useState(() => {
    const storedValue = typeof window !== 'undefined' ? localStorage.getItem(key) : null;
    return storedValue === null ? defaultValue : JSON.parse(storedValue);
  });

  useEffect(() => {
    const listener = (e: StorageEvent) => {
      if (typeof window !== 'undefined' && e.storageArea === localStorage && e.key === key) {
        setValue(e.newValue ? JSON.parse(e.newValue) : e.newValue);
      }
    };
    window.addEventListener('storage', listener);

    const customListener = (e: Event) => {
      const detail = (e as CustomEvent<{ key: string; value: ValueType }>).detail;
      if (detail?.key === key) setValue(detail.value);
    };
    window.addEventListener('local-storage', customListener as EventListener);

    return () => {
      window.removeEventListener('storage', listener);
      window.removeEventListener('local-storage', customListener as EventListener);
    };
  }, [key, defaultValue]);

  const setValueInLocalStorage = (newValue: ValueType) => {
    setValue((currentValue: any) => {
      const result = typeof newValue === 'function' ? newValue(currentValue) : newValue;
      if (typeof window !== 'undefined') localStorage.setItem(key, JSON.stringify(result));
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('local-storage', { detail: { key, value: result } }));
      }
      return result;
    });
  };

  return [value, setValueInLocalStorage];
}
