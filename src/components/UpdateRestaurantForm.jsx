import {Col, Card, Form, Button } from 'react-bootstrap'
import { doc, updateDoc, Timestamp } from 'firebase/firestore'
import { db } from '../firebase'
import { useForm } from 'react-hook-form'

const UpdateRestaurantForm = ({restaurant}) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm()

    const onUpdateRestaurant = async (data) => {
        await updateDoc(doc(db, 'restaurants', restaurant.id), {
            name: data.name,
            address: data.address,
            city: data.city,
            description: data.description,
            type: data.type,
            selection: data.selection,
            email: data.email,
            phone: data.phone,
            website: data.website,
            facebook: data.facebook,
            instagram: data.instagram,
        })
        reset()
    }
    console.log(restaurant)
    return( 
        <Card>
            <Card.Body>
                <Card.Title>Update: {restaurant.name}</Card.Title>

                <Form onSubmit={handleSubmit(onUpdateRestaurant)} noValidate>
                    <Form.Group as={Col} controlId='name' className='mb-2'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control {...register("name", {
                            required: "Please enter a name",
                            minLength : {
                                value: 3,
                                message: 'The name needs to be 3 characters long',
                            }, 
                        })} 
                            type='text'
                            defaultValue={restaurant.name}
                         />
                        {errors.name && <span>{errors.name.message}</span>}
                    </Form.Group>

                    <Form.Group as={Col} controlId='address' className='mb-2'>
                        <Form.Label>Address</Form.Label>
                        <Form.Control {...register("address", {
                            minLength : {
                                value: 3,
                                message: 'The address needs to be 3 characters long',
                            }, 
                        })} 
                            type='text'
                            defaultValue={restaurant.address}
                         />
                    </Form.Group>

                    <Form.Group as={Col} controlId='city' className='mb-2'>
                        <Form.Label>City</Form.Label>
                        <Form.Control {...register("city", {
                            minLength : {
                                value: 3,
                                message: 'The city needs to be 3 characters long',
                            }, 
                        })} 
                            type='text'
                            defaultValue={restaurant.city}
                         />
                    </Form.Group>

                    <Form.Group as={Col} controlId='description' className='mb-2'>
                        <Form.Label>Description</Form.Label>
                        <Form.Control {...register("description", {
                            minLength : {
                                value: 3,
                                message: 'The description needs to be 3 characters long',
                            }, 
                        })} 
                            type='text'
                            as='textarea'
                            defaultValue={restaurant.description}
                         />
                    </Form.Group>

                    <Form.Group as={Col} className='mb-2' controlId='type'>
                            <Form.Label>Type of restaurant</Form.Label>
                            <Form.Select {...register('type', {
                                required: 'Please select the type of restaurant',
                            })}>
                                <option value={restaurant.type}>{restaurant.type}</option>
                                <option value='fastfood'>Fastfood</option>
                                <option value='restaurant'>Restaurant</option>
                                <option value='pizzeria'>Pizzeria</option>
                                <option value='foodtruck'>Foodtruck</option>
                                <option value='cafe'>Café</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group as={Col} className='mb-2' controlId='selection'>
                            <Form.Label>Restaurant selection</Form.Label>
                            <Form.Select {...register('selection', {
                                required: 'Please select the restaurants selection',
                            })}>
                                <option value={restaurant.selection}>{restaurant.selection}</option>
                                <option value='lunch'>Lunch</option>
                                <option value='afterwork'>Afterwork</option>
                                <option value='dinner'>Dinner</option>
                                <option value='fika'>"Fika"</option>
                            </Form.Select>
                            {errors.selection && <span>{errors.selection.message}</span>}
                        </Form.Group>

                        <Form.Group as={Col} className='mb-2' controlId='email'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control 
                                {...register('email')}
                                defaultValue={restaurant.email}
                            />
                        </Form.Group>

                        <Form.Group as={Col} className='mb-2' controlId='phone'>
                            <Form.Label>Phone</Form.Label>
                            <Form.Control 
                                defaultValue={restaurant.phone}
                                {...register('phone')}
                            />
                        </Form.Group>

                        <Form.Group as={Col} className='mb-2' controlId='website'>
                            <Form.Label>Website</Form.Label>
                            <Form.Control 
                            defaultValue={restaurant.website} 
                            {...register('website')}
                            />
                        </Form.Group>

                        <Form.Group as={Col} className='mb-2' controlId='facebook'>
                            <Form.Label>Facebook</Form.Label>
                            <Form.Control 
                            defaultValue={restaurant.facebook}
                            {...register('facebook')}
                            />
                        </Form.Group>

                        <Form.Group as={Col} className='mb-2' controlId='instagram'>
                            <Form.Label>Instagram</Form.Label>
                            <Form.Control 
                            defaultValue={restaurant.instagram}
                            {...register('instagram')}
                            />
                        </Form.Group>

                        <Button type='submit'>Update</Button>
                </Form>
            </Card.Body>
        </Card>
    )
}

export default UpdateRestaurantForm