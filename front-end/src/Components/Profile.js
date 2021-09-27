import { useEffect, useState } from "react";
import axios from "axios";
import { apiURL } from "../Util/apiURL.js";
// import { Link } from 'react-router-dom';
import MapBox from "./MapBox";

const API = apiURL();

function Profile() {
  // let index = 14
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
    <div class="container">

      <div id="pro" class="item1">
        <br />
        <h2>About</h2>
        <h6>
          {" "}
          Name: {profile.name} {profile.lastname}
        </h6>
        <h6>Gender: {profile.gender}</h6>
        <h6>Location:{profile.location}</h6>
        <h6>
          Availablility:{available[0]},{available[1]}
        </h6>
        <h6>
          Experience : {profile.experience}
        </h6>
        <h6>
          Goals: {goals[0]},{goals[1]}, {goals[2]}, {goals[3]}
        </h6>
        <h6>Radius:{profile.radius} miles</h6>

      </div>


      <div id="badges" class="item2">
        <h2>Badges</h2>
        <span>
          <img src="https://cdn-icons-png.flaticon.com/512/2928/2928144.png" alt="" style={{ width: "40px" }} />
          <>
            <h4>Great Motivator</h4>
            {/* <h6>-Enthusiastic</h6> */}
          </>
        </span>

        <span>
          <img src="https://cdn-icons-png.flaticon.com/512/4053/4053735.png" alt="" style={{ width: "40px" }} />
          <h4>Spot On</h4>
          {/* <h6>-Assisted in lifting heavy weights safely</h6> */}
        </span>

        <span>
          <img src="https://cdn-icons-png.flaticon.com/512/2843/2843974.png" alt="" style={{ width: "40px" }} />
          <h4>Mobility Master</h4>
          {/* <h6>-Stretch tightented muscles before workout</h6> */}
        </span>

        <span>
          <img src="https://cdn-icons-png.flaticon.com/512/2090/2090622.png" alt="" style={{ width: "40px" }} />
          <h4>Punctuality</h4>
          {/* <h6>-Responds on time</h6> */}
        </span>

        <span>
          <img src="https://cdn-icons-png.flaticon.com/512/2237/2237680.png" alt="" style={{ width: "40px" }} />
          <h4>Cardiologist</h4>
          {/* <h6>-Increase BPM</h6> */}
        </span>
      </div>
      <div id="socials" class="item3" >

        {/* <Link to={`/users/${index}/edit`}>
          <button type="button"  >
            EDIT

          </button>
        </Link>
        <button>
          NOTIFICATIONS
        </button> */}


        <a href="https://www.instagram.com/" target="_blank">
          <img src="https://cdn-icons-png.flaticon.com/128/1400/1400487.png" alt="ig" style={{ width: "50px" }} />
        </a>
        <a href="https://www.facebook.com/" target="_blank">
          <img src="https://cdn-icons-png.flaticon.com/128/1400/1400477.png" alt="ig" style={{ width: "50px" }} />
        </a>
        <a href="https://web.whatsapp.com/">
          <img src="https://cdn-icons-png.flaticon.com/128/3820/3820293.png" alt="ig" style={{ width: "50px" }} />
        </a>
        <a href="https://twitter.com/?lang=en" target="_blank">
          <img src="https://cdn-icons-png.flaticon.com/128/2525/2525779.png" alt="ig" style={{ width: "50px" }} />
        </a>

      </div>
      <div class="item4">
        <div id='map'>
          <MapBox />
        </div>
      </div>
    </div>
  );
}
export default Profile;

// (1,'Great Motivator','{"name":"","url":"https://cdn-icons-png.flaticon.com/512/2928/2928144.png","album":""}',
// '{"info":"Enthusiastic"}'),
// (2,'Spot On','{"name":"","url":"https://cdn-icons-png.flaticon.com/512/4053/4053735.png","album":""}',
// '{"info":"Assisted in lifting heavy weights safely"}'),
// (3,'Mobility Master','{"name":"","url":"https://cdn-icons-png.flaticon.com/512/2843/2843974.png","album":""}',
// '{"info":"Helped stretch tightented muscles before workout"}'),
// (4,'Punctual','{"name":"","url":"https://cdn-icons-png.flaticon.com/512/2090/2090622.png","album":""}',
// '{"info":"Responds to all messages and shows up on time"}'),
// (5,'Cardiologist','{"name":"","url":"https://cdn-icons-png.flaticon.com/512/2237/2237680.png","album":""}',
// '{"info":"Helped increase BPM"}');
