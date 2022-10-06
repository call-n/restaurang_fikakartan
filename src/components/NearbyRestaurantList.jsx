import {useState} from 'react'
import useStreamCollection from '../hooks/useStreamCollection'
import Form from 'react-bootstrap/Form'
import RestaurantListCard from './RestaurantListCard'

const NearbyRestaurantList = ({ city }) => {

    const {data: data} = useStreamCollection('restaurants')

    const restaurants = data.filter(r => r.city == city)


    const [typeFilter, setTypeFilter] = useState("")
    const [selectionFilter, setSelectionFilter] = useState("")




  return (
      <>
        <Form.Group className="m-3">
            <Form.Label>Type</Form.Label>
            <Form.Select onChange={(e) => {setTypeFilter(e.target.value)}} defaultValue="all" className="w-25">
                <option value="">All</option>
                <option value="snabbmat">Snabbmat</option>
                <option value="foodtruck">Foodtruck</option>
                <option value="cafe">Café</option>
                <option value="pizzarias">Pizza</option>
            </Form.Select>
        </Form.Group>
         
        <Form.Group className="m-3">
            <Form.Label>Selection</Form.Label>
            <Form.Select onChange={(e) => {setSelectionFilter(e.target.value)}} defaultValue="all" className="w-25">
                <option value="" >All</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
                <option value="afterwork" >AW</option>
                <option value="fika">Fika</option>
            </Form.Select>
        </Form.Group>
        
        <div className="list">
            {restaurants && (
                <>
                    {/** if we dont have filter or city show all */}
                    {!city && !typeFilter &&(
                        <ul>
                            <h2>All restaurants</h2>
                            {data.map((r) => (
                                <li> <RestaurantListCard restaurant={r} /></li>
                            ))}
                        </ul>
                    )}
                    {/**if we have city then show all in that city */}
                    {city && !typeFilter && (
                        <ul>
                            <h2>Restaurants in {city}</h2>
                            {restaurants.map((r) => (
                                <li><RestaurantListCard restaurant={r}/></li>
                            ))}
                        </ul>
                    )}

                    {/** filter restaurant by type and city */}
                    {city && typeFilter && (
                        <ul>
                            {restaurants.filter((r) => r.type == typeFilter).map((r) => (
                                <li><RestaurantListCard restaurant={r}/></li>
                            ))}
                        </ul>
                    )}
                </>
            )}
        </div>
      </>
  )
}

export default NearbyRestaurantList