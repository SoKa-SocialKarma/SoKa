import { Paper } from "@material-ui/core";
import { useAPI } from "../Context/AuthContext";
import { apiURL } from "../Util/apiURL.js";
import { useEffect, useState } from "react";
import axios from "axios";

import { useRouteMatch } from "react-router-dom";
import MapBox from "./MapBox";

import IconButton from "@mui/material/IconButton";
import { makeStyles } from "@material-ui/core/styles";

import defaulProfile from "../Assets/defaultProfile.png";
import facebook from "../Assets/facebook.png";
import instagram from "../Assets/instagram.png";
import twitter from "../Assets/twitter.png";
import pencil from "../Assets/pencil.png";
import userPin from "../Assets/user.png";
import pin from "../Assets/pin.png";
import calendar from "../Assets/calendar.png";
import certification from "../Assets/certification.png";
import target from "../Assets/target.png";
import distance from "../Assets/distance.png";
import linkedin from "../Assets/linkedin.png";

const useStyles = makeStyles({
  root: {
    height: "auto",
    width: "auto",
    marginTop: "15%",
    padding: 0,
    display: "grid",
    gridTemplateRows: "auto minmax(auto,10%) 1fr 1fr",
  },
  flexCenter: {
    display: "flex",
    flexDirection: "column",
    fontSize: "1rem",
  },
});

