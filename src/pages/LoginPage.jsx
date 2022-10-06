import { useState } from 'react'
import { useLogin } from '../hooks/useLogin'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { login, error, isPending } = useLogin()

    const handleSubmit = (e) => {
        e.preventDefault()
        login(email, password)
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control 
                    type="email" 
                    placeholder="Enter email" 
                    onChange={(e) => setEmail(e.target.value)} 
                    value={email} 
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                    type="password" 
                    onChange={(e) => setPassword(e.target.value)} 
                    value={password}  
                />
            </Form.Group>
            {!isPending && <Button variant="primary" type="submit">Log in</Button>}
            {isPending && <Button variant="primary" type="submit" disabled>loading</Button>}
            {error && <div className="error">{error}</div>}
        </Form>
    )
}

export default LoginPage