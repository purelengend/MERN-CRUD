import { Button, Navbar } from 'react-bootstrap'
import { logout } from '../api/notes.api'
import { User } from '../models/user'

interface NavBarLoggedInViewProps {
  user: User
  onLogoutSuccess: () => void
}

const NavBarLoggedInView = ({
  user,
  onLogoutSuccess,
}: NavBarLoggedInViewProps) => {
  const signOut = async () => {
    try {
      await logout()
      onLogoutSuccess()
    } catch (error) {
      alert(error)
      console.error(error)
    }
  }
  return (
    <>
      <Navbar.Text className='me-2'>Signed in as: {user.username}</Navbar.Text>
      <Button onClick={signOut}>Log out</Button>
    </>
  )
}

export default NavBarLoggedInView
