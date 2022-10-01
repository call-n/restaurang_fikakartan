import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase'
import { useForm } from 'react-hook-form'
import { Row, Col, Card, Form, Button } from 'react-bootstrap'

const CreateRestaurantForm = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm()

    const onCreateRestaurant = async (data) => {
        await addDoc(collection, (db, 'restaurant'), {
            created: serverTimestamp(),
            name: data.name,
            address: data.address,
            city: data.city,
            description: data.description,
            type: data.type,
            selection: data.selection,
        })
        reset()
    }

    return (
        <div className='d-flex text-center'>
            <Row>
                <Col xs={{ span: 11, offset: 2 }} md={{ span: 9, offset: 3}}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Add a new restaurant</Card.Title>

                            <Form noValidate onSubmit={handleSubmit(onCreateRestaurant)}>
                                <Row>
                                    <Form.Group as={Col} className='mb-3' controlId='name'>
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control {...register('name', {
                                            required: 'Please enter a name',
                                            minLength : 3, 
                                        })} type='text' />
                                        {errors.name && <span>{errors.name.message}</span>}
                                    </Form.Group>
                                </Row>

                                <Form.Group className='mb-3' controlId='address'>
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control {...register('address', {
                                        required: 'Please enter an address',
                                        minLength : 3, 
                                    })} type='text' />
                                    {errors.address && <span>{errors.address.message}</span>}
                                </Form.Group>

                                <Form.Group className='mb-3' controlId='city'>
                                    <Form.Label>City</Form.Label>
                                    <Form.Control {...register('city', {
                                        required: 'Please enter a city',
                                        minLength : 3, 
                                    })} type='text' />
                                    {errors.city && <span>{errors.city.message}</span>}
                                </Form.Group>

                                <Form.Group className='mb-3' controlId='description'>
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control {...register('description', {
                                        required: 'Please enter a description',
                                        minLength : 6, 
                                    })} type='text' />
                                    {errors.description && <span>{errors.description.message}</span>}
                                </Form.Group>

                                <Form.Group className='mb-3' controlId='type'>
                                    <Form.Label>Type of restaurant</Form.Label>
                                    <Form.Select {...register('type', {
                                        required: 'Please select the type of restaurant',
                                    })}>
                                        <option value='fastfood'>Fastfood</option>
                                        <option value='finedining'>Fine Dining</option>
                                        <option value='pizzeria'>Pizzeria</option>
                                        <option value='foodtruck'>Foodtruck</option>
                                    </Form.Select>
                                    {errors.type && <span>{errors.type.message}</span>}
                                </Form.Group>

                                <Form.Group className='mb-3' controlId='selection'>
                                    <Form.Label>Restaurant selection</Form.Label>
                                    <Form.Select {...register('selection', {
                                        required: 'Please select the restaurants selection',
                                    })}>
                                        <option value='lunch'>Lunch</option>
                                        <option value='afterwork'>Afterwork</option>
                                        <option value='dinner'>Dinner</option>
                                    </Form.Select>
                                    {errors.selection && <span>{errors.selection.message}</span>}
                                </Form.Group>

                                <Button className='primary' type="submit">Add</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col> 
            </Row>
        </div>
    )
}

export default CreateRestaurantForm