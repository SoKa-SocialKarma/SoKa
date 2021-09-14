import {useState} from 'react'
import { Card, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../Context/AuthContext'
import { Link, useHistory } from 'react-router-dom'

const LoginDashBoard = () => {
    const [error, setError] = useState("");
    const { currentUser, logOut } = useAuth();
    const history = useHistory();

    async function handleLogOut(){
        setError("");

        try{
            await logOut();
            history.push('/login');
        }catch{
            setError('Failed to log out');
        }
    }

  return (
    <>
      <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Profile</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <strong>Email:</strong> {currentUser.email}
            <Link to="/update-profile" className="btn btn-primary w-100 mt-3">Update Profile</Link>
          </Card.Body>
      </Card>
      <div className="w100 text-center mt-2">
        <Button variant='link' onClick={handleLogOut}>Log Out</Button>
      </div>
    </>
  )
}

export default LoginDashBoard