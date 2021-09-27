import { useEffect, useState } from "react";
import axios from "axios";
import { apiURL } from "../Util/apiURL.js";
import linkedin from "../Assets/linkedin.png";
// import { Link } from 'react-router-dom';
import MapBox from "./MapBox";
import purpBackground from '../Assets/purpBackground.jpg'
import facebook from '../Assets/facebook.png'
import instagram from '../Assets/instagram.png'
import twitter from '../Assets/twitter.png'

// const API = apiURL();

// function Profile() {
// let index = 14
// const [ setProfile] = useState([]);
// const [available, setAvailable] = useState([]);
// const [goals, setGoals] = useState([]);
import { useAPI } from '../Context/AuthContext'

function Profile() {
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
      </div >
      <div class="container">

        <div id="pro" class="item1">
          <br />
          <h2>About</h2>
          <h6>
            {" "}
            Name: {name} {lastname}
          </h6>
          <h6>Gender: {gender}</h6>
          <h6>Location:{location}</h6>
          <h6>
            Availablility:{availabledays[0]},{availabledays[1]}
          </h6>
          <h6>
            Experience : {experience}
          </h6>
          <h6>
            Goals: {goals[0]},{goals[1]}, {goals[2]}, {goals[3]}
          </h6>
          <h6>Radius:{radius} miles</h6>

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
            <img src={instagram} alt="instagram login" style={{ width: "50px" }} />
          </a>
          <a href="https://www.facebook.com/" target="_blank">
            <img src={facebook} alt="facebook login" style={{ width: "50px" }} />
          </a>
          <a href="https://www.linkedin.com/">
            <img src={linkedin} alt="Linkedin login" style={{ width: "50px" }} />
          </a>
          <a href="https://twitter.com/?lang=en" target="_blank">
            <img src={twitter} alt="Twitter login" style={{ width: "50px" }} />
          </a>

        </div>
        <div class="item4">
          <div id='map'>
            <MapBox />
          </div>
        </div>
      </div>
    </div>
  )
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
