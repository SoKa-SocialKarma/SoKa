import { useState, useEffect} from 'react';
import axios from "axios";
import {useParams, Link, useHistory} from "react-router-dom";
import { apiURL } from "../Util/apiURL";
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

const addDetails = (newdetails) => {
  axios.post(`${API}/profile`, newdetails).then(() => {
    history.push(`/profile`)
  })
}

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
    <div>
      <h1>Edit page</h1>
      {/* //avoid refreshing page  */}
      <form onSubmit={handleSubmit}>
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
        <span>
          <label htmlFor='availability'>Availability:</label>
          <input
            type='date'
            id='availability'
            value={details.availability}
            onChange={handleChange}
          />
        </span>
        <span>
          <label htmlFor='goals'>Goals:</label>
          <input
            type='text'
            id='goals'
            value={details.goals}
            onChange={handleChange}
          />
        </span>
        <span>
          <label htmlFor='experience'>Experience:</label>
          <input
            type='text'
            id='experience'
            value={details.experience}
            onChange={handleChange}
          />
        </span>
        <span>
          <label htmlFor='activity'>Activity:</label>
          <input
            type='text'
            id='activity'
            value={details.activity}
            onChange={handleChange}
          />
        </span>
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}
