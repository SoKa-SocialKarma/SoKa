import { useRef, useState } from 'react'
import { useAuth } from '../Context/AuthContext'
import { Link, useHistory } from 'react-router-dom'

import { Form, Button, Card, Alert } from 'react-bootstrap'

const UpdateProfile = () => {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { currentUser, updateEmail, updatePassword } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  function handleSubmit (e) {
    e.preventDefault()

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Passwords do not match!')
    }

    const promises = []
    setLoading(true)
    setError('')

    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value))
    }
    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value))
    }

    Promise.all(promises)
      .then(() => {
        history.push('/')
      })
      .catch(error => {
        const message = error.message
          .split(' ')
          .filter(word => {
            return word !== 'Firebase:' && word !== '(auth/weak-password).'
          })
          .join(' ')
        setError(`Error updating profile! ${message}`)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <>
      <Card className='loginDashboard'>
        <Card.Body>
          <h2 className='text-center mb-4'>Update Profile</h2>
          {error && <Alert variant='danger'>{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='email'
                ref={emailRef}
                required
                defaultValue={currentUser.email}
              />
            </Form.Group>
            <Form.Group id='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                ref={passwordRef}
                placeholder='at least 6 characters'
              />
            </Form.Group>
            <Form.Group id='password-confirm'>
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control
                type='password'
                ref={passwordConfirmRef}
                placeholder='leave blank to keep'
              />
            </Form.Group>
            <Button disabled={loading} className='w-100 mt-4' type='submit'>
              Update
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className='w100 text-center mt-2'>
        Already have an account? <Link to='/'>Cancel</Link>
      </div>
    </>
  )
}

export default UpdateProfile
