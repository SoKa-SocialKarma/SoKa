import { useAPI } from '../Context/AuthContext'
import { Link } from 'react-router-dom'

import Profile from '../Components/Profile'
import defaultProfileImage from '../Assets/defaultProfile.png'
// import Reviews from '../Components/Notifications'

function UserProfile () {
  const { currentUserData } = useAPI()
  const { id, name, lastname, username, image } = currentUserData
  return (
    <>
      <div id='card'>
        <h2>
          {name} {lastname}
        </h2>
        <div id='prof'>
          <h3>{username}</h3>
          <img
            src={image.url || defaultProfileImage}
            alt={username}
            style={{ width: '200px', height: '180px' }}
          />
          <br />
          <br />
          <h4>
            Badges:
            <img
              src='https://img.icons8.com/nolan/2x/pull-up-bar.png'
              alt=''
              style={{ width: '36px', height: '36px' }}
            />
            <img
              src='https://img.icons8.com/nolan/2x/exercise.png'
              alt=''
              style={{ width: '36px', height: '36px' }}
            />
            <img
              src='https://img.icons8.com/nolan/2x/dumbbell.png'
              alt=''
              style={{ width: '36px', height: '36px' }}
            />
          </h4>
        </div>
        <div>
          <Link to={`/users/${id}/edit`}>
            <button>EDIT</button>
          </Link>

          <button>NOTIFICATIONS</button>
        </div>

        <Profile />
      </div>
    </>
  )
}
export default UserProfile
