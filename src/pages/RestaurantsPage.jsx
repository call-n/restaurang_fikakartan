import { Container, Row, Col, Button } from "react-bootstrap"
import { useMemo } from 'react'
import  useGetRestaurants  from '../hooks/useGetRestaurants'
import SortableTable from "../components/SortableTable"
import { Link } from "react-router-dom"


const RestaurantsPage = () => {
    const { data: restaurants, error, isError, isLoading } = useGetRestaurants('restaurants')

    const columns = useMemo(() =>{
        return [
            {
                Header: 'Name',
                accessor: 'name'
            },
            {
                Header: 'Address',
                accessor: 'address'
            },
            {
                Header: 'City',
                accessor: 'city'
            },
            {
                Header: 'Description',
                accessor: 'description'
            },
            {
                Header: 'More Info',
                Cell: ({row: {original: restaurant}}) =>
                <Button 
                    variant='primary'
                    size='sm'
                    as={Link} to={`/restaurant/${restaurant.id}`}
                    >
                    More
                </Button>
            }
        ]
    }, [])

    return(
        <>
            <Container className="my-3">
                <Container>
                    <h1>All resaurants</h1>

                    {isLoading && (<p>Loading...</p>)}

                    {isError && (<p>{error.message}</p>)}

                    {restaurants && <SortableTable columns={columns} data={restaurants}/>}
                </Container>
            </Container>
        </>
    )
}
 export default RestaurantsPage