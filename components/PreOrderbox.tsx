import React from 'react'
import UnknownCard from './UnknownCard'

const PreOrderbox = () => {
  return (
    <div>
        <h1>Can't find the car you are searching for? 
            <span>Not to worry fill this form manually</span>
        </h1>
        <UnknownCard
            buttonTitle='add car data'
            detailsOpen={true}
            showBookingForm={true}
        />
    </div>
  )
}

export default PreOrderbox