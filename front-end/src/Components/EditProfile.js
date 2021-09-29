import { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { firestoreThisImage } from '../Util/imageStore'
import { useAPI } from '../Context/AuthContext'
import { apiURL } from '../Util/apiURL'
import axios from 'axios'

const API = apiURL()

function EditProfile () {
  const { currentUserData, getFreshUserData } = useAPI()
  const [today, setToday] = useState(null)
  const [uploadedImage, setUploadedImage] = useState(false)
  let { id } = useParams()
  let history = useHistory()

  const [requestBody, setRequestBody] = useState({
    username: currentUserData.username,
    name: currentUserData.name,
    lastname: currentUserData.lastname,
    availability: currentUserData.availabledays,
    goals: currentUserData.goals,
    experience: currentUserData.experience,
    gender: currentUserData.gender
  })

  // Availability Setter Helpers
  useEffect(() => {
    getDate()
  }, [])

  const getDate = async () => {
    const date = new Date(new Date().toString().split('GMT')[0] + ' UTC')
      .toISOString()
      .split('.')[0]
    setToday(await date)
  }

  const formatDate = target => {
    let formatted = ''
    const shortedDay = target.slice(0, 10).split('-')
    const month = String(Number(shortedDay[1]))
    formatted = [month, shortedDay[2], shortedDay[0]].join('/')

    return formatted
  }

  const removeOldDates = (today, userAvailability) => {
    const todaySplitted = today.split('/')

    return userAvailability.filter(day => {
      const userSplitted = day.split('/')
      return (
        Number(userSplitted[0]) <= Number(todaySplitted[0]) &&
        Number(userSplitted[1]) <= Number(todaySplitted[1]) &&
        Number(userSplitted[2]) <= Number(todaySplitted[2])
      )
    })
  }

  // Availability Setter
  const setAvailability = e => {
    e.preventDefault()

    let day = formatDate(e.target.value)
    const oldAvailability = removeOldDates(today, requestBody.availability)
    const newAvailability = [...oldAvailability, day]
    const updatedProfile = Object.assign(
      { ...requestBody },
      { availability: newAvailability }
    )
    setRequestBody(updatedProfile)
  }

  // Image Setter
  const setImage = async e => {
    e.preventDefault()

    const storedImage = await firestoreThisImage(e.target.files[0])
    setUploadedImage(true)
    uploadedImage &&
      setRequestBody(
        Object.assign(
          { ...requestBody },
          {
            image: {
              name: storedImage.name,
              url: storedImage.url,
              album: storedImage.album
            }
          }
        )
      )
  }

  // Goals Setter
  const setGoals = e => {
    e.preventDefault()

    const filteredDuplicates = requestBody.goals
      .filter(goal => goal !== e.target.value)
      .push(e.target.value)
    setRequestBody(
      Object.assign(
        { ...requestBody },
        { goals: { goals: filteredDuplicates } }
      )
    )
  }

  // Experience Setter
  const setExperience = e => {
    e.preventDefault()

    setRequestBody(
      Object.assign(
        { ...requestBody },
        { experience: { experience: [e.target.value] } }
      )
    )
  }

  const handleChange = event => {
    switch (event.target.id) {
      case 'image':
        setImage(event.target.files[0])
        break
      case 'goals':
        setGoals(event.target.value)
        break
      case 'experience':
        setExperience(event.target.value)
        break
      case 'availability':
        setAvailability(event.target.value)
        break
      default:
        setRequestBody({
          ...requestBody,
          [event.target.id]: event.target.value
        })
    }
  }

  const updateProfile = profileInfo => {
    axios
      .put(`${API}/users/${id}`, profileInfo)
      .then(getFreshUserData(id))
      .then(
        () => {
          history.push(`/users/${id}/profile`)
        },
        error => console.error(error)
      )
      .catch(c => console.warn('catch', c))
  }

  const handleSubmit = event => {
    event.preventDefault()
    updateProfile(requestBody, id)
  }

  return (
    <div>
      <form onSubmit={handleSubmit} id='form'>
        {/* <h4>Edit</h4> */}
        <span>
          <label htmlFor='username'>Username:</label>
          <input
            type='text'
            value={requestBody.username}
            id='username'
            onChange={handleChange}
          />
        </span>
        <br />
        <span>
          <label htmlFor='name'>Name:</label>
          <input
            type='text'
            placeholder='name'
            value={requestBody.name}
            id='name'
            onChange={handleChange}
          />
        </span>
        <br />
        <span>
          <label htmlFor='image'>Image:</label>
          <input
            type='text'
            id='image'
            value={requestBody.img}
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
            value={requestBody.availability}
            onChange={handleChange}
          />
        </span>
        <br />
        <span>
          <label htmlFor='gender'>Gender:</label>
          <select name='gender' id='gender'>
            <option value='Female'>Female</option>
            <option value='Male'>Male</option>
            <option value='Other'>Perferred not to answer</option>
          </select>
        </span>
        <br />
        <span>
          <label htmlFor='experience'>Experience:</label>
          <input
            type='text'
            id='experience'
            value={requestBody.experience}
            onChange={handleChange}
          />
        </span>
        <br />
        <span>
          <label htmlFor='goals'>Goals:</label>
          <select name='goals' id='goals' onChange={handleChange}>
            <option value='Abs'>Abs</option>
            <option value='Chest'>Chest</option>
            <option value='Cardio'>Cardio</option>
            <option value='Back'>Back</option>
            <option value='Legs'>Legs</option>
          </select>
        </span>
        <span>
          <button type='submit'>Submit</button>
        </span>
      </form>
    </div>
  )
}

export default EditProfile
;<form>
  <div class='form-group'>
    <label for='exampleFormControlInput1'>Email address</label>
    <input
      type='email'
      class='form-control'
      id='exampleFormControlInput1'
      placeholder='name@example.com'
    />
  </div>
  <div class='form-group'>
    <label for='exampleFormControlSelect1'>Example select</label>
    <select class='form-control' id='exampleFormControlSelect1'>
      <option>1</option>
      <option>2</option>
      <option>3</option>
      <option>4</option>
      <option>5</option>
    </select>
  </div>
  <div class='form-group'>
    <label for='exampleFormControlSelect2'>Example multiple select</label>
    <select multiple class='form-control' id='exampleFormControlSelect2'>
      <option>1</option>
      <option>2</option>
      <option>3</option>
      <option>4</option>
      <option>5</option>
    </select>
  </div>
  <div class='form-group'>
    <label for='exampleFormControlTextarea1'>Example textarea</label>
    <textarea
      class='form-control'
      id='exampleFormControlTextarea1'
      rows='3'
    ></textarea>
  </div>
</form>
