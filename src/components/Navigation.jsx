import Container from 'react-bootstrap/Container'
import Image from 'react-bootstrap/Image'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { Link, NavLink } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'
import { NavDropdown } from 'react-bootstrap'
import { useLogout } from '../hooks/useLogout'

const Navigation = () => {
	const { user } = useAuthContext()
	const { logout, isPending } = useLogout()

	return (
		<Navbar bg="dark" variant="dark" expand="md">
			<Container>
				<Navbar.Brand as={Link} to="/">
					Kaffe Kaga Karta
				</Navbar.Brand>

				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="ms-auto align-items-center">
						{
							user ? (
								<>
									{/* User is logged in */}

									<NavDropdown title={
										user.photoURL
											? <Image
												src={user.photoURL}
												height={30}
												width={40}
												fluid
												roundedCircle
											  />
											: user.name || user.email
									}>
										<NavLink to='/admin' className='dropdown-item'>User List</NavLink>
										<NavLink to='/create-restaurant' className='dropdown-item'>Create Restaurant</NavLink>
										<NavLink to='/restaurants' className='dropdown-item'>Restaurants</NavLink>
										<NavLink to='/tips' className='dropdown-item'>Pending Tips</NavLink>
										<NavDropdown.Divider />
										{user && (
											<li>
												{!isPending && <button className="btn" onClick={logout}>Logout</button>}
												{isPending && <button className="btn" disabled>Logging out...</button>}
											</li>
											)}
									</NavDropdown>
								</>
							) : (
								<>
									{/* No user is logged in */}
									<Nav.Link as={NavLink} to="/login">Login</Nav.Link>
									<Nav.Link as={NavLink} to="/register">Signup</Nav.Link>
								</>
							)
						}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	)
}

export default Navigation
