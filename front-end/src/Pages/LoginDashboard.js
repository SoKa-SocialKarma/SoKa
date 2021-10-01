import { useState } from 'react'
import { useAPI, useAuth } from '../Context/AuthContext'
import { Link, useHistory } from 'react-router-dom'

import { Card, Button, Alert } from 'react-bootstrap'

const LoginDashBoard = () => {
  const [error, setError] = useState('')
  const { currentUser, logOut, resetState } = useAuth()
  const { currentUserData } = useAPI()
  const history = useHistory()

  async function handleLogOut () {
    setError('')

    try {
      await logOut()
      resetState()
      history.push('/')
    } catch {
      setError('Failed to log out')
    }
  }

  return (
    <>
      <Card className='loginDashboard'>
        <Card.Body>
          <h2 className='text-center mb-4'>Profile</h2>
          {error && <Alert variant='danger'>{error}</Alert>}
          <strong>Email:</strong> {currentUser?.email}
          <Link to={`/users/${currentUserData?.id}/update-login-profile`} className='btn btn-primary w-100 mt-3 bts-mui-bt'>
            Update Profile
          </Link>
        </Card.Body>
      </Card>
      <div className='w100 text-center mt-2'>
        <Button variant='link' onClick={handleLogOut} style={{color:'white!important'}} color='#6C63FF'>
          Log Out
        </Button>
      </div>
    </>
  )
}

export default LoginDashBoard
