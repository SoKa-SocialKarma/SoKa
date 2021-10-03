import { useRef, useState, useEffect } from 'react'
import { useAuth, useAPI } from '../Context/AuthContext'
import { Link, Redirect } from 'react-router-dom'

import { Form, Button, Card, Alert } from 'react-bootstrap'

const Signp = () => {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { signUp } = useAuth()
  const { currentUser } = useAPI()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [mustRedirect, setMustRedirect] = useState(false)


  useEffect(() => {
    if (currentUser) {
      setMustRedirect(true)
    }
  }, [currentUser])


  async function handleSubmit (e) {
    e.preventDefault()

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Passwords do not match!')
    }

    try {
      setError('')
      setLoading(true)
      await signUp(emailRef.current.value, passwordRef.current.value)
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
    {mustRedirect && <Redirect to={`users/newUser`} />}
      <Card className='loginDashboard'>
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
            <Button disabled={loading} className='w-100 mt-4 bts-mui-bt' type='submit'>
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className='w100 text-center mt-2'>
        Already have an account? <Link to='/login' className="loginLinks">Log In</Link>
      </div>
    </>
  )
}

export default Signp
