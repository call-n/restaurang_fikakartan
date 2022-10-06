import { Container, Row, Col, Button, ListGroup, ListGroupItem } from "react-bootstrap"
import { Link, useParams } from 'react-router-dom'
// import { useAuthContext } from "../contexts/AuthContext"
import useGetRestaurant from "../hooks/useGetRestaurant"

const RestaurantsPage = () => {
    const {id} = useParams()
    const {data: restaurant, error, isError, isLoading} = useGetRestaurant(id)

    return(
        <>
            <Container>
                <div className="d-flex m-3">
                    <h1>{restaurant.name}</h1> 
                    <Button 
                        className="ms-3"
                        as={Link} to={`/update-restaurant/${restaurant.id}`}
                    >
                        Update
                    </Button>
                </div>

                {isLoading && (<span>Loading...</span>)}
                {isError && (<span>{error.message}</span>)}

                <ListGroup>
                    <ListGroupItem>Address: {restaurant.address}, {restaurant.city}</ListGroupItem>
                    <ListGroupItem> Type of food: {restaurant.type}</ListGroupItem>
                    <ListGroupItem> Selection: {restaurant.selection}</ListGroupItem>
                    <ListGroupItem>Description: {restaurant.description}</ListGroupItem>
                    <ListGroupItem>Phone: {restaurant.phone}</ListGroupItem>
                    <ListGroupItem>Email: {restaurant.email}</ListGroupItem>
                    <ListGroupItem>Website: {restaurant.website}</ListGroupItem>
                    <ListGroupItem>Facebook: {restaurant.facebook}</ListGroupItem>
                    <ListGroupItem>Instagram: {restaurant.instagram}</ListGroupItem>
                </ListGroup>
            </Container>
        </>
    )
}

export default RestaurantsPage