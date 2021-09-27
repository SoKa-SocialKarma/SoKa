import { useRef, useState} from 'react'
import { useAuth } from '../Context/AuthContext'
import { Link } from 'react-router-dom'

import { Form, Button, Card, Alert } from 'react-bootstrap'

const Login = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { logIn } = useAuth()
  const emailRef = useRef()
  const passwordRef = useRef()

 

  const goToDemo = async () => {
    try {
      setError('')
      setLoading(true)
      await logIn('demo@soka.com', 'pursuit')
    } catch (error) {
      const message = error.message
        .split(' ')
        .filter(word => {
          return (
            word !== 'Firebase:' &&
            word !== '(auth/user-not-found).' &&
            word !== '(auth/wrong-password).'
          )
        })
        .join(' ')
      setError(`Failed to Sign In. ${message}`)
    }
    setLoading(false)
  }

  async function handleSubmit (e) {
    e.preventDefault()

    try {
      setError('')
      setLoading(true)
      await logIn(emailRef.current.value, passwordRef.current.value)
    } catch (error) {
      const message = error.message
        .split(' ')
        .filter(word => {
          return (
            word !== 'Firebase:' &&
            word !== '(auth/user-not-found).' &&
            word !== '(auth/wrong-password).'
          )
        })
        .join(' ')
      setError(`Failed to Sign In. ${message}`)
    }
    setLoading(false)
  }

  return (
    <>
      <Card className='loginDashboard'>
        <Card.Body>
          <h2 className='text-center mb-4'>Log In</h2>
          {error && <Alert variant='danger'>{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control type='email' ref={emailRef} required />
            </Form.Group>
            <Form.Group id='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control type='password' ref={passwordRef} required />
            </Form.Group>
            <Button
              disabled={loading}
              className='w-100 mt-4 bts-mui-bt'
              type='submit'
              color='#6C63FF'
            >
              Log In
            </Button>
          </Form>
          <div className='w-100 text-center mt-3'>
            <Link to='/forgot-password'>Forgot Password?</Link>
          </div>
        </Card.Body>
      </Card>
      <div className='w100 text-center mt-2'>
        Need an account? <Link to='/signup'>Sign Up</Link>
      </div>
      <Button
        disabled={loading}
        className='demoButton bts-mui-bt'
        onClick={goToDemo}
      >
        Demo LogIn
      </Button>
    </>
  )
}

export default Login
