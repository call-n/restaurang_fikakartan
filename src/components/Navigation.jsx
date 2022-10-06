import Container from 'react-bootstrap/Container'
import Image from 'react-bootstrap/Image'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { Link, NavLink } from 'react-router-dom'
// import { useAuthContext } from '../contexts/AuthContext'
import { NavDropdown } from 'react-bootstrap'

const Navigation = () => {
	// const { currentUser, userName, userEmail, userPhotoUrl } = useAuthContext()

	return (
		<Navbar bg="dark" variant="dark" expand="md">
			<Container>
				<Navbar.Brand as={Link} to="/">
					Firebase Todos
				</Navbar.Brand>

				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="ms-auto align-items-center">
						{
							// currentUser ? (
							// 	<>
							// 		{/* User is logged in */}
							// 		<Nav.Link as={NavLink} end to="/todos">Todos</Nav.Link>

							// 		<NavDropdown title={
							// 			userPhotoUrl
							// 				? <Image
							// 					src={userPhotoUrl}
							// 					height={30}
							// 					width={30}
							// 					fluid
							// 					roundedCircle
							// 				  />
							// 				: userName || userEmail
							// 		}>
							// 			<NavLink to="/update-profile" className="dropdown-item">Update Profile</NavLink>
							// 			<NavDropdown.Divider />
							// 			<NavLink to="/logout" className="dropdown-item">Log Out</NavLink>
							// 		</NavDropdown>
							// 	</>
							// ) : (
							// 	<>
							// 		{/* No user is logged in */}
							// 		<Nav.Link as={NavLink} to="/login">Login</Nav.Link>
							// 		<Nav.Link as={NavLink} to="/signup">Signup</Nav.Link>
							// 	</>
							// )
						}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	)
}

export default Navigation
