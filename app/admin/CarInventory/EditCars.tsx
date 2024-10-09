import React, { useEffect, useState } from 'react';
import CarCard from '@/components/CarCard';
import { CarSpecProps } from '@/types';
import fetchCars, { deleteCars } from '@/utils/firebase';
import { getBookings } from '@/utils/firebase'; // Import your Firebase function here
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
  const [bookings, setBookings] = useState<{ [key: string]: string | null }>({});

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

        // Fetch booking details for each car
        if (cars && cars.length > 0) {
          const bookingsData: { [key: string]: string | null } = {};
          for (const car of cars) {
            const bookingDate = await getBookings(car.id!);
            bookingsData[car.id!] = bookingDate;
          }
          setBookings(bookingsData);
        }
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
              const bookingDate = bookings[car.id!];
              return (
                <div
                  key={index}
                  className={`relative ${bookingDate ? 'bg-white bg-opacity-70' : ''}`}
                >
                  {bookingDate && (
                    <h1 className="absolute top-[30%] left-[10%] flex justify-center items-center text-red-500 text-lg font-bold z-20">
                      Test Drive Booked
                    </h1>
                  )}
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
                    {bookingDate && (
                      <div className="text-gray-700">
                        <p>{`Booked for: ${new Date(bookingDate).toLocaleDateString()}`}</p>
                      </div>
                    )}
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
