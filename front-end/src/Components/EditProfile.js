// import { useState, useEffect } from 'react';
// import { useParams, useHistory } from 'react-router-dom';
// import { apiURL } from '../Util/apiURL';
// import axios from 'axios';

// const API = apiURL();

// function EditProfile(props) {
//   let { id } = useParams();
//   let history = useHistory();
//   const [update, setUpdate] = useState({
//     username: "",
//     name: "",
//     lastname: '',
//     availability: '',
//     goals: '',
//     experience: '',
//     gender: "",
//   })

//   const updateProfile = (profileInfo) => {
//     axios
//       .put(`${API}/users/${id}`, profileInfo)
//       .then(
//         () => {
//           history.push(`/users/${id}`);
//         },
//         (error) => console.error(error)
//       )
//       .catch((c) => console.warn("catch", c));
//   };

//   const handleChange = event => {
//     setUpdate({ ...update, [event.target.id]: event.target.value })

//   }

//   useEffect(() => {
//     axios.get(`${API}/users/${id}`).then(
//       (response) => {
//         setUpdate(response.data[0])
//         console.log(response.data[0])
//       },
//       (error) => history.push(`/404`)
//     );
//   }, [id, history]);

//   const handleSubmit = event => {

//     event.preventDefault()
//     updateProfile(update, id)
//     console.log(update)
//     history.push(`/users/${id}/profile`)
//   }
//   return (
//     <div >
//       <form onSubmit={handleSubmit} id="form" >
//         {/* <h4>Edit</h4> */}
//         <span>
//           <label htmlFor="username">Username:</label>
//           <input type="text" value={update.username} id="username" onChange={handleChange} />
//         </span>
//         <br />
//         <span>
//           <label htmlFor="name">Name:</label>
//           <input type="text" placeholder="name" value={update.name} id="name" onChange={handleChange} />
//         </span>
//         <br />
//         <span>
//           <label htmlFor='img'>Image:</label>
//           <input
//             type='text'
//             id='img'
//             value={update.img}
//             placeholder='http://'
//             onChange={handleChange}
//             disabled
//           />
//         </span>
//         <br />
//         <span>
//           <label htmlFor='availability'>Availability:</label>
//           <input
//             type='date'
//             id='availability'
//             value={update.availability}
//             onChange={handleChange}
//           />
//         </span>
//         <br />
//         <span>
//           <label htmlFor="gender">Gender:</label>
//           <select name="" id="">
//             <option value="female">Female</option>
//             <option value="male">Male</option>
//             <option value="other">Perferred not to answer</option>
//           </select>
//         </span>
//         <br />
//         <span>

//           <label htmlFor="experience">Experience:</label>
//           <input
//             type='text'
//             id='experience'
//             value={update.experience}
//             onChange={handleChange}
//           />
//         </span>
//         <br />
//         <span>
//           <label htmlFor='goals'>Goals:</label>
//           <select name="goals" id="">
//             <option value="abs">Abs</option>
//             <option value="chest">Chest</option>
//             <option value="cardio">Cardio</option>
//             <option value="back">Back</option>
//             <option value="legs">Legs</option>
//           </select>
//         </span>
//         <span>
//           <button type='submit'>Submit</button>
//         </span>
//       </form>

//       <div>

//       </div>
//     </div>
//   )
// }

// export default EditProfile;

// <form>
//   <div class="form-group">
//     <label for="exampleFormControlInput1">Email address</label>
//     <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com"/>
//   </div>
//   <div class="form-group">
//     <label for="exampleFormControlSelect1">Example select</label>
//     <select class="form-control" id="exampleFormControlSelect1">
//       <option>1</option>
//       <option>2</option>
//       <option>3</option>
//       <option>4</option>
//       <option>5</option>
//     </select>
//   </div>
//   <div class="form-group">
//     <label for="exampleFormControlSelect2">Example multiple select</label>
//     <select multiple class="form-control" id="exampleFormControlSelect2">
//       <option>1</option>
//       <option>2</option>
//       <option>3</option>
//       <option>4</option>
//       <option>5</option>
//     </select>
//   </div>
//   <div class="form-group">
//     <label for="exampleFormControlTextarea1">Example textarea</label>
//     <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
//   </div>
// </form>