function Profile() {
  const { currentUserData } = useAPI();
  const { url } = useRouteMatch();
  const API = apiURL();
  const edit = url
    .split("/")
    .filter((page) => page !== "profile")
    .concat("edit")
    .join("/");
  const classes = useStyles();
  console.log(`${API} is this`);

  ////////

  const [profile, setProfile] = useState([]);
  // const [match, setMatch] = useState([]);
  // const [pending, setPending] = useState([]);

  const getProfile = async (id) => {
    try {
      const { data } = await axios.get(`${API}/users`);
      console.log(data);
      setProfile(data[1]);
      // setMatch(data[0].requests);
      // setPending(data[0].todoreview);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    return getProfile();
  }, []);

  ///////

  const { name, lastname, gender, location, availabledays, experience, goals, radius, image } = currentUserData;

  return (
    <Paper className={classes.root}>
      <div id="profHeader" className="profBackground">
        <img className="profPic" src={image?.url ? image.url : defaulProfile} alt="profile-foto" style={{ width: "200px", height: "180px" }} />
      </div>

      <div id="cardContainer">
        <h2 id="card">
          {profile.name} {profile.lastname}
        </h2>

        <div id="socials">
          <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
            <img src={instagram} alt="instagram login" className="socialImage" />
          </a>
          <a href="https://www.facebook.com/" target="_blank" rel="noreferrer">
            <img src={facebook} alt="facebook login" className="socialImage" />
          </a>
          <a href="https://www.linkedin.com/">
            <img src={linkedin} alt="Linkedin login" className="socialImage" />
          </a>
          <a href="https://twitter.com/?lang=en" target="_blank" rel="noreferrer">
            <img src={twitter} alt="Twitter login" className="socialImage" />
          </a>
        </div>
      </div>

      <div>
        <div className="containerGrid">
          <div className="item1">
            <div className={classes.flexCenter}>
              <div id="editiconContainer">
                <h3>About</h3>
                {/* <div id="editicon">
                  <IconButton href={edit}>
                    <img src={pencil} alt="editicon" style={{ width: "20px" }} />
                  </IconButton>
                </div> */}
              </div>

              <h5>Gender:</h5>
              <ul>
                <li>
                  <img src={userPin} alt="userPin icon" />
                  {profile.gender}
                </li>
              </ul>

              <h5>Location:</h5>
              <ul>
                <li>
                  <img src={pin} alt="location pin" />
                  {profile.location}
                </li>
              </ul>
              <h5>Availablility:</h5>
              <ul>
                <li>
                  <img src={calendar} alt="calendar" />
                  {profile.availabledays ? `${availabledays[0]}, ${availabledays[1]}` : ""}
                </li>
              </ul>
              <h5>Experience :</h5>
              <ul>
                <li>
                  <img src={certification} alt="medal" />
                  {profile.experience}
                </li>
              </ul>

              <h5>Goals:</h5>
              <ul>
                <li>
                  <img src={target} alt="target" />

                  {profile.goals ? `${goals[0]}, ${goals[1]}, ${goals[2]}, ${goals[3]} ` : ""}
                </li>
              </ul>

              <h5>Radius:</h5>
              <ul>
                <li>
                  <img src={distance} alt="two location tags" />
                  {profile.radius} miles
                </li>
              </ul>
            </div>
          </div>

          <div id="badges" className="item2">
            <div className={classes.flexCenter}>
              <h3>Badges</h3>
              <div>
                <h5>
                  Great Motivator
                  <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnN2Z2pzPSJodHRwOi8vc3ZnanMuY29tL3N2Z2pzIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgeD0iMCIgeT0iMCIgdmlld0JveD0iMCAwIDUxMi4wNjMgNTEyLjA2MyIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTEyIDUxMiIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgY2xhc3M9IiI+PGc+PGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Zz48ZWxsaXBzZSBjeD0iMjU2LjAzMiIgY3k9IjI1Ni4wMzIiIGZpbGw9IiMyZWRlZmYiIHJ4PSIyNTUuOTQ5IiByeT0iMjU2LjAzMiIgZGF0YS1vcmlnaW5hbD0iIzAwZGY3NiIgc3R5bGU9IiIgY2xhc3M9IiI+PC9lbGxpcHNlPjwvZz48cGF0aCBkPSJtMjU2LjAzMiAwYy0uMTE2IDAtLjIzMS4wMDQtLjM0Ny4wMDR2NTEyLjA1NWMuMTE2IDAgLjIzMS4wMDQuMzQ3LjAwNCAxNDEuMzU3IDAgMjU1Ljk0OS0xMTQuNjI5IDI1NS45NDktMjU2LjAzMnMtMTE0LjU5Mi0yNTYuMDMxLTI1NS45NDktMjU2LjAzMXoiIGZpbGw9IiMyZWRlZmYiIGRhdGEtb3JpZ2luYWw9IiMwMGFiNWUiIHN0eWxlPSIiIGNsYXNzPSIiPjwvcGF0aD48cGF0aCBkPSJtMTExLjMyNiAyNjEuMTE4IDEwMy41MjQgMTAzLjUyNGM0LjUxNSA0LjUxNSAxMS44MzYgNC41MTUgMTYuMzUxIDBsMTY5Ljk1Ny0xNjkuOTU3YzQuNTE1LTQuNTE1IDQuNTE1LTExLjgzNiAwLTE2LjM1MWwtMzAuOTM1LTMwLjkzNWMtNC41MTUtNC41MTUtMTEuODM2LTQuNTE1LTE2LjM1MSAwbC0xMjMuNjE3IDEyMy42MTVjLTQuNTE1IDQuNTE1LTExLjgzNiA0LjUxNS0xNi4zNTEgMGwtNTUuMzk3LTU1LjM5N2MtNC40MjYtNC40MjYtMTEuNTcxLTQuNTI2LTE2LjExOS0uMjI2bC0zMC44MyAyOS4xNDljLTQuNzMyIDQuNDc1LTQuODM3IDExLjk3My0uMjMyIDE2LjU3OHoiIGZpbGw9IiNmZmY1ZjUiIGRhdGEtb3JpZ2luYWw9IiNmZmY1ZjUiIHN0eWxlPSIiIGNsYXNzPSIiPjwvcGF0aD48cGF0aCBkPSJtMzcwLjIyMyAxNDcuMzk4Yy00LjUxNS00LjUxNS0xMS44MzYtNC41MTUtMTYuMzUxIDBsLTk4LjE4NyA5OC4xODd2OTQuNTczbDE0NS40NzMtMTQ1LjQ3M2M0LjUxNS00LjUxNSA0LjUxNS0xMS44MzYgMC0xNi4zNTJ6IiBmaWxsPSIjZGZlYmYxIiBkYXRhLW9yaWdpbmFsPSIjZGZlYmYxIiBzdHlsZT0iIiBjbGFzcz0iIj48L3BhdGg+PC9nPjwvZz48L3N2Zz4=" alt="check" />
                </h5>
                <ul>
                  <li>
                    <img src="https://cdn-icons-png.flaticon.com/512/2928/2928144.png" alt="" style={{ width: "30px" }} />
                    -Enthusiastic
                  </li>
                </ul>
              </div>

              <div>
                <h5>
                  Spot On
                  <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnN2Z2pzPSJodHRwOi8vc3ZnanMuY29tL3N2Z2pzIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgeD0iMCIgeT0iMCIgdmlld0JveD0iMCAwIDUxMi4wNjMgNTEyLjA2MyIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTEyIDUxMiIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgY2xhc3M9IiI+PGc+PGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Zz48ZWxsaXBzZSBjeD0iMjU2LjAzMiIgY3k9IjI1Ni4wMzIiIGZpbGw9IiMyZWRlZmYiIHJ4PSIyNTUuOTQ5IiByeT0iMjU2LjAzMiIgZGF0YS1vcmlnaW5hbD0iIzAwZGY3NiIgc3R5bGU9IiIgY2xhc3M9IiI+PC9lbGxpcHNlPjwvZz48cGF0aCBkPSJtMjU2LjAzMiAwYy0uMTE2IDAtLjIzMS4wMDQtLjM0Ny4wMDR2NTEyLjA1NWMuMTE2IDAgLjIzMS4wMDQuMzQ3LjAwNCAxNDEuMzU3IDAgMjU1Ljk0OS0xMTQuNjI5IDI1NS45NDktMjU2LjAzMnMtMTE0LjU5Mi0yNTYuMDMxLTI1NS45NDktMjU2LjAzMXoiIGZpbGw9IiMyZWRlZmYiIGRhdGEtb3JpZ2luYWw9IiMwMGFiNWUiIHN0eWxlPSIiIGNsYXNzPSIiPjwvcGF0aD48cGF0aCBkPSJtMTExLjMyNiAyNjEuMTE4IDEwMy41MjQgMTAzLjUyNGM0LjUxNSA0LjUxNSAxMS44MzYgNC41MTUgMTYuMzUxIDBsMTY5Ljk1Ny0xNjkuOTU3YzQuNTE1LTQuNTE1IDQuNTE1LTExLjgzNiAwLTE2LjM1MWwtMzAuOTM1LTMwLjkzNWMtNC41MTUtNC41MTUtMTEuODM2LTQuNTE1LTE2LjM1MSAwbC0xMjMuNjE3IDEyMy42MTVjLTQuNTE1IDQuNTE1LTExLjgzNiA0LjUxNS0xNi4zNTEgMGwtNTUuMzk3LTU1LjM5N2MtNC40MjYtNC40MjYtMTEuNTcxLTQuNTI2LTE2LjExOS0uMjI2bC0zMC44MyAyOS4xNDljLTQuNzMyIDQuNDc1LTQuODM3IDExLjk3My0uMjMyIDE2LjU3OHoiIGZpbGw9IiNmZmY1ZjUiIGRhdGEtb3JpZ2luYWw9IiNmZmY1ZjUiIHN0eWxlPSIiIGNsYXNzPSIiPjwvcGF0aD48cGF0aCBkPSJtMzcwLjIyMyAxNDcuMzk4Yy00LjUxNS00LjUxNS0xMS44MzYtNC41MTUtMTYuMzUxIDBsLTk4LjE4NyA5OC4xODd2OTQuNTczbDE0NS40NzMtMTQ1LjQ3M2M0LjUxNS00LjUxNSA0LjUxNS0xMS44MzYgMC0xNi4zNTJ6IiBmaWxsPSIjZGZlYmYxIiBkYXRhLW9yaWdpbmFsPSIjZGZlYmYxIiBzdHlsZT0iIiBjbGFzcz0iIj48L3BhdGg+PC9nPjwvZz48L3N2Zz4=" alt="check" />
                </h5>
                <ul>
                  <li>
                    <img src="https://cdn-icons-png.flaticon.com/512/4053/4053735.png" alt="" style={{ width: "30px" }} />
                    -Assisted in lifting heavy weights safely
                  </li>
                </ul>
              </div>

              <div>
                <h5>Mobility Master
                <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnN2Z2pzPSJodHRwOi8vc3ZnanMuY29tL3N2Z2pzIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgeD0iMCIgeT0iMCIgdmlld0JveD0iMCAwIDUxMi4wNjMgNTEyLjA2MyIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTEyIDUxMiIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgY2xhc3M9IiI+PGc+PGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Zz48ZWxsaXBzZSBjeD0iMjU2LjAzMiIgY3k9IjI1Ni4wMzIiIGZpbGw9IiMyZWRlZmYiIHJ4PSIyNTUuOTQ5IiByeT0iMjU2LjAzMiIgZGF0YS1vcmlnaW5hbD0iIzAwZGY3NiIgc3R5bGU9IiIgY2xhc3M9IiI+PC9lbGxpcHNlPjwvZz48cGF0aCBkPSJtMjU2LjAzMiAwYy0uMTE2IDAtLjIzMS4wMDQtLjM0Ny4wMDR2NTEyLjA1NWMuMTE2IDAgLjIzMS4wMDQuMzQ3LjAwNCAxNDEuMzU3IDAgMjU1Ljk0OS0xMTQuNjI5IDI1NS45NDktMjU2LjAzMnMtMTE0LjU5Mi0yNTYuMDMxLTI1NS45NDktMjU2LjAzMXoiIGZpbGw9IiMyZWRlZmYiIGRhdGEtb3JpZ2luYWw9IiMwMGFiNWUiIHN0eWxlPSIiIGNsYXNzPSIiPjwvcGF0aD48cGF0aCBkPSJtMTExLjMyNiAyNjEuMTE4IDEwMy41MjQgMTAzLjUyNGM0LjUxNSA0LjUxNSAxMS44MzYgNC41MTUgMTYuMzUxIDBsMTY5Ljk1Ny0xNjkuOTU3YzQuNTE1LTQuNTE1IDQuNTE1LTExLjgzNiAwLTE2LjM1MWwtMzAuOTM1LTMwLjkzNWMtNC41MTUtNC41MTUtMTEuODM2LTQuNTE1LTE2LjM1MSAwbC0xMjMuNjE3IDEyMy42MTVjLTQuNTE1IDQuNTE1LTExLjgzNiA0LjUxNS0xNi4zNTEgMGwtNTUuMzk3LTU1LjM5N2MtNC40MjYtNC40MjYtMTEuNTcxLTQuNTI2LTE2LjExOS0uMjI2bC0zMC44MyAyOS4xNDljLTQuNzMyIDQuNDc1LTQuODM3IDExLjk3My0uMjMyIDE2LjU3OHoiIGZpbGw9IiNmZmY1ZjUiIGRhdGEtb3JpZ2luYWw9IiNmZmY1ZjUiIHN0eWxlPSIiIGNsYXNzPSIiPjwvcGF0aD48cGF0aCBkPSJtMzcwLjIyMyAxNDcuMzk4Yy00LjUxNS00LjUxNS0xMS44MzYtNC41MTUtMTYuMzUxIDBsLTk4LjE4NyA5OC4xODd2OTQuNTczbDE0NS40NzMtMTQ1LjQ3M2M0LjUxNS00LjUxNSA0LjUxNS0xMS44MzYgMC0xNi4zNTJ6IiBmaWxsPSIjZGZlYmYxIiBkYXRhLW9yaWdpbmFsPSIjZGZlYmYxIiBzdHlsZT0iIiBjbGFzcz0iIj48L3BhdGg+PC9nPjwvZz48L3N2Zz4=" alt="check"/>
                </h5>
                <ul>
                  <li>
                    <img src="https://cdn-icons-png.flaticon.com/512/2843/2843974.png" alt="" style={{ width: "30px" }} />
                    -Stretch tightented muscles before workout
                  </li>
                </ul>
              </div>

              <div>
                <h5>Punctuality</h5>
                <ul>
                  <li>
                    <img src="https://cdn-icons-png.flaticon.com/512/2090/2090622.png" alt="" style={{ width: "30px" }} />
                    -Responds on time
                  </li>
                </ul>
              </div>

              <div>
                <h5>Cardiologist</h5>
                <ul>
                  <li>
                    <img src="https://cdn-icons-png.flaticon.com/512/2237/2237680.png" alt="" style={{ width: "30px" }} />
                    -Increase BPM
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="item4">
        <MapBox adjustmentWidth={0.2} adjustmentHeight={0.3} />
      </div>
    </Paper>
  );
}
export default Profile;
