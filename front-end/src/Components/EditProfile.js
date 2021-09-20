import { useState, useEffect} from 'react';
import {useParams,  useHistory} from "react-router-dom";

import { apiURL } from "../Util/apiURL";
import axios from "axios";

const API = apiURL()

export default function EditProfile () {
  let { index } = useParams();
  let history = useHistory();

  useEffect(() => {
    axios.get(`${API}/users/14`).then(
      (response) => setDetails(response.data),
      (error) => history.push(`/not-found`)
    );
  },[index, history]);

// const addDetails = (newdetails) => {
//   axios.post(`${API}/profile`, newdetails).then(() => {
//     history.push(`/profile`)
//   })
// }

  const [details, setDetails] = useState({
    img: '',
    Availability: '',
    Activity: '',
    Goal: '',
    Experience: ''
  })

  const handleChange = event => {
    setDetails({ ...details, [event.target.id]: event.target.value })
  }
  const handleSubmit = event => {
    event.preventDefault()
  }
  return (
    <div id="form">
      <form onSubmit={handleSubmit} >
        <h4>Edit</h4>
        <span>
          <label htmlFor="username">Username:</label>
          <input type="text" />
        </span>
        <br />
        <span>
        <label htmlFor="name">Name:</label>
        <input type="text" placeholder="name" />
        </span>
        <br />
        <span>
          <label htmlFor='img'>Image:</label>
          <input
            type='text'
            id='img'
            value={details.img}
            placeholder='http://'
            onChange={handleChange}
            disabled
          />
        </span>
        <br />
        <span>
          <label htmlFor='availability'>Availability:</label>
          <input
            type='date'
            id='availability'
            value={details.availability}
            onChange={handleChange}
          />
        </span>
        <br />
        <span>
          <label htmlFor="gender">Gender:</label>
        <select name="" id="">
          <option value="female">Female</option>
          <option value="male">male</option>
          <option value="trans">Trans</option>
          </select>     
          </span>
   
        <br />
       
          {/* <input
            type='text'
            id='experience'
            value={details.experience}
            onChange={handleChange}
          /> */}
        {/* </span> */}
     
        <span>
          <label htmlFor='goals'>Goals:</label>
          <select name="goals" id="">
          <option value="abs">Abs</option>
          <option value="chest">Chest</option>
          <option value="cardio">Cardio</option>
          <option value="back">Back</option>
          <option value="legs">Legs</option>
          </select>
          {/* <input
            type='text'
            id='goals'
            value={details.goals}
            onChange={handleChange}
          /> */}
        </span>
          <br />
          <br />
        <span>
        <button type='submit'>Submit</button>
        </span>
      </form>
    </div>
  )
}
