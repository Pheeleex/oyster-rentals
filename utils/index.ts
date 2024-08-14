
import { FilterProps } from "@/types";
import dayjs from "dayjs";



export const calculateCarRent = (city_mpg: number, year: number) => {
  const basePricePerDay = 50; // Base rental price per day in dollars
  const mileageFactor = 0.1; // Additional rate per mile driven
  const ageFactor = 0.05; // Additional rate per year of vehicle age

  // Calculate additional rate based on mileage and age
  const mileageRate = city_mpg * mileageFactor;
  const ageRate = (new Date().getFullYear() - year) * ageFactor;

  // Calculate total rental rate per day
  const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;

  return rentalRatePerDay.toFixed(0);
};


export const updateSearchParams = (type: string, value: string) => {
    // Get the current URL search params
    const searchParams = new URLSearchParams('');
  
    // Set the specified search parameter to the given value
    searchParams.set(type, value);
  
    // Set the specified search parameter to the given value
    const newPathname = `${window.location.pathname}?${searchParams.toString()}`;
  
    return newPathname;
  };

  // bookingUtils.ts
export interface Booking {
  carId: string;
  startDate: Date;
  endDate: Date;
}

export const saveBooking = (booking: Booking) => {
  const bookings = getBookings();
  bookings.push(booking);
  localStorage.setItem('bookings', JSON.stringify(bookings));
};

export const getBookings = (): Booking[] => {
  if (typeof window !== "undefined") {
    const bookings = localStorage.getItem('bookings');
    return bookings ? JSON.parse(bookings) : [];
  }
  return [];
};

export const isCarBooked = (carId: string, startDate: Date, endDate: Date): boolean => {
  const bookings = getBookings();

  return bookings.some((booking) => {
    return (
      booking.carId === carId &&
      ((startDate >= new Date(booking.startDate) && startDate <= new Date(booking.endDate)) ||
        (endDate >= new Date(booking.startDate) && endDate <= new Date(booking.endDate)))
    );
  });
};

export const getCarBookingDetails = () => {
  const bookingDetails = localStorage.getItem('carBookingDetails')
  if(bookingDetails){
    try {
      return JSON.parse(bookingDetails)
    } catch (error) {
      console.error('Error parsing booking details:', error);
      return null;
    }
  }
}


// utils/signUpSchema.ts
import { z } from "zod";

export const signUpSchema = z
  .object({
    email: z.string().email(),
    username: z.string().min(1, "Username is required"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

// Type for the parsed schema
export type SignUpSchema = z.infer<typeof signUpSchema>;


