import { CarProps, FilterProps } from "@/types";


export async function fetchCarsRA(filters: FilterProps) {
  const { manufacturer, year, model, limit, fuel } = filters;

  const headers = {
    'X-Api-Key': 'jZ0FfTUdKtAG3uVmI+3wAA==4DI9jthK9V9MWG7V',
    'Content-Type': 'application/json',
  };

  console.log(filters, 'filters');

  // Construct the query string using URLSearchParams
  const searchParams = new URLSearchParams();

  if (manufacturer) searchParams.append('make', manufacturer);
  if (year) searchParams.append('year', year.toString());
  if (model) searchParams.append('model', model);
  if (limit) searchParams.append('limit', limit.toString());
  if (fuel) searchParams.append('fuel_type', fuel);

  const url = `https://api.api-ninjas.com/v1/cars?${searchParams.toString()}`;

  console.log(url, 'url');

  try {
    const response = await fetch(url, { headers });

    // Check if the response is ok
    if (!response.ok) {
      console.error('API request failed with status:', response.status);
      return [];
    }

    const result = await response.json();

    // Log the result to see what is being returned
    console.log(result, 'result');

    return result;
  } catch (error) {
    console.error('Error fetching cars:', error);
    return [];
  }
}


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

export const generateCarImageUrl = (car: CarProps, angle?: string) => {
  const url = new URL("https://cdn.imagin.studio/getimage");
  const { make, model, year } = car;

  url.searchParams.append('customer', process.env.NEXT_PUBLIC_IMAGIN_API_KEY || '');
  url.searchParams.append('make', make);
  url.searchParams.append('modelFamily', model.split(" ")[0]);
  url.searchParams.append('zoomType', 'fullscreen');
  url.searchParams.append('modelYear', `${year}`);
  // url.searchParams.append('zoomLevel', zoomLevel);
  url.searchParams.append('angle', `${angle}`);

  return `${url}`;
} 



