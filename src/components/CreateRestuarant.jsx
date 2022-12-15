import { collection, addDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { useForm } from 'react-hook-form'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import GoogleApi from '../services/GoogleApi'
import { useState } from 'react'





const CreateRestaurantForm = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm()
    const [error ,setError] = useState(false)
    const [success ,setSuccess] = useState(false)

    // Create 'restaurants' collection
    const onCreateRestaurant = async (data) => {
        // add document to collection 'restaurants
        if(await GoogleApi.LatLong(`${data.address}, ${data.city}`)){
            await addDoc(collection(db, 'restaurants'), {
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
                coordinates: await GoogleApi.LatLong(data.address + data.city),
            })

            setSuccess(true)
        }

        else{
            setError(true)
        }
        // reset the form
        reset() 
    }

    return (
                <Container >

                    <Form onSubmit={handleSubmit(onCreateRestaurant)} noValidate>

                        <Form.Group as={Col} controlId='name' className='mb-2'>
                            <Form.Label>Name</Form.Label>
                            {/* spread register and save the data under 'name' */}
                            <Form.Control {...register("name", {
                                required: "Please enter a name",
                                minLength : {
                                    value: 3,
                                    message: 'The name needs to be 3 characters long',
                                }, 
                            })} type='text' />
                            {errors.name && <span>{errors.name.message}</span>}
                        </Form.Group>

                        <Form.Group controlId='address' className='mb-2'>
                            <Form.Label>Address</Form.Label>
                            <Form.Control {...register('address', {
                                required: 'Please enter an address',
                                minLength : {
                                    value: 3,
                                    message: 'The address needs to be 3 characters long',
                                }, 
                            })} type='text' />
                            {error && <span>Invalid Adress or City</span>}
                        </Form.Group>

                        <Form.Group className='mb-2' controlId='city'>
                            <Form.Label>City</Form.Label>
                            <Form.Control {...register('city', {
                                required: 'Please enter a city',
                                minLength : {
                                    value: 3,
                                    message: 'The city needs to be 3 characters long',
                                }, 
                            })} type='text' />
                             {error && <span>Invalid Adress or City</span>}
                        </Form.Group>

                        <Form.Group className='mb-2' controlId='description'>
                            <Form.Label>Description</Form.Label>
                            <Form.Control 
                                {...register('description', {
                                required: 'Please enter a description',
                                minLength : {
                                    value: 3,
                                    message: 'The description needs to be 3 characters long',
                                }, 
                            })} type='text' as='textarea' />
                            {errors.description && <span>{errors.description.message}</span>}
                        </Form.Group>

                         <Form.Group className='mb-2' controlId='type'>
                            <Form.Label>Type of restaurant</Form.Label>
                            <Form.Select {...register('type', {
                                required: 'Please select the type of restaurant',
                            })}>
                                <option value='fastfood'>Fastfood</option>
                                <option value='restaurant'>Restaurant</option>
                                <option value='pizzeria'>Pizzeria</option>
                                <option value='foodtruck'>Foodtruck</option>
                                <option value='cafe'>Café</option>
                            </Form.Select>
                            {errors.type && <span>{errors.type.message}</span>}
                        </Form.Group>

                        <Form.Group className='mb-2' controlId='selection'>
                            <Form.Label>Restaurant selection</Form.Label>
                            <Form.Select {...register('selection', {
                                required: 'Please select the restaurants selection',
                            })}>
                                <option value='lunch'>Lunch</option>
                                <option value='afterwork'>Afterwork</option>
                                <option value='dinner'>Dinner</option>
                                <option value='fika'>"Fika"</option>
                            </Form.Select>
                            {errors.selection && <span>{errors.selection.message}</span>}
                        </Form.Group>

                        <Form.Group className='mb-2' controlId='email'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control {...register('email')}/>
                        </Form.Group>

                        <Form.Group className='mb-2' controlId='phone'>
                            <Form.Label>Phone</Form.Label>
                            <Form.Control {...register('phone')}/>
                        </Form.Group>

                        <Form.Group className='mb-2' controlId='website'>
                            <Form.Label>Website</Form.Label>
                            <Form.Control {...register('website')}/>
                        </Form.Group>

                        <Form.Group className='mb-2' controlId='facebook'>
                            <Form.Label>Facebook</Form.Label>
                            <Form.Control {...register('facebook')}/>
                        </Form.Group>

                        <Form.Group className='mb-2' controlId='instagram'>
                            <Form.Label>Instagram</Form.Label>
                            <Form.Control {...register('instagram')}/>
                        </Form.Group>

                        <Button variant='primary' type="submit">Add</Button>
                        {success && (
                            <p>
                                Restaurant created!
                            </p>
                        )}
                    </Form>
                </Container>
    )
}

export default CreateRestaurantForm