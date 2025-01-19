import CarCard from "@/components/CarCard";
import CustomFilter from "@/components/CustomFilter";
import Hero from "@/components/Hero";
import SaveCarsToLocalStorage from "@/components/SaveCars";
import SearchBar from "@/components/SearchBar";
import Services from "@/components/Services";
import ShowMore from "@/components/ShowMore";
import { fuels, yearsOfProduction } from "@/constants";
import { fetchCarBooking } from "@/lib/actions/bookingactions";
import { HomeProps } from "@/types";
import fetchCars from "@/utils/firebase";

interface Booking {
  carId: string;
  schedule: Date | null;
}


export default async function Home({ searchParams }: HomeProps) {
  const response = await fetchCars({
    manufacturer: searchParams.manufacturer || '',
    limit: searchParams.limit || 10,
    model: searchParams.model || '',
    year: searchParams.year || 2022,
    fuel: searchParams.fuel || ''
  });

  const allCars = response.cars;

  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;


  const bookingData = await fetchCarBooking();
 
 

// Access the 'documents' array which contains the bookings
const bookings = bookingData.documents || []; // Default to an empty array if undefined

// Create a map of bookings using carId as the key
// Create a map of bookings using carId as the key
const bookingsMap: { [key: string]: Date | null } = bookings.reduce((acc: { [key: string]: Date | null }, 
  booking: Booking) => {
  if (booking.schedule) {  // Add check for valid schedule
    acc[booking.carId] = new Date(booking.schedule);
  } else {
    acc[booking.carId] = null;  // Handle null schedules if needed
  }
  return acc;
}, {} as { [key: string]: Date | null });


  return (
    <main className="overflow-hidden">
      <SaveCarsToLocalStorage cars={allCars} />
      <Hero />
      <div className='mt-12 padding-x padding-y max-width' id='discover'>
        <div className='home__text-container'>
          <h1 className='text-4xl font-extrabold'>Car Catalogue</h1>
          <p>Explore our cars you might like</p>
        </div>
        <div className='home__filters'>
          <SearchBar />
          <div className='home__filter-container'>
            <CustomFilter title='fuel' options={fuels} />
            <CustomFilter title='year' options={yearsOfProduction} />
          </div>
        </div>
        {!isDataEmpty ? (
          <section>
            <div className="home__cars-wrapper">
              {allCars?.map((car, index) => (
                <CarCard
                  key={index}
                  car={car}
                  buttonTitle="Book Test Drive"
                  showBookingForm={true}
                  detailsOpen={true}
                  // Pass down the booking schedule if available
                  bookingSchedule={bookingsMap[car.id] || null} // Use the map to get the schedule
                />
              ))}
            </div>
            <ShowMore
              pageNumber={(searchParams.limit || 10) / 10}
              isNext={(searchParams.limit || 10) > allCars.length}
            />
          </section>
        ) : (
          <div className="home__error-container">
            <h2 className="text-black text-xl font-bold">Oops, no result</h2>
            <p>No cars found</p>
          </div>
        )}
      </div>
      <Services />
    </main>
  );
}
