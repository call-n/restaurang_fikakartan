import React from 'react'
import Directions from './Directions'

// just a component for each list item in restaurant list

const RestaurantListCard = ({restaurant}) => {
  return (
    <div className="">
        <h3>{restaurant.name}</h3>
        <p>{restaurant.address}</p>
        <p>{restaurant.city}</p>
        <Directions restaurant={restaurant}/>
    </div>
  )
}

export default RestaurantListCard