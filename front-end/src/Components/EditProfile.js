import { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { firestoreThisImage } from '../Util/imageStore'
import { gender, experience, radius, goals } from '../Util/searchFields'
import { useAPI } from '../Context/AuthContext'
import { apiURL } from '../Util/apiURL'
import axios from 'axios'

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
    const unmountMe = setPlaceHolders(currentUserData)
    return unmountMe
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

    const storedImage = await firestoreThisImage(e.target.files[0], currentUser.email, currentUserData.image.album)
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
      <div id="editlayout">
        {/* <h4>Edit Your Profile</h4> */}
        <img src="https://images.pexels.com/photos/2078265/pexels-photo-2078265.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="" style={{ width: "180px", height: "160px", borderRadius: "80px" }} />
      </div>

      <div id="editf">
        <Box sx={{ "& > :not(style)": { m: 1, width: "50ch" } }}>
          <div>
          
            <FormControl variant="standard">
              <InputLabel htmlFor="name">Name</InputLabel>
              <Input
                id="name"
                placeholder={placeHolders.name}
                value={requestBody.name || ''}
                onChange={handleChange} 
                startAdornment={
                  <InputAdornment position="start">
                    <img src={user} alt="name" style={{ width: "25px" }} />
                  </InputAdornment>
                }
              />
            </FormControl>

            <FormControl variant="standard">
              <InputLabel htmlFor="lastname">Last Name</InputLabel>
              <Input
                id="lastname"
                placeholder={placeHolders.lastname}
                value={requestBody.lastname || ''}
                onChange={handleChange} 
                startAdornment={
                  <InputAdornment position="start">
                    <img src={user} alt="lastname" style={{ width: "25px" }} />
                  </InputAdornment>
                }
              />
            </FormControl>

            <FormControl variant="standard">
              <InputLabel htmlFor="availability">Availability</InputLabel>
              <Input
                id="availability"
                placeholder={placeHolders.availabledays}
           //   value={usersChoice}
                onChange={handleChange} 
                startAdornment={
                  <InputAdornment position="start">
                    <img src={calendar} alt="calender" style={{ width: "25px" }} />
                  </InputAdornment>
                }
              />
            </FormControl>

            <FormControl variant="standard">
              <InputLabel htmlFor="location">Location</InputLabel>
              <Input
                id="location"
                placeholder={placeHolders.location}
                value={requestBody.location || ''}
                onChange={handleChange} 
                startAdornment={
                  <InputAdornment position="start">
                    <img src={pin} alt="location pin" style={{ width: "25px" }} />
                  </InputAdornment>
                }
              />
            </FormControl>
          </div>

          <label htmlFor="icon-button-file">
            <Input accept="image/*" type="file" onChange={handleChange} id="image" />
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
            <TextField label="Experience Level" select variant="filled" color="primary" id="experience"
                        placeholder={placeHolders.experience}
                        onChange={handleChange} value={requestBody.experience || ''} focused>
             
              {experience.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

            <TextField select label="Preferred Gender" variant="filled" color="primary" id="gender"
                        placeholder={placeHolders.gender}
                        onChange={handleChange} value={requestBody.gender || ''} focused >
              {gender.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

            <TextField select label="Radius"  variant="filled" color="primary" id="radius"
                       placeholder={placeHolders.radius}
                       onChange={handleChange} value={requestBody.radius || ''} focused>
              {radius.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>


            <TextField select label="Goals"  variant="filled" color="primary" id="goals"
                       placeholder={placeHolders.goals}
                       onChange={handleChange} value={requestBody.goals || ''} focused>
              {goals.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

          </div>
        </Box>
      </div>

      <div id="editlayout">
        <Button variant="contained" color="primary" onClick={handleSubmit}
          Update Profile
        </Button>
      </div>

    </div>
  );
}

