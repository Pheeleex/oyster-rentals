// SaveCarsToLocalStorage.tsx
'use client';

import { useEffect } from 'react';

interface SaveCarsToLocalStorageProps {
  cars: any[];
}

const SaveCarsToLocalStorage: React.FC<SaveCarsToLocalStorageProps> = ({ cars }) => {
  useEffect(() => {
    if (cars && cars.length > 0) {
      localStorage.setItem('fetchedCars', JSON.stringify(cars));
    }
  }, [cars]);

  return null; // No UI needed for this component
};

export default SaveCarsToLocalStorage;
