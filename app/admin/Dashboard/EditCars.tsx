import CarCard from '@/components/CarCard';
import { CarSpecProps } from '@/types';
import fetchCars, { deleteCars } from '@/utils/firebase';
import React, { MouseEventHandler, useEffect, useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface EditCarProps {
  initialLimit: number;
  make: string,
  model: string,
  year: number,
  fuel: string,
  onEdit: (car: CarSpecProps) => void;
}


const EditCars = (
  { 
  initialLimit = 10, 
  make='', 
  model='', 
  year=2022,
  fuel='',
  onEdit,
 }: EditCarProps,
) => {
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
          fuel: fuel});

        const cars = response.cars;
        console.log(response, 'res', cars, 'the cars')

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
                       <div>
                         <CarCard
                          buttonTitle='More'
                          car={car}
                          key={index}
                          detailsOpen={false}
                          showBookingForm={false}
                          />
                            <div className='flex justify-between items-center px-4'>
                             <div onClick={() => onEdit(car)}> <EditIcon color='primary' /> </div>
                             <div  onClick={() => deleteCars(car.id, car.ImagePath ?? '', setAllCars)}> <DeleteIcon color='primary' /> </div>
                            </div>
                       </div>
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