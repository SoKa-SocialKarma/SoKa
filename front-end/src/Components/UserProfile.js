import { useState } from "react"
import Profile from "./Profile"
import purpBackground from '../Assets/purpBackground.jpg'



function UserProfile() {
  const [user, setUser] = useState("")
  const userView = ["profile", "edit", "notifications"];

  return (
    <div>
      <div id='profHeader'>
        <img class='profBackground' src={purpBackground} alt='Two people working out' />
        <img class='profPic' src="https://images.pexels.com/photos/2078265/pexels-photo-2078265.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="" style={{ width: "200px", height: "180px" }} />
      </div>
      <div id='card'>
        <div id="prof">
          <h2>Jack Green</h2>
          <br />
          <br />
        </div>
        <Profile />
      </div >
    </div>

  )
}
export default UserProfile
