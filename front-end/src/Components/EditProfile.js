import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import { apiURL } from '../Util/apiURL';
import axios from 'axios';

const API = apiURL();

export default function EditProfile () {
  //let { index } = useParams();
  let history = useHistory();
  let index = 14
  const [update, setUpdate] = useState({
    username: "",
    name:"",
    img: '',
    availability: '',
    goals: '',
    experience: '',
    gender:"",
  })
  useEffect(() => {
    axios.get(`${API}/users/${index}`).then(
      (response) => setUpdate(response.data[0]),
      (error) => history.push(`/not-found`)
    );
  },[index, history]);

    //   const updateProfile = (profileinfo, index) => {
    //   try {
    //     axios.put(`${API}/users/${index}`, profileinfo).then(() => {
    //       setUpdate(update);
    //       history.push(`/profile`);
    //     });
    //   } catch (error) {
    //     console.warn("catch", error);
    //   }
    // };

    const updateProfile = (profileinfo) => {
      axios
        .put(`${API}/users/${index}`, profileinfo)
        .then(
          () => {
            history.push(`/user/${index}`);
          },
          (error) => console.error(error)
        )
        .catch((c) => console.warn("catch", c));
    };
  


  const handleChange = event => {
    setUpdate({ ...update, [event.target.id]: event.target.value })
  }
  const handleSubmit = event => {
    event.preventDefault()
    updateProfile(update)
  }
  return (
    <div id="form">
      <form onSubmit={handleSubmit} >
        <h4>Edit</h4>
        <span>
          <label htmlFor="username">Username:</label>
          <input type="text" value={update.username} id="username" onChange={handleChange}/>
        </span>
        <br />
        <span>
        <label htmlFor="name">Name:</label>
        <input type="text" placeholder="name" value={update.name} id="name" onChange={handleChange}/>
        </span>
        <br />
        <span>
          <label htmlFor='img'>Image:</label>
          <input
            type='text'
            id='img'
            value={update.img}
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
            value={update.availability}
            onChange={handleChange}
          />
        </span>
        <br />
        <span>
          <label htmlFor="gender">Gender:</label>
        <select name="" id="">
          <option value="female">Female</option>
          <option value="male">Male</option>
          <option value="other">Perferred not to answer</option>
          </select>     
          </span>
   
        <br />
        <span>

       <label htmlFor="experience">Experience:</label>
          <input
            type='text'
            id='experience'
            value={update.experience}
            onChange={handleChange}
            />
            </span>     
            <br />
        <span>
          <label htmlFor='goals'>Goals:</label>
          <select name="goals" id="">
          <option value="abs">Abs</option>
          <option value="chest">Chest</option>
          <option value="cardio">Cardio</option>
          <option value="back">Back</option>
          <option value="legs">Legs</option>
          </select>
      
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
