import { Button, Navbar } from 'react-bootstrap'
import { logout } from '../api/notes.api'
import { User } from '../models/user'

interface NavBarLoggedOutViewProps {
  onSignUpClicked: () => void
  onLoginClicked: () => void
}

const NavBarLoggedOutView = ({
  onSignUpClicked,
  onLoginClicked,
}: NavBarLoggedOutViewProps) => {
  return (
    <>
      <Button onClick={onSignUpClicked}>Sign Up</Button>
      <Button onClick={onLoginClicked}>Login</Button>
    </>
  )
}

export default NavBarLoggedOutView
