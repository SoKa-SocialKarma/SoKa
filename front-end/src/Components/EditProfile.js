import { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { firestoreThisImage } from '../Util/imageStore'
import { useAPI } from '../Context/AuthContext'
import { apiURL } from '../Util/apiURL'
import axios from 'axios'

const API = apiURL()

function EditProfile () {
  const { currentUserData, getFreshUserData } = useAPI()
  const [ uploadedImage, setUploadedImage ] = useState(false)
  const [ placeHolders, setPlaceHolders ] = useState({})
  const [ usersChoice, setUsersChoice ] = useState('')
  const [ today, setToday ] = useState()

  const [ requestBody, setRequestBody] = useState({})
  let { id } = useParams()
  let history = useHistory()

  // Availability Setter Helpers
  useEffect(() => {
    const todaysDate = new Date(new Date().toString().split('GMT')[0] + ' UTC')
      .toISOString()
      .split('.')[0]
    setToday(formatDate(todaysDate))
  }, [])

  useEffect(() => {
    const unmounMe = setPlaceHolders(currentUserData)
    return unmounMe
  }, [currentUserData])

  const formatDate = target => {
    let formatted = ''
    const shortedDay = target.slice(0, 10).split('-')
    const month = String(Number(shortedDay[1]))
    formatted = [month, shortedDay[2], shortedDay[0]].join('/')

    return formatted
  }

  const removeOldDates = today => {
    const todaySplitted = today.split('/').map(num => Number(num))

    return currentUserData.availabledays.filter(day => {
      const userSplitted = day.split('/').map(num => Number(num))
      return (
        userSplitted[0] >= todaySplitted[0] &&
        ((userSplitted[0] === todaySplitted[0] &&
          userSplitted[1] >= todaySplitted[1]) ||
          userSplitted[0] >= todaySplitted[0]) &&
        userSplitted[2] >= todaySplitted[2]
      )
    })
  }

  // Availability Setter
  const setAvailability = e => {
    e.preventDefault()

    let day = formatDate(e.target.value)
    const oldAvailability = removeOldDates(today)
    const newAvailability = [...oldAvailability, day]
    const updatedProfile = Object.assign(
      { ...requestBody },
      { availability: { days: newAvailability } }
    )
    setRequestBody(updatedProfile)
    setUsersChoice(e.target.value)
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

    const filteredDuplicates = currentUserData.goals.filter(
      goal => goal !== e.target.value
    )
    filteredDuplicates.push(e.target.value)
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
        setImage(event)
        break
      case 'goals':
        setGoals(event)
        break
      case 'experience':
        setExperience(event)
        break
      case 'availability':
        setAvailability(event)
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

        <label htmlFor='username'>Username:</label>
        <input
          type='text'
          placeholder={placeHolders.username}
          value={requestBody.username || ''}
          id='username'
          onChange={handleChange}
        />

        <br />

        <label htmlFor='name'>Name:</label>
        <input
          type='text'
          placeholder={placeHolders.name}
          value={requestBody.name || ''}
          id='name'
          onChange={handleChange}
        />

        <br />

        <label htmlFor='image'>Image:</label>
        <input type='file' id='image' onChange={handleChange} disabled />

        <br />

        <label htmlFor='availability'>Availability:</label>
        <input
          type='datetime-local'
          id='availability'
          placeholder={placeHolders.availabledays}
          value={usersChoice}
          onChange={handleChange}
        />

        <br />

        <label htmlFor='gender'>Gender:</label>
        <select name='gender' id='gender'>
          <option value=''>-</option>
          <option value='Female'>Female</option>
          <option value='Male'>Male</option>
          <option value='Other'>Perferred not to answer</option>
        </select>

        <br />

        <label htmlFor='experience'>Experience:</label>
        <select name='experience' id='experience' onChange={handleChange}>
          <option value=''>-</option>
          <option value='Beginner'>Beginner</option>
          <option value='Intermediate'>Intermediate</option>
          <option value='Advanced'>Advanced</option>
        </select>

        <br />

        <label htmlFor='goals'>Goals:</label>
        <select name='goals' id='goals' onChange={handleChange}>
          <option value=''>-</option>
          <option value='Abs'>Abs</option>
          <option value='Chest'>Chest</option>
          <option value='Cardio'>Cardio</option>
          <option value='Back'>Back</option>
          <option value='Legs'>Legs</option>
        </select>

        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default EditProfile
// ;<form>
//   <div class='form-group'>
//     <label for='exampleFormControlInput1'>Email address</label>
//     <input
//       type='email'
//       class='form-control'
//       id='exampleFormControlInput1'
//       placeholder='name@example.com'
//     />
//   </div>
//   <div class='form-group'>
//     <label for='exampleFormControlSelect1'>Example select</label>
//     <select class='form-control' id='exampleFormControlSelect1'>
//       <option>1</option>
//       <option>2</option>
//       <option>3</option>
//       <option>4</option>
//       <option>5</option>
//     </select>
//   </div>
//   <div class='form-group'>
//     <label for='exampleFormControlSelect2'>Example multiple select</label>
//     <select multiple class='form-control' id='exampleFormControlSelect2'>
//       <option>1</option>
//       <option>2</option>
//       <option>3</option>
//       <option>4</option>
//       <option>5</option>
//     </select>
//   </div>
//   <div class='form-group'>
//     <label for='exampleFormControlTextarea1'>Example textarea</label>
//     <textarea
//       class='form-control'
//       id='exampleFormControlTextarea1'
//       rows='3'
//     ></textarea>
//   </div>
// </form>
