import { Container, Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { User } from '../models/user'
import NavBarLoggedInView from './NavBarLoggedInView'
import NavBarLoggedOutView from './NavBarLoggedOutView'

interface NavBarProps {
  loggedInUser: User | null
  onSignUpClicked: () => void
  onLoginClicked: () => void
  onLogoutSuccess: () => void
}

const NavBar = ({
  loggedInUser,
  onSignUpClicked,
  onLoginClicked,
  onLogoutSuccess,
}: NavBarProps) => {
  return (
    <Navbar bg='primary' variant='dark' expand='sm' sticky='top'>
      <Container>
        <Navbar.Brand as={Link} to='/'>
          Pure Notes App
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='main-navbar' />
        <Navbar.Collapse id='main-navbar'>
          <Nav>
            <Nav.Link as={Link} to='/privacy'>
              Privacy
            </Nav.Link>
          </Nav>
          <Nav className='ms-auto'>
            {loggedInUser ? (
              <NavBarLoggedInView
                user={loggedInUser}
                onLogoutSuccess={onLogoutSuccess}
              />
            ) : (
              <NavBarLoggedOutView
                onLoginClicked={onLoginClicked}
                onSignUpClicked={onSignUpClicked}
              />
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBar
