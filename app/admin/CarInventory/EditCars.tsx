import React, { useEffect, useState } from 'react';
import CarCard from '@/components/CarCard';
import { CarSpecProps } from '@/types';
import fetchCars, { deleteCars } from '@/utils/firebase';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface EditCarProps {
  initialLimit: number;
  make: string;
  model: string;
  year: number;
  fuel: string;
  onEdit: (car: CarSpecProps) => void;
}

const EditCars = ({
  initialLimit = 10,
  make = '',
  model = '',
  year = 2022,
  fuel = '',
  onEdit,
}: EditCarProps) => {
  const [allCars, setAllCars] = useState<CarSpecProps[]>([]);
  const [isDataEmpty, setIsDataEmpty] = useState(false);
 
  useEffect(() => {
    const getCars = async () => {
      try {
        const response = await fetchCars({
          manufacturer: make,
          model: model,
          limit: initialLimit,
          year: year,
          fuel: fuel,
        });

        const cars = response.cars;
        setAllCars(cars);
        const isEmpty = !Array.isArray(cars) || cars.length < 1 || !cars;
        setIsDataEmpty(isEmpty);

       
      } catch (error) {
        console.log('Error fetching cars:', error);
      }
    };
    getCars();
  }, [make, model, initialLimit, year, fuel]);

  return (
    <div>
      {!isDataEmpty ? (
        <section>
          <div className="home__cars-wrapper">
            {allCars?.map((car, index) => {
              return (
                <div
                  key={index}
                >
                  <CarCard
                    buttonTitle="More"
                    car={car}
                    key={index}
                    detailsOpen={false}
                    showBookingForm={false}
                  />
                  <div className="flex justify-between items-center px-4">
                    <div onClick={() => onEdit(car)}>
                      <EditIcon color="primary" />
                    </div>
                   
                    <div onClick={() => deleteCars(car.id!, car.ImagePath ?? '', setAllCars)}>
                      <DeleteIcon color="primary" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      ) : (
        <div className="home__error-container">
          <h2 className="text-black text-xl font-bold">Oops, no result</h2>
          <p>Nothing here.</p>
        </div>
      )}
    </div>
  );
};

export default EditCars;
