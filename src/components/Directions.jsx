
import React from 'react'
import { useState } from 'react'
import Button from 'react-bootstrap/Button'
const Directions = ({restaurant}) => {

    const [pos, setPos] = useState(null)

    const getPos  = () => {
         navigator.geolocation.getCurrentPosition((p) => {
            setPos({
                lat:p.coords.latitude,
                lng:p.coords.longitude
            })
        })
    }
    
    return (
        <>
            {!pos && (
                <div>
                    <p>Get directions from your location</p>
                    <Button onClick={getPos}>
                        Get Directions
                    </Button>
                </div>
            )}        

            {pos && (
                <Button href={`https://www.google.com/maps/dir/${pos.lat},${pos.lng}/${restaurant.name},+${restaurant.street}+${restaurant.city}`}>Go Now!</Button>
            )}
        </>
    )
}

export default Directions