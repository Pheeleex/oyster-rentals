import { CarProps, CarSpecProps } from '@/types';
import { generateCarImageUrl } from '@/utils';
import Image from 'next/image';
import React from 'react'

interface CarImagesProps {
    car?: CarSpecProps | CarProps | null;
    isCarSpecProps: (car?: CarSpecProps | CarProps) => car is CarSpecProps;
    isCarProps: (car?: CarSpecProps | CarProps) => car is CarProps;
}

const ImageGallery = ({car, isCarSpecProps, isCarProps}: CarImagesProps) => {
  return (
    <div className='flex-1 flex flex-col gap-3'>
    <div className='relative w-full h-40 bg-pattern bg-cover bg-center rounded-lg'>
        <Image 
            src={car && isCarSpecProps(car) && car.images ? 
                car.images[0] : 
                (isCarProps(car!) ? generateCarImageUrl(car) : '/hero.png')
            }
            alt="car"
            fill 
            priority 
            className='object-contain' 
        />
    </div>

    <div className='flex gap-3'>
        {Array.from({ length: 3 }, (_, index) => (
            <div key={index} className='flex-1 relative w-full h-24 bg-primary-blue-100 rounded-lg'>
                <Image 
                    src={car && isCarSpecProps(car) && car.images ? car.images[index + 1] : 
                        (isCarProps(car!) ? generateCarImageUrl(car) : '/hero.png')}
                    alt="car"
                    fill 
                    priority 
                    className='object-contain' 
                />
            </div>
        ))}
    </div>
</div>
  )
}

export default ImageGallery