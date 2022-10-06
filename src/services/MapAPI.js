import axios from 'axios'

const mapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

const getLatLong = async (address) => {
    const res = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${mapsApiKey}`)

    const cords = res.data.results[0].geometry.location

    console.log(cords)
    return cords
}

const getAddress = async (lat, lng) => {

    const res = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${mapsApiKey}`)

    const address = res.data.results[0].address_components

    return address.find(i => i.types[0] === 'postal_town').long_name
}

export default {
    getLatLong,
    getAddress,
}

