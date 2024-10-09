"use client"
import Image from 'next/image'
import React, { useState } from 'react'
import CustomButton from './CustomButton'
import CarDetails from './CarDetails'
import { CarSpecProps } from '@/types'


interface CarCardProps {
    car: CarSpecProps,
    buttonTitle: string,
    showBookingForm: boolean
    detailsOpen: boolean
    bookingSchedule?: Date | null
}



const CarCard = ({ car, buttonTitle, showBookingForm,detailsOpen, bookingSchedule }: CarCardProps) => {
    const [isOpen, setIsOpen] = useState(false) 


    const {Drive, FuelType, Make, Model, Transmission, images } = car;

    const popUp = (carId: string) => {
        console.log('you no go show ke?')
        setIsOpen(true)
    }

    

    const carImage = images && images.length > 0 ? images[0] : '/hero.png';
    
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
            <Image src={carImage}
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
                        {Transmission === 'Automatic' ? 'Automatic'
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
                    title={buttonTitle}
                    containerStyles='w-full py-[16px]
                    rounded-full bg-primary-blue'
                    textStyles="text-white text-[14px] leading-[17px]
                    font-bold"
                    btnType='button'
                    rightIcon="/right-arrow.svg"
                    handleClick={() => popUp('carId')}
                    />
            </div>
        </div>
       
           {
            detailsOpen && (
                <CarDetails isOpen={isOpen}
                closeModal={() => setIsOpen(false)}
                showBookingForm={showBookingForm}
                car={car}
                bookingSchedule={bookingSchedule}
                /> 
            )
           }
       
      </div>
  )
}

export default CarCard