import { useEffect, useState } from "react"
import useStreamCollection from "../hooks/useStreamCollection"
import Form from "react-bootstrap/Form"
import RestaurantListCard from "./RestaurantListCard"

const NearbyRestaurantList = ({ city, type, selection }) => {
  const { data: data } = useStreamCollection("restaurants")

  const restaurants = data.filter((r) => r.city == city)

  return (
    <>
      <div className="list">
       {!city && (
          <>
            {!type && !selection && (
              <ul>
                <h2>All restaurants</h2>
                {data.map((r) => (
                  <li key={r.id}>
                    <RestaurantListCard restaurant={r} />
                  </li>
                ))}
              </ul>
            )}

            {type && !selection && (
              <ul>
                <h2>All restaurants filterd by {type}</h2>
                {data
                  .filter((r) => r.type === type)
                  .map((r) => (
                    <li key={r.id}>
                      <RestaurantListCard restaurant={r} />
                    </li>
                  ))}
              </ul>
            )}

            {selection && !type && (
              <ul>
                <h2>All restaurants filterd by {selection}</h2>
                {data
                  .filter((r) => r.selection === selection)
                  .map((r) => (
                    <li key={r.id}>
                      <RestaurantListCard restaurant={r} />
                    </li>
                  ))}
              </ul>
            )}

            {selection && type && (
              <ul>
                <h2>
                  All restaurants filterd by {selection} and {type}
                </h2>
                {data
                  .filter(
                    (r) =>
                      r.type === type && r.selection === selection
                  )
                  .map((r) => (
                    <li key={r.id}>
                      <RestaurantListCard restaurant={r} />
                    </li>
                  ))}
              </ul>
            )}
          </>
        )}

        {city && (
          <>
            {!type && !selection && (
              <ul>
                <h2>All restaurants in {city}</h2>
                {restaurants.map((r) => (
                  <li key={r.id}>
                    <RestaurantListCard restaurant={r} />
                  </li>
                ))}
              </ul>
            )}

            {type && !selection && (
              <ul>
                <h2>All restaurants in {city} filterd by {type}</h2>
                {restaurants
                  .filter((r) => r.type === type)
                  .map((r) => (
                    <li key={r.id}>
                      <RestaurantListCard restaurant={r} />
                    </li>
                  ))}
              </ul>
            )}

            {selection && !type && (
              <ul>
                <h2>All restaurants in {city} filterd by {selection}</h2>
                {restaurants
                  .filter((r) => r.selection === selection)
                  .map((r) => (
                    <li key={r.id}>
                      <RestaurantListCard restaurant={r} />
                    </li>
                  ))}
              </ul>
            )}

            {selection && type && (
              <ul>
                <h2>
                  All restaurants in {city} filterd by {selection} and {type}
                </h2>
                {restaurants
                  .filter(
                    (r) =>
                      r.type === type && r.selection === selection
                  )
                  .map((r) => (
                    <li key={r.id}>
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
