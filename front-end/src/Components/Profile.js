import { useEffect, useState } from "react";
import axios from "axios";
import { apiURL } from "../Util/apiURL.js";
const API = apiURL();
function Profile() {
  const [profile, setProfile] = useState([]);
  const [available, setAvailable] = useState([]);
  const [goals, setGoals] = useState([]);

  const getProfile = async () => {
    try {
      const { data } = await axios.get(`${API}/users/14`);
      console.log(data[0].image);
      setProfile(data[0]);
      setAvailable(data[0].availabledays);
      setGoals(data[0].goals);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    return getProfile();
  }, []);

  return (
    <div id="pro">
      <br />
      <h4>Profile</h4>
      <p>Username:{profile.username}</p>
      <p>
        {" "}
        Name: {profile.name} {profile.lastname}
      </p>
      <p>Gender: {profile.gender}</p>
      <p>Location:{profile.location}</p>
      <p>
        Availablility:{available[0]},{available[1]}
      </p>
      <p>
        Experience : {profile.experience}
      </p>
      <p>
        Goals: {goals[0]},{goals[1]}, {goals[2]}, {goals[3]}
              </p>
      <p>Radius:{profile.radius} miles</p>
      <a href="https://www.instagram.com/">
        <img src="https://cdn2.iconfinder.com/data/icons/social-media-2285/512/1_Instagram_colored_svg_1-1024.png" alt="ig" style={{ width: "20px" }} />
      </a>
      <a href="https://www.facebook.com/">
        <img src="https://cdn1.iconfinder.com/data/icons/social-media-2285/512/Colored_Facebook3_svg-256.png" alt="ig" style={{ width: "20px" }} />
      </a>
      <a href="https://www.messenger.com/">
        <img src="https://cdn4.iconfinder.com/data/icons/social-media-2285/1024/logo-256.png" alt="ig" style={{ width: "20px" }} />
      </a>
      <a href="https://twitter.com/?lang=en">
        <img src="https://cdn2.iconfinder.com/data/icons/social-media-2285/512/1_Twitter3_colored_svg-256.png" alt="ig" style={{ width: "20px" }} />
      </a>
    </div>
  );
}
export default Profile;
