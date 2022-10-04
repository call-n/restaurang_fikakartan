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


    const getCurrentLocation = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            const userPos={
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            }
            setUserPos(userPos)
        })
    }

    const handleSubmit = async (address) => {
        const cords = await mapAPI.getLatLong(address)

        console.log('cords:',address)
        setPos(cords)
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


                    {}

                    { restaurants && (
                        restaurants.map((restaurant) => (
                            <Marker key={restaurant.id} position={{lat: restaurant.coordinates.lat, lng: restaurant.coordinates.lng}}/> 
                        ))
                    )}

                </GoogleMap>

            </>
         )}
    </> 
  )
}

export default Map