import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import Button from "@material-ui/core/Button";
import InputAdornment from "@mui/material/InputAdornment";
import user from "../Assets/user.png";
import pin from "../Assets/pin.png";
import calendar from "../Assets/calendar.png";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Stack from "@mui/material/Stack";

const experience = [
  {
    value: "Beginner",
    label: "Beginner",
  },
  {
    value: "Intermediate",
    label: "Intermediate",
  },
  {
    value: "Advanced",
    label: "Advanced",
  },
];

const genderO = [
  {
    value: "Female",
    label: "Female",
  },
  {
    value: "Male",
    label: "Male",
  },
  {
    value: "Non-binary",
    label: "Non-binary",
  },
  {
    value: "Perfer not to answer",
    label: "Perfer not to answer",
  },
];

export default function EditProfile() {
  const [exper, setExper] = React.useState("");
  const [gender, setGender] = React.useState("");

  const handleChange = (event) => {
    setExper(event.target.value);
    setGender(event.target.value);
  };

  return (
    <div>
      <div id="editlayout">
        {/* <h4>Edit Your Profile</h4> */}
        <img src="https://images.pexels.com/photos/2078265/pexels-photo-2078265.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="" style={{ width: "180px", height: "160px", borderRadius: "80px" }} />
      </div>

      <div id="editf">
        <Box sx={{ "& > :not(style)": { m: 1, width: "50ch" } }}>
          <div>
            <FormControl variant="standard">
              <InputLabel htmlFor="input-with-icon-adornment">Name</InputLabel>
              <Input
                id="input-with-icon-adornment"
                startAdornment={
                  <InputAdornment position="start">
                    <img src={user} alt="name" style={{ width: "25px" }} />
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControl variant="standard">
              <InputLabel htmlFor="input-with-icon-adornment">Last Name</InputLabel>
              <Input
                id="input-with-icon-adornment"
                startAdornment={
                  <InputAdornment position="start">
                    <img src={user} alt="lastname" style={{ width: "25px" }} />
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControl variant="standard">
              <InputLabel htmlFor="input-with-icon-adornment">Availability</InputLabel>
              <Input
                id="input-with-icon-adornment"
                startAdornment={
                  <InputAdornment position="start">
                    <img src={calendar} alt="calender" style={{ width: "25px" }} />
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControl variant="standard">
              <InputLabel htmlFor="input-with-icon-adornment">Location</InputLabel>
              <Input
                id="input-with-icon-adornment"
                startAdornment={
                  <InputAdornment position="start">
                    <img src={pin} alt="location pin" style={{ width: "25px" }} />
                  </InputAdornment>
                }
              />
            </FormControl>
          </div>
          <label htmlFor="icon-button-file">
            <Input accept="image/*" type="file" />
            <IconButton color="primary" aria-label="upload picture" component="span">
              <PhotoCamera />
            </IconButton>
          </label>
        </Box>

        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "40ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <div id="dropdown">
            <TextField label="Experience Level" select variant="filled" color="primary" onChange={handleChange} value={exper} focused>
              {/* <TextField id="outlined-select-currency value={exper} onChange={handleChange}> */}
              {experience.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

            <TextField select label="Perferred Gender" value={gender} onChange={handleChange} variant="filled" color="primary" focused>
              {genderO.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField select label="Radius" value={exper} onChange={handleChange} variant="filled" color="primary" focused>
              {experience.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField select label="Goals" value={exper} onChange={handleChange} variant="filled" color="primary" focused>
              {experience.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </div>
        </Box>
      </div>
      <div id="editlayout">
        <Button variant="contained" color="primary">
          Update Profile
        </Button>
      </div>
    </div>
  );
}
