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


import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';


const currencies = [
  {
    value: 'Beginner',
    label: 'Beginner',
  },
  {
    value: 'Intermediate',
    label: 'Intermediate',
  },
  {
    value: 'Advanced',
    label: 'Advanced',
  },
];

export default function EditProfile() {
  const [currency, setCurrency] = React.useState("");

  const handleChange = (event) => {
    setCurrency(event.target.value);
  };


  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '55ch'},
      }}
      noValidate
      autoComplete="off"
    >
      <div id="editform">
      <TextField
          id="outlined-select-currency"
          select
          label="Choose Experience"
          value={currency}
          onChange={handleChange}
          helperText="Please select your currency"
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          required
          id="outlined-required"
          label="Required"
          defaultValue="Name"
        />
        <TextField
          // disabled
          id="outlined-disabled"
          label="Optional"
          defaultValue="Last Name"
        />
        {/* <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
        /> */}
        <TextField
          id="outlined-read-only-input"
          label="Read Only"
          defaultValue="Location"
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          id="outlined-number"
          label="Experience"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        />
           <TextField
          id="outlined-number"
          label="Availability"
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField id="outlined-search" label="Search field" type="search" />
        <TextField
          id="outlined-helperText"
          label="Helper text"
          defaultValue="Goals"
          helperText="Some important text"
        />
      </div>
    </Box>
  );
}