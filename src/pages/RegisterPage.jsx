import { useRef, useState } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Card, Form } from "react-bootstrap";


const Signup = () => {
	const displayNameRef = useRef();
	const emailRef = useRef();
	const passwordRef = useRef();
	const passwordConfirmRef = useRef();
	const [image, setImage] = useState(false);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);
	const { signup } = useAuthContext();
	const navigate = useNavigate();

	const handleFileChange = (e) => {
		if (!e.target.files[0]) {
			setImage(null);
			return;
		}

		setImage(e.target.files[0]);
		console.log("File changed!", e.target.files[0]);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		//checks for matching passwords
		if (passwordRef.current.value !== passwordConfirmRef.current.value) {
			return setError("The passwords does not match");
		}

		setError(null);
		try {
			setLoading(true);
			await signup(
				emailRef.current.value,
				passwordRef.current.value,
				displayNameRef.current.value,
				image
			);

			navigate("/");

			setLoading(false);
		} catch (err) {
			setError(err.message);
			setLoading(false);
			console.log(err);
		}
	};

	return (
        <div>
			{loading && (
				<div>
					Loading...
				</div>
			)}

        
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
                        </Form.Group>

                        <Form.Group id="password" className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required />
                        </Form.Group>

                        <Form.Group id="password" className="mb-3">
                            <Form.Label>Confirm password</Form.Label>
                            <Form.Control type="password" ref={passwordConfirmRef} required />
                        </Form.Group>

                        {error && (
                            <div>
                                <span>{error}</span>
                            </div>
			    	    )}

                        <button>
                            Create Account
						</button>
                    </Form>
                </Card.Body>
            </Card>

            <div>
                <Link to="/login">Log in instead?</Link>
            </div>
        </div>
	);
};

export default Signup;