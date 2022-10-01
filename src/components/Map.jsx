import React from 'react'
import { useQuery } from 'react-query'
import {useState} from 'react'
import mapAPI from '../services/MapAPI'
import Search from './Search'
import {GoogleMap, useJsApiLoader} from '@react-google-maps/api'

const libraries = ['places']


const mapContainer = {
    widht: '50vw',
    height: '50vh'
}

const Map = () => {
    
    const { isLoaded } = useJsApiLoader({mapsAPIKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,libraries})

    const [pos, setPos] = useState({lat: 56.3768708, lng: 13.9306438})



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

                <GoogleMap
                    center={pos}
                    mapContainerStyle={mapContainer}
                    zoom={12}
                >

                </GoogleMap>

            </>
         )}
    </> 
  )
}

export default Map