import React from 'react'
import { useQuery } from 'react-query'
import {useState, useEffect} from 'react'
import mapAPI from '../services/MapAPI'
import Button from 'react-bootstrap/Button'
import Search from './Search'
import Modal from 'react-bootstrap/Modal'
import {GoogleMap, useJsApiLoader, Marker, InfoWindow} from '@react-google-maps/api'
import useStreamCollection from '../hooks/useStreamCollection'
import NearbyRestaurantList from './NearbyRestaurantList'
import Directions from './Directions'
import {Link} from 'react-router-dom'
import { useSearchParams } from 'react-router-dom'



const libraries = ['places']


const mapContainer = {
  widht: "100vw",
  height: "100vh",
}

const Map = () => {

    // Get restaurants from db
    const {data: restaurants} = useStreamCollection("restaurants")

    // load map api
    const { isLoaded } = useJsApiLoader({googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,libraries})

    // states
    const [pos, setPos] = useState({lat: 56.3768708, lng: 13.9306438})
    const [userPos, setUserPos] = useState("")
    const [city, setCity] = useState(null)
    const [showList, setShowList] = useState(false)
    const [selectedRestaurant, setSelectedRestaurant] = useState(null)


    const [searchParams, setSeachParams] = useSearchParams()


    // Get users location
    const getCurrentLocation = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            setUserPos({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            })
        })
    }


    // get lat lng for the city searched and move map there
    const handleSubmit = async (address) => {
        const cords = await mapAPI.getLatLong(address)
        setPos(cords)
        setCity(await mapAPI.getAddress(cords.lat,cords.lng))
    }


    // toggle to show list or not
    const toggleList = () => {
        setShowList(!showList)
    }

    useEffect(() => {
        if(searchParams.get('city') ) { 
            handleSubmit(searchParams.get('city'))
        }
    }, [searchParams]) 
    console.log(searchParams.get('city'))

  return (
    <>
      {!isLoaded && <p>Loading map...</p>}

      {isLoaded && (
        <>
          <div className="d-flex m-3">
            <div className="d-flex flex-row">
              <Search onSubmit={handleSubmit} />
              <Button
                className="m-1"
                onClick={getCurrentLocation}
                variant="dark"
              >
                Find Me
              </Button>
              <Button className="m-1" variant="dark" onClick={toggleList}>
                Show List
              </Button>
              <Button className="m-1" variant="dark" as={Link} to="/create-tip">
                Suggest Restaurant
              </Button>
            </div>
          </div>
          <Modal show={showList} onHide={toggleList} closeButton>
            {<NearbyRestaurantList  city={city}/>}
          </Modal>

          <GoogleMap
            center={pos}
            mapContainerStyle={mapContainer}
            zoom={12}
            className="map"
          >
            {userPos && <Marker position={userPos} label="Me" />}

            {!city &&
              restaurants.map((restaurant) => (
                <Marker
                  onClick={() => {
                    setSelectedRestaurant(restaurant)
                  }}
                  key={restaurant.id}
                  position={{
                    lat: restaurant.coordinates.lat,
                    lng: restaurant.coordinates.lng,
                  }}
                />
              ))}

            {/**If we have city then filter the restaurants to show onyl those in city */}
            {city &&
              restaurants
                .filter((restaurant) => restaurant.city == city)
                .map((fRestaurant) => (
                  <Marker
                    onClick={() => {
                      setSelectedRestaurant(fRestaurant)
                    }}
                    key={fRestaurant.id}
                    position={{
                      lat: fRestaurant.coordinates.lat,
                      lng: fRestaurant.coordinates.lng,
                    }}
                  />
                ))}

            {/**Show info window for clicked marker/restaurant on map */}
            {selectedRestaurant && (
              <InfoWindow
                onCloseClick={() => {
                  setSelectedRestaurant(null)
                }}
                position={{
                  lat: selectedRestaurant.coordinates.lat,
                  lng: selectedRestaurant.coordinates.lng,
                }}
              >
                <div>
                  <h2>{selectedRestaurant.name}</h2>
                  <p>Address: {selectedRestaurant.address}</p>
                  <p>Location: {selectedRestaurant.city}</p>
                  <p>Type: {selectedRestaurant.type}</p>
                  <p>Offers: {selectedRestaurant.selection}</p>
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
