import purpBackground from '../Assets/purpBackground.jpg'

import { useAPI } from '../Context/AuthContext'

import Profile from '../Components/Profile'
// import Reviews from '../Components/Notifications'

function UserProfile() {
  const { currentUserData } = useAPI()
  const { name, lastname, image } = currentUserData
  return (
    <div>
      <div id='profHeader'>
        <img class='profBackground' src={purpBackground} alt='Two people working out' />
        <img class='profPic' src="https://images.pexels.com/photos/2078265/pexels-photo-2078265.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="" style={{ width: "200px", height: "180px" }} />
      </div>
      <div id='card'>
        <div id="prof">
          <h2>{name} {lastname}</h2>
          <br />
          <br />
        </div>
        <Profile />
      </div >
    </div>

  )
}
export default UserProfile
