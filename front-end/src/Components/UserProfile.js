import { useState } from "react";
import EditProfile from "./EditProfile.js";
import Profile from "./Profile"
import Reviews from "./Notifications"


function UserProfile() {
  const [user, setUser] = useState("")
  const userView = ["profile", "edit", "notifications"];
  return (
    <div id='card'>
      <h2>Jack Green</h2>
      <div id="prof">
        <h3>tinygoose9959</h3>
        <img src="https://images.pexels.com/photos/2078265/pexels-photo-2078265.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="" style={{ width: "200px", height: "180px" }} />
        <br />
        <br />
        <h4>Badges:
          <img src="https://img.icons8.com/nolan/2x/pull-up-bar.png" alt="" style={{ width: "36px", height: "36px" }} />
          <img src="https://img.icons8.com/nolan/2x/exercise.png" alt="" style={{ width: "36px", height: "36px" }} />
          <img src="https://img.icons8.com/nolan/2x/dumbbell.png" alt="" style={{ width: "36px", height: "36px" }} /></h4>

      </div>

      <div>
        {userView.map(userV => (
          <button type="button" key={userV} onClick={() => setUser(userV)}>
            {userV.toLocaleUpperCase()}
          </button>
        ))}
      </div>
      <p>{user === "profile" && <Profile />}</p>
      <p>{user === "edit" && <EditProfile />} </p>
      <p>{user === "notifications" && <Reviews />} </p>
    </div >
  );
}
export default UserProfile;

