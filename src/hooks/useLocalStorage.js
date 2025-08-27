import { useState, useEffect } from 'react';

function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(initialValue);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item !== null && item !== 'undefined' && item !== 'null') {
        const parsed = JSON.parse(item);
        setStoredValue(parsed);
      }
    } catch (error) {
      console.error('Error reading from localStorage:', error);
    } finally {
      setIsLoaded(true);
    }
  }, [key]);

  useEffect(() => {
    if (isLoaded) {
      try {
        window.localStorage.setItem(key, JSON.stringify(storedValue));
      } catch (error) {
        console.error('Error saving to localStorage:', error);
      }
    }
  }, [key, storedValue, isLoaded]);

  return [storedValue, setStoredValue];
}

export default useLocalStorage;