import React from 'react'
import useStreamCollection from '../hooks/useStreamCollection'


const NearbyRestaurantList = ({ city }) => {

    const {data: data} = useStreamCollection('restaurants')

    const restaurants = data.filter(r => r.city == city)


    console.log(restaurants)


  return (
    <div>
        {restaurants && (
            <ul>
                {restaurants.map(r => (
                    <li key={r.id}>{r.name}</li>
                ))}
            </ul>
        )}
    </div>
  )
}

export default NearbyRestaurantList