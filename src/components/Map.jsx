import React from 'react'
import { useQuery } from 'react-query'
import {useState} from 'react'
import mapAPI from '../services/MapAPI'
import Button from 'react-bootstrap/Button'
import Search from './Search'
import {GoogleMap, useJsApiLoader, Marker, InfoWindow} from '@react-google-maps/api'
import useStreamCollection from '../hooks/useStreamCollection'
import NearbyRestaurantList from './NearbyRestaurantList'
import Directions from './Directions'
import {Link} from 'react-router-dom'


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
    const [showList, setShowList] = useState(false)
    const [selectedRestaurant, setSelectedRestaurant] = useState(null)


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
        setPos(cords)
        setCity(await mapAPI.getAddress(cords.lat,cords.lng))
    }

    const toggleList = async () => {
        setShowList(!showList)
    }

  return (
    <>
        {!isLoaded && (
            <p>Loading map...</p>
        )}

        {isLoaded && (
            <>
                <div className="d-flex m-3">
                    <div className="d-flex flex-row">
                        <Search onSubmit={handleSubmit} />
                        <Button className='m-1' onClick={getCurrentLocation} variant="dark">Find Me</Button>
                        <Button className='m-1'  variant="dark" onClick={toggleList}>Show List</Button>    
                        <Button className='m-1' variant='dark' as={Link} to='/create-tip'>Suggest Restaurant</Button>
                    </div>

                </div>
                {showList &&(
                    <NearbyRestaurantList city={city}/>
                )}

                <GoogleMap
                    center={pos}
                    mapContainerStyle={mapContainer}
                    zoom={12}
                >
                    
                    {userPos && (
                        <Marker position={userPos} label="Me"/>
                    )}

                    
                    {!city && (
                        restaurants.map((restaurant) => (
                            <Marker onClick={ () =>{setSelectedRestaurant(restaurant)}} key={restaurant.id} position={{lat:restaurant.coordinates.lat, lng:restaurant.coordinates.lng}}/>
                        ))
                    )}

                    {city && (
                        restaurants.filter((restaurant) => restaurant.city == city).map((fRestaurant) => (
                            <Marker onClick={ () => {setSelectedRestaurant(fRestaurant)}} key={fRestaurant.id} position={{lat:fRestaurant.coordinates.lat, lng:fRestaurant.coordinates.lng}} />
                        ))
                    )}

                    {selectedRestaurant && (
                        <InfoWindow onCloseClick={() => {setSelectedRestaurant(null)}} position={{lat: selectedRestaurant.coordinates.lat, lng: selectedRestaurant.coordinates.lng}}>
                            <div>
                                <h2>{selectedRestaurant.name}</h2>
                                <p>{selectedRestaurant.city}</p>
                                <p>{selectedRestaurant.address}</p>
                                <p>{selectedRestaurant.selection}</p>
                                <Directions restaurant={selectedRestaurant} />
                            </div>
                        </InfoWindow>
                    )}
                </GoogleMap>
            </>
         )}
    </> 
  )
}

export default Map