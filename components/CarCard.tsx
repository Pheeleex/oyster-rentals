"use client"

import { calculateCarRent } from '@/utils'
import Image from 'next/image'
import React, { useState } from 'react'
import CustomButton from './CustomButton'
import CarDetails from './CarDetails'
import { CarSpecProps } from '@/types'


interface CarCardProps {
    car: CarSpecProps
}

const CarCard = ({ car }: CarCardProps) => {
    const [isOpen, setIsOpen] = useState(false) 


    const {Drive, FuelType, Make, Model, Transmission } = car;

    
  return (
    <div className="car-card group">
      <div className="car-card__content">
        <h2 className="car-card__content-title">
          {Make} {Model}
        </h2>
      </div>
        <p className='flex mt-6 text-[32px] font-extrabold'>
            <span className='self-start text-[14px]
                font-semibold'>
               $
            </span>
           
            <span className='self-start text-[14px]
                font-semibold'>
               /day
            </span>
        </p>

        <div className='relative w-full h-40 my-3 object-contain'>
            <Image src="/hero.png"
                    alt={`car${Model}`}
                    fill priority className='object-contain' />
        </div>
        <div className='relative flex w-full mt-2'>
            <div className='flex group-hover:invisible
            w-full justify-between text-gray'>
                <div className='flex flex-col justify-center
                    items-center gap-2'>
                    <Image src="/steering-wheel.svg" width={20}
                    height={20} alt='steering wheel' />
                    <p className='text -[14px]'>
                        {Transmission === 'a' ? 'Automatic'
                        : 'Manual'}
                    </p>
                </div>
                <div className='flex flex-col justify-center
                    items-center gap-2'>
                    <Image src="/tire.svg" width={20}
                    height={20} alt='steering wheel' />
                    <p className='text -[14px]'>
                        {Drive.toUpperCase()}
                    </p>
                </div>
                <div className='flex flex-col justify-center
                    items-center gap-2'>
                    <Image src="/gas.svg" width={20}
                    height={20} alt='steering wheel' />
                    <p className='text -[14px]'>
                        {FuelType} 
                    </p>
                </div>
            </div>
            <div className='car-card__btn-container'>
                <CustomButton
                    title='Book now'
                    containerStyles='w-full py-[16px]
                    rounded-full bg-primary-blue'
                    textStyles="text-white text-[14px] leading-[17px]
                    font-bold"
                    btnType='button'
                    rightIcon="/right-arrow.svg"
                    handleClick={() =>setIsOpen(true)}
                    />
            </div>
        </div>
       
            <CarDetails isOpen={isOpen}
            closeModal={() => setIsOpen(false)}
            car={car} /> 
       
      </div>
  )
}

export default CarCard