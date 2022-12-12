import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import {Form, Card} from 'react-bootstrap'


const Login = () => {
	const emailRef = useRef();
	const passwordRef = useRef();
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);
	const { login } = useAuthContext();
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError(null);

		try {
			setLoading(true);
			await login(emailRef.current.value, passwordRef.current.value);
			navigate("/");
		} catch (err) {
			setError(err.message);
			setLoading(false);
		}
	};

	return (
        <Card>
			{loading && (
				<div>
					lodaing...
				</div>
			)}


            
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control 
                        type="email" 
                        placeholder="Enter email" 
                        ref={emailRef}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        ref={passwordRef}
                    />
                </Form.Group>

                {error && (
                    <div>
                        <span>{error}</span>
                    </div>
                )}

                <button>
                    Sign in
                </button>
            </Form>
        </Card>
	);
};

export default Login;