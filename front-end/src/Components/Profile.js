import { useAPI } from '../Context/AuthContext'

function Profile () {
  const { currentUserData } = useAPI()

  const {
    name,
    lastname,
    username,
    gender,
    location,
    availabledays,
    experience,
    goals,
    radius
  } = currentUserData

  return (
    <div id='pro'>
      <br />
      <h4>Profile</h4>
      <p>Username:{username}</p>
      <p>
        {' '}
        Name: {name} {lastname}
      </p>
      <p>Gender: {gender}</p>
      <p>Location:{location}</p>
      <p>
        Availablility:{availabledays[0]},{availabledays[1]}
      </p>
      <p>Experience : {experience}</p>
      <p>
        Goals: {goals[0]},{goals[1]}, {goals[2]}, {goals[3]}
      </p>
      <p>Radius:{radius} miles</p>
      <a href='https://www.instagram.com/'>
        <img
          src='https://cdn2.iconfinder.com/data/icons/social-media-2285/512/1_Instagram_colored_svg_1-1024.png'
          alt='ig'
          style={{ width: '20px' }}
        />
      </a>
      <a href='https://www.facebook.com/'>
        <img
          src='https://cdn1.iconfinder.com/data/icons/social-media-2285/512/Colored_Facebook3_svg-256.png'
          alt='ig'
          style={{ width: '20px' }}
        />
      </a>
      <a href='https://www.messenger.com/'>
        <img
          src='https://cdn4.iconfinder.com/data/icons/social-media-2285/1024/logo-256.png'
          alt='ig'
          style={{ width: '20px' }}
        />
      </a>
      <a href='https://twitter.com/?lang=en'>
        <img
          src='https://cdn2.iconfinder.com/data/icons/social-media-2285/512/1_Twitter3_colored_svg-256.png'
          alt='ig'
          style={{ width: '20px' }}
        />
      </a>
    </div>
  )
}
export default Profile
