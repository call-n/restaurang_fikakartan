import Container from 'react-bootstrap/Container'
import Image from 'react-bootstrap/Image'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { Link, NavLink } from 'react-router-dom'
import { NavDropdown } from 'react-bootstrap'
import { useAuthContext } from "../contexts/AuthContext";



const Navigation = () => {

	const { currentUser, isAdmin, logout } = useAuthContext();

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
							currentUser? (
								<>
									{/* User is logged in */}

									<NavDropdown title={
										currentUser?.photoURL
											? <Image
												src={currentUser?.photoURL}
												height={30}
												width={40}
												fluid
												roundedCircle
											  />
											: currentUser?.name || currentUser?.email
									}> {isAdmin && (
										<>
										<NavLink to='/admin' className='dropdown-item'>User List</NavLink>
										<NavLink to='/create-restaurant' className='dropdown-item'>Create Restaurant</NavLink>
										<NavLink to='/tips' className='dropdown-item'>Pending Tips</NavLink>
										</>
									)}
										<NavLink to='/restaurants' className='dropdown-item'>Restaurants</NavLink>
										
										{currentUser && (
											<NavLink to='/updateProfila' className='dropdown-item'>Update Profila</NavLink>
										)}
										<NavDropdown.Divider />
										{currentUser && (
											<li>
												<button className="btn" onClick={() => logout()}>Logout</button>
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
