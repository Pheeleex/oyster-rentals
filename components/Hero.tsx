'use client'
import React from 'react'
import Image from 'next/image'
import CustomButton from './CustomButton'

const Hero = () => {
 
  return (
    <div className='hero'>
        <div className='flex-1 pt-36 padding-x'>
            <h1 className='hero__title'>
                Find your car, book a test drive, make it yours - quickly and easily.
            </h1>
            <p className="hero__subtitle">
              Streamline your car purchase experience with our easy process and diverse options<br />
              Create an account with us to make custom car purchases
        </p>
            <CustomButton 
              title= "Explore Cars"
              btnType='button'
              containerStyles="bg-primary-blue text-white
              rounded-full mt-10"
            />
        </div>
        <div className="hero__image-container">
            <div className="hero__image">
              <Image src="/hero.png" alt="hero" fill 
                  className="object-contain" />
            </div>
            <div className="hero__image-overlay" />
        </div>
    </div>
  )
}

export default Hero