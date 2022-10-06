import { Container, Button, Form, Card } from 'react-bootstrap'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore' 
import { db } from '../firebase'
import { useForm } from 'react-hook-form'

const TipForm = () => {
    const {register, handleSubmit, formState: { errors }, reset } = useForm()

    // creates collection 'tips'
    const onCreateTip = async (data) => {
        // add document to collection 'tips'
        await addDoc(collection(db, 'tips'), {
            completed: false,
            created: serverTimestamp(),
            name: data.name,
            address: data.address,
            description: data.description,
        })
        reset()
    }

    return(
        <Container>
            <Form onSubmit={handleSubmit(onCreateTip)} noValidate>

                <Form.Group controlId='name' className='mb-3'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control 
                        {...register("name", {
                            required: "Enter the name of the restaurant",
                            minLength: {
                                value: 3,
                                message: "The name needs to be 3 characters long",
                            }
                        })} 
                        type="text"
                    />
                    {errors.name && <span>{errors.name.message}</span>}
                </Form.Group>

                <Form.Group controlId="address" className="mb-3">
                    <Form.Label>Address</Form.Label>
                    <Form.Control 
                        {...register("address")} 
                        type="text"
                    />
                </Form.Group>

                <Form.Group controlId="description" className="mb-3">
                    <Form.Label>Kommentar?</Form.Label>
                    <Form.Control 
                        {...register("description")} 
                        as="textarea" 
                        type="text"
                        rows={3} 
                    />
                </Form.Group>
                <div className="d-flex justify-content-between">
                    <Button type="submit">Skicka tips</Button>
                </div>
            </Form>
        </Container>
    )
}

export default TipForm