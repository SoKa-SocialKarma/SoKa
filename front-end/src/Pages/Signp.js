import { useRef, useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { useAuth } from '../Context/AuthContext'
import { Link, useHistory } from 'react-router-dom'

const Signp = () => {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { signUp } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  async function handleSubmit (e) {
    e.preventDefault()

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Passwords do not match!')
    }

    try {
      setError('')
      setLoading(true)
      await signUp(emailRef.current.value, passwordRef.current.value)
      history.push('/matches')
    } catch (error) {
      const message = error.message
        .split(' ')
        .filter(word => {
          return (
            word !== 'Firebase:' &&
            word !== '(auth/weak-password).' &&
            word !== '(auth/invalid-email).'
          )
        })
        .join(' ')
      setError(`Failed to create an account. ${message}`)
    }
    setLoading(false)
  }

  return (
    <>
      <Card className="loginDashboard">
        <Card.Body>
          <h2 className='text-center mb-4'>Sign Up</h2>
          {error && <Alert variant='danger'>{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='email'
                ref={emailRef}
                placeholder='example@soka.com'
                required
              />
            </Form.Group>
            <Form.Group id='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                ref={passwordRef}
                placeholder='at least 6 characters'
                required
              />
            </Form.Group>
            <Form.Group id='password-confirm'>
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type='password' ref={passwordConfirmRef} required />
            </Form.Group>
            <Button disabled={loading} className='w-100 mt-4' type='submit'>
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className='w100 text-center mt-2'>
        Already have an account? <Link to='/login'>Log In</Link>
      </div>
    </>
  )
}

export default Signp
