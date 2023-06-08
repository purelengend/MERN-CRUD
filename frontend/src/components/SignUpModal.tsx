import { Alert, Button, Form, Modal } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { signUp, SignUpCredentials } from '../api/notes.api'
import { User } from '../models/user'
import TextInputField from './form/TextInputField'
import styleUtils from '../styles/utils.module.css'
import { useState } from 'react'
import { ConflictError } from '../errors/http_errors'
interface SignUpModalProps {
  onDismiss: () => void
  onSignUpSuccess: (user: User) => void
}

const SignUpModal = ({ onDismiss, onSignUpSuccess }: SignUpModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpCredentials>()
  const [error, setError] = useState<string | null>()

  const onSubmit = async (credentials: SignUpCredentials) => {
    try {
      const newUser = await signUp(credentials)
      onSignUpSuccess(newUser)
    } catch (error) {
      if (error instanceof ConflictError) setError(error.message)
      else alert(error)
      console.log(error)
    }
  }
  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>Sign Up</Modal.Title>
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
            name='email'
            label='Email'
            type='text'
            placeholder='Email'
            register={register}
            registerOptions={{ required: 'Required' }}
            error={errors.email}
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
            Sign Up
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default SignUpModal
