import { useRef, useState } from "react";
import { Card, Form } from "react-bootstrap";
import { useAuthContext } from "../contexts/AuthContext";


const UpdateProfila = () => {
	const displayNameRef = useRef();
	const passwordRef = useRef();
	const passwordConfirmRef = useRef();
	const [image, setImage] = useState(false);
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(false)

	const {
		currentUser,
		reloadUser,
		updateDisplayNameAndPhoto,
		updateUserPassword,
	} = useAuthContext();

	const handleFileChange = (e) => {
		if (!e.target.files.length) {
			setImage(null);
			return;
		}

		setImage(e.target.files[0]);
		console.log("File changed!", e.target.files[0]);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (passwordRef.current.value !== passwordConfirmRef.current.value) {
			return setError("The passwords does not match");
		}


		//checks for matching password and required length before updating the password
		if(passwordRef.current.value === passwordConfirmRef.current.value && passwordRef.current.value.length >= 6) {
			updateUserPassword(passwordConfirmRef.current.value)
			setSuccess(true)
		}

		setError(null);


		try {
			if (displayNameRef.current.value !== currentUser.displayName || image) {
				await updateDisplayNameAndPhoto(displayNameRef.current.value, image);
			}
			await reloadUser();
		} catch (e) {
			setError(e.message);
		}
	};


	return (
		<Card>
			<Card.Body>
				<div>
					<img
						src={currentUser.photoURL}
						alt="profile-image"
					/>
				</div>
				<Form onSubmit={handleSubmit}>
					<Form.Group id="displayName" className="mb-3">
						<Form.Label>Namn</Form.Label>
						<Form.Control type="text" ref={displayNameRef} defaultValue={currentUser.displayName}   />
					</Form.Group>

					<Form.Group id="photo" className="mb-3">
						<Form.Label>Photo</Form.Label>
						<Form.Control type="file" onChange={handleFileChange} />
					</Form.Group>

					<Form.Group id="password" className="mb-3">
						<Form.Label>Password</Form.Label>
						<Form.Control type="password" ref={passwordRef}  />
					</Form.Group>

					<Form.Group id="password" className="mb-3">
						<Form.Label>Confirm password</Form.Label>
						<Form.Control type="password" ref={passwordConfirmRef}  />
					</Form.Group>

					{error && (
						<div>
							<span>{error}</span>
						</div>
					)}

				

					{success && (
						<p>PASSWORD UPDATED!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!</p>
					)}

					<button>
						Update profile
					</button>
				</Form>
			</Card.Body>
		</Card>

	);
};

export default UpdateProfila;