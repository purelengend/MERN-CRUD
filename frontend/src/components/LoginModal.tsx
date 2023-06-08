import { Alert, Button, Form, Modal } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { LoginCredentials, login } from '../api/notes.api'
import { User } from '../models/user'
import TextInputField from './form/TextInputField'
import styleUtils from '../styles/utils.module.css'
import { useState } from 'react'
import { UnauthenticatedError } from '../errors/http_errors'
interface LoginModalProps {
  onDismiss: () => void
  onLoginSuccess: (user: User) => void
}

const LoginModal = ({ onDismiss, onLoginSuccess }: LoginModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginCredentials>()

  const [error, setError] = useState<string | null>()
  const onSubmit = async (credentials: LoginCredentials) => {
    try {
      const user = await login(credentials)
      onLoginSuccess(user)
    } catch (error) {
      if (error instanceof UnauthenticatedError) setError(error.message)
      else alert(error)
      console.log(error)
    }
  }
  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>Login Up</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant='danger'>{error}</Alert>}
        <Form onSubmit={handleSubmit(onSubmit)}>
          <TextInputField
            name='username'
            label='Username'
            type='text'
            placeholder='Username'
            register={register}
            registerOptions={{ required: 'Required' }}
            error={errors.username}
          />

          <TextInputField
            name='password'
            label='Password'
            type='password'
            placeholder='Password'
            register={register}
            registerOptions={{ required: 'Required' }}
            error={errors.password}
          />
          <Button
            type='submit'
            disabled={isSubmitting}
            className={styleUtils.width100}
          >
            Login
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default LoginModal
