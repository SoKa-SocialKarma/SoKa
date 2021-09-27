import { useState } from 'react'
import { useAuth, useAPI } from '../Context/AuthContext'
import { Link, useHistory } from 'react-router-dom'

import { Card, Button, Alert } from 'react-bootstrap'

const LoginDashBoard = () => {
  const [error, setError] = useState('')
  const { currentUser, logOut } = useAuth()
  const {setCurrentUserData, setCurrentSearchResults} = useAPI() 
  const history = useHistory()

  async function handleLogOut () {
    setError('')

    try {
      await logOut()
      setCurrentUserData({})
      setCurrentSearchResults([])
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
          <strong>Email:</strong> {currentUser.email}
          <Link to='/update-profile' className='btn btn-primary w-100 mt-3 bts-mui-bt'>
            Update Profile
          </Link>
        </Card.Body>
      </Card>
      <div className='w100 text-center mt-2'>
        <Button variant='link' onClick={handleLogOut} style={{color:'white!important'}}>
          Log Out
        </Button>
      </div>
    </>
  )
}

export default LoginDashBoard
