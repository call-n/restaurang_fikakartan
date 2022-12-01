import { Container, Button, ListGroup, ListGroupItem } from "react-bootstrap"
import { Link, useParams } from 'react-router-dom'
import useGetRestaurant from "../hooks/useGetRestaurant"
import useGetUsers from "../hooks/useGetUsers"
import { useAuthContext } from '../hooks/useAuthContext'




const RestaurantPage = () => {
	const { user } = useAuthContext()
    const {id} = useParams()
    const {data: restaurant, error, isError, isLoading} = useGetRestaurant(id)
    const {data: users} = useGetUsers('users')
	const admin = users.filter(u => u.displayName === user.displayName)
    

    return(
        <>
            <Container>
                <div className="d-flex m-3">
                    <h1>{restaurant.name}</h1> 
                    {admin[0]?.admin && (
                                            <Button 
                                            className="ms-3"
                                            as={Link} to={`/update-restaurant/${restaurant.id}`}
                                        >
                                            Update
                                        </Button>
                    )}

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

export default RestaurantPage