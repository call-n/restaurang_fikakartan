import { Container, Row, Col, Button } from "react-bootstrap"
import { useMemo } from 'react'
import  useGetRestaurants  from '../hooks/useGetRestaurants'
import SortableTable from "../components/SortableTable"

const RestaurantsPage = () => {
    const { data: restaurants, error, isError, isLoading } = useGetRestaurants('restaurants')

    const columns = useMemo(() =>{
        return [
            {
                Header: 'Name',
                accessor: 'name'
            },
            {
                Header: 'City',
                accessor: 'city'
            },
            {
                Header: 'Address',
                accessor: 'address'
            },
        ]
    }, [])

    return(
        <>
        <Container>
            <h1>All resaurants</h1>

            {isLoading && (<p>Loading...</p>)}

            {isError && (<p>{error.message}</p>)}

            {restaurants && <SortableTable columns={columns} data={restaurants}/>}
        </Container>
        </>
    )
}
 export default RestaurantsPage