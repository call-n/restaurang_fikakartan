import { Container, Button, ListGroup, ListGroupItem } from 'react-bootstrap'
import { useParams, Link } from 'react-router-dom'
import useGetTip from '../hooks/useGetTip'

const TipPage = () => {
    const {id} =  useParams()
    const {data: tip, error, isError, isLoading} = useGetTip(id)

    return(
        <>
            <Container>
                
                <div className='d-flex m-3'>
                    <h1>{tip.name}</h1>
                    <Button
                        className='ms-3'
                        size='lg'
                        as={Link} to='/create-restaurant'
                    >
                        Add restaurant
                    </Button>
                </div>

                {isLoading && (<span>Loading...</span>)}
                {isError && (<span>{error.message}</span>)}

                <ListGroup>
                    <ListGroupItem>Name: {tip.name} </ListGroupItem>
                    <ListGroupItem>Name: {tip.name} </ListGroupItem>
                    <ListGroupItem>Description: {tip.description} </ListGroupItem>
                </ListGroup>

            </Container>
        </>
    )
}

export default TipPage

