import CarCard from '@/components/CarCard';
import { CarSpecProps } from '@/types';
import React, { useEffect, useState } from 'react'

const EditCars = () => {
    const [allCars, setAllCars] = useState<CarSpecProps[]>([]);
  const [isDataEmpty, setIsDataEmpty] = useState(false);

  useEffect(() => {
    const getCars = async () => {
      try {
        const response = await fetchCars();

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
  }, []);
  console.log(allCars, 'cars');
  return (
    <div>
         {
            !isDataEmpty ? (
              <section>
                 <div className="home__cars-wrapper">
                    {
                      allCars?.map((car, index) => (
                        <CarCard car={car}
                          key={index} />
                      ))
                    }
                 </div>
                 
              </section>
            ) : (
              <div className="home__error-container">
                  <h2 className="text-back text-xl
                  font-bold">Oops, no result</h2>
                  <p>Nothing o</p>
              </div>
            )
          }
        </div>

  )
}

export default EditCars