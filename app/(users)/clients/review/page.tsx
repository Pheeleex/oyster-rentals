import CustomFilter from '@/components/CustomFilter'
import SearchBar from '@/components/SearchBar'
import { fuels, yearsOfProduction } from '@/constants'
import { HomeProps } from '@/types'
import { fetchCarsRA } from '@/utils'
import React from 'react'
import Card from './CarCardReview'

const CarRequests = async({searchParams}: HomeProps) => {
  const Cars = await fetchCarsRA({
    manufacturer: searchParams.manufacturer || "",
    year: searchParams.year || 2022,
    fuel: searchParams.fuel || "",
    limit: searchParams.limit || 10,
    model: searchParams.model || "",
  })

  const isDataEmpty = !Array.isArray(Cars) || Cars.length < 1 || !Cars;
  return (
    <main className="overflow-hidden">
      <div className='mt-12 padding-x padding-y max-width' id='discover'>
        <div className='home__text-container'>
          <h1 className='text-4xl font-extrabold'>Search Cars</h1>
            <p>Make your custom orders here</p>
        </div>
      </div>
      <div className='home__filters'>
          <SearchBar />
          <div className='home__filter-container'>
            <CustomFilter title='fuel' options={fuels}/>
            <CustomFilter title='year' options={yearsOfProduction} />
          </div>
          {!isDataEmpty ? (
          <section>
            <div className='home__cars-wrapper'>
              {Cars?.map((car) => (
                <Card car={car} />
              ))}
            </div>


          </section>
        ) : (
          <div className='home__error-container'>
            <h2 className='text-black text-xl font-bold'>Oops, no results</h2>
            <p>{Cars?.message}</p>
          </div>
        )}
        </div>
    </main>
  )
}
export default CarRequests