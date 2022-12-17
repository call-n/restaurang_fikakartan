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
import { Form } from 'react-bootstrap'
import {useRef} from 'react'


const libraries = ['places']


const mapContainer = {
  widht: "100vw",
  height: "100vh",
}

const Map = () => {

    // Get restaurants from db
    const {data} = useStreamCollection("restaurants")

    // load map api
    const { isLoaded } = useJsApiLoader({googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,libraries})

    // states
    const [pos, setPos] = useState({lat: 56.3768708, lng: 13.9306438})
    const [userPos, setUserPos] = useState("")
    const [city, setCity] = useState(null)
    const [showList, setShowList] = useState(false)
    const [selectedRestaurant, setSelectedRestaurant] = useState(null)
    const [type, setType] = useState("")
    const [selection, setSelection] = useState("")
  


    const [searchParams, setSeachParams] = useSearchParams()



    // filter restaurant for searched city
    const restaurants = data.filter((r) => r.city == city)


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

        if(searchParams.get('type') ) { 
          setType(searchParams.get('type'))
        }

        if(searchParams.get('selection') ) { 
          setSelection(searchParams.get('selection'))
        }

    },[searchParams])

  return (
    <>
      {!isLoaded && <p>Loading map...</p>}

      {isLoaded && (
        <>
          <div className='d-flex flex-column'>
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

            <div>
            <Form.Group className="m-3">
              <Form.Label>Type</Form.Label>
              <Form.Select
                onChange={(e) => {
                  setType(e.target.value)
                  setSeachParams({type: e.target.value})
                }}
                defaultValue={searchParams.get('type')}
                className="w-25"
              >
                <option value="">All</option>
                <option value="fastfood">Fast food</option>
                <option value="foodtruck">Food truck</option>
                <option value="cafe">Café</option>
                <option value="pizzeria">Pizza</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="m-3">
              <Form.Label>Selection</Form.Label>
              <Form.Select
                onChange={(e) => {
                  setSelection(e.target.value)
                  setSeachParams({selection: e.target.value})
                }}
                defaultValue={searchParams.get('selection')}
                className="w-25"
              >
                <option value="">All</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
                <option value="afterwork">AW</option>
                <option value="fika">Fika</option>
              </Form.Select>
            </Form.Group>
            </div>
          </div>
          <Modal show={showList} onHide={toggleList} closeButton>
            {<NearbyRestaurantList city={city} type={type} selection={selection}/>}
          </Modal>

          <GoogleMap
            center={pos}
            mapContainerStyle={mapContainer}
            zoom={12}
            className="map"
          >
            {userPos && <Marker position={userPos} label="Me" />}
          {!city && (
            <>
              {!type && !selection && (
                    data.map((restaurant) => (
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
                  ))
              )}

              {type && !selection && (
                data.filter((r) => r.type == type).map((restaurant) => (
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
                ))
              
              )}

              {selection && !type && (
              data.filter((r) => r.selection == selection).map((restaurant) => (
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
              ))
              )}

              {selection && type && (
               data.filter((r) => r.selection == selection && r.type == type).map((restaurant) => (
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
              ))
              )}
            </>
          )}

        {city && (
          <>
            {!type && !selection && (
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
            ))
            )}

            {type && !selection && (
             restaurants.filter((r) => r.type == type).map((restaurant) => (
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
            ))
            )}

            {selection && !type && (
              restaurants.filter((r) => r.selection == selection).map((restaurant) => (
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
              ))
            )}

            {selection && type && (
               restaurants.filter((r) => r.type == type && r.selection == selection).map((restaurant) => (
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
              ))
            )}
          </>
        )}

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
