'use client'
import React, { useState } from 'react'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { Dayjs } from 'dayjs';
import { SaveBooking } from '@/utils/firebase';



interface BookingDetails {
  pickUpDate: Dayjs | null;
}

interface CarBookingFormProps {
  carId: string;  // Accepting carId as a prop
}

export default function BasicDateTimePicker({carId}: CarBookingFormProps) {
  const [bookingDetails, setBookingDetails] = useState<BookingDetails>({pickUpDate: null})

  const handleDateChange = (date: Dayjs | null) => {
    setBookingDetails({ pickUpDate: date });
  };

const handleConfirmBooking = () => {
  if (bookingDetails.pickUpDate) {
      // Save to local storage
      const confirmedDates = {
          carId,
          pickupDate: bookingDetails.pickUpDate.toISOString(),
      }
      console.log(confirmedDates)
      localStorage.setItem('carBookingDetails', JSON.stringify(confirmedDates) );
       SaveBooking(carId, confirmedDates).
       then(()=>{
       alert('Booking details saved!');
       })
      
  } else {
      alert('Please select date.');
  }
};
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DateTimePicker']}>
        <DateTimePicker label="Select test drive date"
          value={bookingDetails.pickUpDate}
          onChange={handleDateChange} />
      </DemoContainer>
      <button onClick={handleConfirmBooking}
        className='bg-blue-700 text-white p-2 rounded my-4'>Save Date</button>
    </LocalizationProvider>
  );
}
