import { useEffect, useState } from "react"
import useStreamCollection from "../hooks/useStreamCollection"
import Form from "react-bootstrap/Form"
import RestaurantListCard from "./RestaurantListCard"

const NearbyRestaurantList = ({ city }) => {
  const { data: data } = useStreamCollection("restaurants")

  const restaurants = data.filter((r) => r.city == city)

  const [typeFilter, setTypeFilter] = useState("")
  const [selectionFilter, setSelectionFilter] = useState("")

  console.log(data)

  return (
    <>
      <Form.Group className="m-3">
        <Form.Label>Type</Form.Label>
        <Form.Select
          onChange={(e) => {
            setTypeFilter(e.target.value)
          }}
          defaultValue="all"
          className="w-25"
        >
          <option value="">All</option>
          <option value="fastfood">Fast food</option>
          <option value="foodtruck">Food truck</option>
          <option value="cafe">Café</option>
          <option value="pizzarias">Pizza</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="m-3">
        <Form.Label>Selection</Form.Label>
        <Form.Select
          onChange={(e) => {
            setSelectionFilter(e.target.value)
          }}
          defaultValue="all"
          className="w-25"
        >
          <option value="">All</option>
          <option value="lunch">Lunch</option>
          <option value="dinner">Dinner</option>
          <option value="afterwork">AW</option>
          <option value="fika">Fika</option>
        </Form.Select>
      </Form.Group>

      <div className="list">
        {!city && (
          <>
            {!typeFilter && !selectionFilter && (
              <ul>
                <h2>All restaurants</h2>
                {data.map((r) => (
                  <li>
                    <RestaurantListCard restaurant={r} />
                  </li>
                ))}
              </ul>
            )}

            {typeFilter && !selectionFilter && (
              <ul>
                <h2>All restaurants filterd by {typeFilter}</h2>
                {data
                  .filter((r) => r.type === typeFilter)
                  .map((r) => (
                    <li>
                      <RestaurantListCard restaurant={r} />
                    </li>
                  ))}
              </ul>
            )}

            {selectionFilter && !typeFilter && (
              <ul>
                <h2>All restaurants filterd by {selectionFilter}</h2>
                {data
                  .filter((r) => r.selection === selectionFilter)
                  .map((r) => (
                    <li>
                      <RestaurantListCard restaurant={r} />
                    </li>
                  ))}
              </ul>
            )}

            {selectionFilter && typeFilter && (
              <ul>
                <h2>
                  All restaurants filterd by {selectionFilter} and {typeFilter}
                </h2>
                {data
                  .filter(
                    (r) =>
                      r.type === typeFilter && r.selection === selectionFilter
                  )
                  .map((r) => (
                    <li>
                      <RestaurantListCard restaurant={r} />
                    </li>
                  ))}
              </ul>
            )}
          </>
        )}

        {city && (
          <>
            {!typeFilter && !selectionFilter && (
              <ul>
                <h2>All restaurants in {city}</h2>
                {restaurants.map((r) => (
                  <li>
                    <RestaurantListCard restaurant={r} />
                  </li>
                ))}
              </ul>
            )}

            {typeFilter && !selectionFilter && (
              <ul>
                <h2>All restaurants in {city} filterd by {typeFilter}</h2>
                {restaurants
                  .filter((r) => r.type === typeFilter)
                  .map((r) => (
                    <li>
                      <RestaurantListCard restaurant={r} />
                    </li>
                  ))}
              </ul>
            )}

            {selectionFilter && !typeFilter && (
              <ul>
                <h2>All restaurants in {city} filterd by {selectionFilter}</h2>
                {restaurants
                  .filter((r) => r.selection === selectionFilter)
                  .map((r) => (
                    <li>
                      <RestaurantListCard restaurant={r} />
                    </li>
                  ))}
              </ul>
            )}

            {selectionFilter && typeFilter && (
              <ul>
                <h2>
                  All restaurants in {city} filterd by {selectionFilter} and {typeFilter}
                </h2>
                {restaurants
                  .filter(
                    (r) =>
                      r.type === typeFilter && r.selection === selectionFilter
                  )
                  .map((r) => (
                    <li>
                      <RestaurantListCard restaurant={r} />
                    </li>
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
