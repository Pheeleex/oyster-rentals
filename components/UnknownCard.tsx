'use client'
import React, { useState } from 'react'
import CarDetails from './CarDetails'
import Image from 'next/image'
import CustomButton from './CustomButton'


interface CarCardProps {
    buttonTitle: string,
    showBookingForm: boolean
    detailsOpen: boolean
    bookingSchedule?: Date | null
}


const UnknownCard = ({ buttonTitle, showBookingForm,detailsOpen }: CarCardProps) => {
    const [isOpen, setIsOpen] = useState(false) 


    const popUp = (carId: string) => {
        console.log('you no go show ke?')
        setIsOpen(true)
    }
  return (
    <div className="car-card group">
    <div className="car-card__content">
      <h2 className="car-card__content-title">
            Car Name
      </h2>
    </div>
      

      <div className='relative w-full h-40 my-3 object-contain'>
          <Image src='/unknown.png'
                  alt={`car`}
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
                     Automatic/Manual
                  </p>
              </div>
              <div className='flex flex-col justify-center
                  items-center gap-2'>
                  <Image src="/tire.svg" width={20}
                  height={20} alt='steering wheel' />
                  <p className='text -[14px]'>
                      Drive?
                  </p>
              </div>
              <div className='flex flex-col justify-center
                  items-center gap-2'>
                  <Image src="/gas.svg" width={20}
                  height={20} alt='steering wheel' />
                  <p className='text -[14px]'>
                      Gas/Electric 
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
              showBookingForm={false}
              /> 
          )
         }
     
    </div>
  )
}

export default UnknownCard