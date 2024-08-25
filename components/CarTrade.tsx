import { manufacturers } from '@/constants';
import { CarSpecProps } from '@/types';
import fetchCars from '@/utils/firebase';
import React, { useEffect, useState } from 'react';
import CarCard from './CarCard';


interface CarTradeProps {
  initialLimit: number;
  make: string,
  model: string,
  year: number,
  fuel: string,
}

const CarTrade = ({ 
  initialLimit = 5, 
  make='', 
  model='', 
  year=2022,
  fuel='' }: CarTradeProps) => {
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
          fuel: fuel
        });

        const cars = response.cars;
        console.log(response, 'res')

        setAllCars(cars);
        const isEmpty = !Array.isArray(cars) || cars.length < 1 || !cars;
        if(isEmpty){
            setIsDataEmpty(true)
        }
        console.log(isEmpty, isDataEmpty, 'why you go empty?')
      } catch (error) {
        console.log('Error fetching cars:', error); 
      }
    };
    getCars(); 
  }, [initialLimit]);
  console.log(allCars, 'cars');

  return (
    <div className="mt-12 padding-y padding-x max-width">
      {!isDataEmpty ? (
        <section>
          <div className="home__cars-wrapper">
            {allCars?.map((car, index) => (
              <CarCard 
                car={car} 
                key={index}
                buttonTitle='More Details'
                showBookingForm ={false}
                detailsOpen={true}
                />
            ))}
          </div>
        </section>
      ) : (
        <div className="home__error-container">
          <h2 className="text-black text-xl font-bold">Oops, no result</h2>
          <p>Nothing to show</p>
        </div>
      )}
    </div>
  );
};

export default CarTrade;
