import React from 'react'
import Directions from './Directions'

// just a component for each list item in restaurant list

const RestaurantListCard = ({restaurant}) => {
  return (
    <div className="">
        <h3>{restaurant.name}</h3>
        <p>Address: {restaurant.address}</p>
        <p>Location:  {restaurant.city}</p>
        <p>Type: {restaurant.type}</p>
        <p>Offers: {restaurant.selection}</p>
        <p>Contact: {restaurant.email} | {restaurant.phone}</p>
        <Directions restaurant={restaurant}/>
    </div>
  )
}

export default RestaurantListCard