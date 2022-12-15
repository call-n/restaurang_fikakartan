import axios from 'axios'

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

const LatLong = async (address) => {
    try{
        const res = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${API_KEY}`)
        const coords = res.data.results[0].geometry.location    
        return coords
    }

    catch(err) {   
        console.log(err)
        return false
    }
}

const exports = {
    LatLong
}

export default exports