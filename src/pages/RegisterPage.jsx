import React, { useRef, useState } from 'react'
import { Form, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useRegister } from '../hooks/useRegister'

function RegisterPage() {
	const emailRef = useRef()
	const displayNameRef = useRef()
	const passwordRef = useRef()
	const [photo, setPhoto] = useState(false)
    const [imageError, setImageError] = useState(null)
    const { register, error, isPending } = useRegister()

	const handleFileChange = (e) => {
        let selected = e.target.files[0]

        if (!e.target.files.length) {
			setPhoto(null)
			return
		}
        if (!selected.type.includes('image')) {
            setImageError('Selected file must be an image')
            return
        }
        if (selected.size > 150000) {
            setImageError('Image file size must be less than 100kb')
            return
        }

		setPhoto(e.target.files[0])
		console.log("File changed!", e.target.files[0])
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        register(emailRef.current.value, passwordRef.current.value, displayNameRef.current.value, photo)


    }

	return (
		<div>
            <Card>
                <Card.Body>
                    <Form onSubmit={handleSubmit}>

                        <Form.Group id="displayName" className="mb-3">
                            <Form.Label>Namn</Form.Label>
                            <Form.Control type="text" ref={displayNameRef} required />
                        </Form.Group>

                        <Form.Group id="email" className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>

                        <Form.Group id="photo" className="mb-3">
                            <Form.Label>Photo</Form.Label>
                            <Form.Control type="file" onChange={handleFileChange} />
                            <Form.Text>
                                {imageError}
                            </Form.Text>
                        </Form.Group>

                        <Form.Group id="password" className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required />
                        </Form.Group>
                        {!isPending && <button className="btn">Sign up</button>}
                        {isPending && <button className="btn" disabled>loading</button>}
                        {error && <div className="error">{error}</div>}
                    </Form>
                </Card.Body>
            </Card>

            <div>
                <Link to="/login">Log in instead?</Link>
            </div>
        </div>
	)
}

export default RegisterPage