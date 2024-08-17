'use client'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import React, { useEffect, useState } from 'react'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DateTimeRangePicker } from '@mui/x-date-pickers-pro';
import CustomButton from './CustomButton';
import dayjs, { Dayjs } from 'dayjs';


export interface BookingDetails {
    pickupDate: Dayjs | null;
  dropoffDate: Dayjs| null;
}

interface CarBookingFormProps {
    carId: string;  // Accepting carId as a prop
  }

const CarBookingForm: React.FC<CarBookingFormProps> = ({carId}) => {
    const [bookingDetails, setBookingDetails] = useState<BookingDetails>({
        pickupDate: null,
        dropoffDate: null,
      });
      const [bookedRanges, setBookedRanges] = useState<Array<[Dayjs, Dayjs]>>([]);
      useEffect(() => {
        // Retrieve booked dates from local storage
        const savedBookingDetails = localStorage.getItem('carBookingDetails');
        if (savedBookingDetails) {
            const parsedDetails = JSON.parse(savedBookingDetails);
            if (parsedDetails.carId === carId) {
                const pickupDate = dayjs(parsedDetails.pickupDate);
                const dropoffDate = dayjs(parsedDetails.dropoffDate);
                setBookedRanges([[pickupDate, dropoffDate]]);
            }
        }
    }, [carId]);

      const handleDateChange = (dates: [Dayjs | null, Dayjs | null]) => {
        const [pickupDate, dropoffDate] = dates;
        setBookingDetails({ pickupDate, dropoffDate });
    };

    const handleConfirmBooking = () => {
        if (bookingDetails.pickupDate && bookingDetails.dropoffDate) {
            // Save to local storage
            const confirmedDates = JSON.stringify({
                carId,
                pickupDate: bookingDetails.pickupDate.toISOString(),
                dropoffDate: bookingDetails.dropoffDate.toISOString(),
            })
            console.log(`booking_${carId}`,confirmedDates)
            localStorage.setItem('carBookingDetails', confirmedDates );
            alert('Booking details saved!');
        } else {
            alert('Please select both pickup and dropoff dates.');
        }
    };

    

  return (
    
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DateTimeRangePicker']}>
        <DateTimeRangePicker 
            localeText={{ start: 'Check-in', end: 'Check-out' }}
            value={[bookingDetails.pickupDate, bookingDetails.dropoffDate]}
            onChange={handleDateChange}
            />
      </DemoContainer>
      <CustomButton
                    title='Confirm Booking'
                    containerStyles='w-1/2 py-[10px]
                    rounded-full bg-primary-blue mt-4'
                    textStyles="text-white text-[14px] leading-[17px]
                    font-bold"
                    btnType='button'
                    rightIcon="/right-arrow.svg"
                    handleClick={handleConfirmBooking}
                    />
    </LocalizationProvider>   
  )
}

export default CarBookingForm