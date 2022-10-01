import axios from 'axios'

const mapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

const getLatLong = async (address) => {
    const res = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?
    address=${address}&key=${mapsApiKey}`)

    const cords = res.data.results[0].geometry.location
    
    return cords
}

export default {
    getLatLong,
}