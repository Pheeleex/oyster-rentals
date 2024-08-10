import CarCard from "@/components/CarCard";
import CustomFilter from "@/components/CustomFilter";
import Hero from "@/components/Hero";
import SearchBar from "@/components/SearchBar";
import ShowMore from "@/components/ShowMore";
import { fuels, yearsOfProduction } from "@/constants";
import { HomeProps } from "@/types";
import fetchCars from "@/utils/firebase";
import Image from "next/image";

export default async function Home({searchParams}: HomeProps) {
  const allCars = await fetchCars()

 console.log(allCars, 'cars')


 const isDataEmpty = !Array.isArray(allCars) || 
 allCars.length < 1 || !allCars

  return (
      <main className="overflow-hidden">
          <Hero />
          <div className='mt-12 padding-x padding-y max-width' id='discover'>
        <div className='home__text-container'>
          <h1 className='text-4xl font-extrabold'>Car Catalogue</h1>
          <p>Explore out cars you might like</p>
        </div>
        <div className='home__filters'>
          <SearchBar />
          <div className='home__filter-container'>
            <CustomFilter title='fuel' options={fuels}/>
            <CustomFilter title='year' options={yearsOfProduction} />
          </div>
        </div>
        {
            !isDataEmpty ? (
              <section>
                 <div className="home__cars-wrapper">
                    {
                      allCars?.map((car, index) => (
                        <CarCard car={car}
                          key={index} />
                      ))
                    }
                 </div>

                 <ShowMore 
              pageNumber={(searchParams.limit || 10) / 10}
              isNext={(searchParams.limit || 10) > allCars.length}
            />
              </section>
            ) : (
              <div className="home__error-container">
                  <h2 className="text-back text-xl
                  font-bold">Oops, no result</h2>
                  <p>Nothing o</p>
              </div>
            )
          }
        </div>
      </main>
  );
}
