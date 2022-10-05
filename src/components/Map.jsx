import React from 'react'
import { useQuery } from 'react-query'
import {useState} from 'react'
import mapAPI from '../services/MapAPI'
import Button from 'react-bootstrap/Button'
import Search from './Search'
import {GoogleMap, useJsApiLoader, Marker} from '@react-google-maps/api'
import useStreamCollection from '../hooks/useStreamCollection'

const libraries = ['places']


const mapContainer = {
    widht: '100vw',
    height: '100vh'
}

const Map = () => {
    const {data: restaurants} = useStreamCollection("restaurants")
    const { isLoaded } = useJsApiLoader({mapsAPIKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,libraries})

    const [pos, setPos] = useState({lat: 56.3768708, lng: 13.9306438})
    const [userPos, setUserPos] = useState("")
    const [city, setCity] = useState(null)


    const getCurrentLocation = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            setUserPos({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            })
        })
    }

    const handleSubmit = async (address) => {
        const cords = await mapAPI.getLatLong(address)

        console.log('cords:',address)
        setPos(cords)
        setCity(address)
    }

  return (
    <>
        {!isLoaded && (
            <p>Loading map...</p>
        )}

        {isLoaded && (
            <>
                <Search onSubmit={handleSubmit} />
                <Button onClick={getCurrentLocation} variant="dark">Find Me</Button>

                <GoogleMap
                    center={pos}
                    mapContainerStyle={mapContainer}
                    zoom={12}
                >

                    {userPos && (
                        <Marker position={userPos}/>
                    )}

                    
                    {!city && (
                        restaurants.map((restaurant) => (
                            <Marker key={restaurant.id} position={{lat:restaurant.coordinates.lat, lng:restaurant.coordinates.lng}}/>
                        ))
                    )}

                    {city && (
                        restaurants.filter((restaurant) => restaurant.city == city).map((fRestaurant) => (
                            <Marker key={fRestaurant.id} position={{lat:fRestaurant.coordinates.lat, lng:fRestaurant.coordinates.lng}} />
                        ))
                    )}
                </GoogleMap>

            </>
         )}
    </> 
  )
}

export default Map