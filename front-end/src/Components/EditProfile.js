import { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { firestoreThisImage } from '../Util/imageStore'
import { gender, experience, radius, goals } from '../Util/searchFields'
import { app } from '../firebase'
import { useAPI } from '../Context/AuthContext'
import { apiURL } from '../Util/apiURL'
import axios from 'axios'

import {
  Box,
  Paper,
  Container,
  TextField,
  MenuItem,
  FormControl,
  Input,
  InputLabel,
  Button,
  InputAdornment,
  IconButton
} from '@material-ui/core/'
import PhotoCamera from '@material-ui/icons/PhotoCamera'
import CssBaseline from '@material-ui/core/CssBaseline'
import { makeStyles } from '@material-ui/core/styles'

import defaultProfile from '../Assets/defaultProfile.png'
import user from '../Assets/user.png'
import pin from '../Assets/pin.png'
import calendar from '../Assets/calendar.png'

import DateFnsUtils from '@date-io/date-fns'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers'


const db = app.firestore()
const API = apiURL()

const useStyles = makeStyles(theme => ({
  container: {
    height: '80vh',
    padding: '0 2% 4% 2%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'space-around'
  },
  editProfilePictureArea: {
    display: 'grid',
    gridTemplateRows: '10px 1fr',
    padding: '1%'
  },
  photocamera: {
    display: 'none'
  },
  camera: {
    width: '7%',
    margin: '1.5% 30% 0 52.2%'
  },
  userProfilePicturePaper: {
    display: 'grid',
    gridRow: '2/3',
    placeSelf: 'center',
    width: '182px',
    height: '160px',
    borderRadius: '60px'
  },
  userProfilePicture: {
    width: '180px',
    height: '160px',
    borderRadius: '80px'
  },
  editLayout: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '20%',
    padding: '1% 10% 1% 10%'
  },
  twoForms: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: '1%'
  },
  date: {
    fontSize: 8,
    color: 'black'
  },
  divEdit: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  buttonEdit: {
    width: '60%',
    padding: '1%',
    margin: '0 20% 0 20%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  }
}))

export default function EditProfile () {
  const { currentUser, currentUserData, getFreshUserData } = useAPI()
  const [placeHolders, setPlaceHolders] = useState({})
  const [storedImage, setStoredImage] = useState(false)
  const [uploadedImage, setUploadedImage] = useState({})
  const [newImage, setNewImage] = useState({})
  const [today, setToday] = useState()

  const [requestBody, setRequestBody] = useState({})
  const [requestImageBody, setRequestImageBody] = useState({})
  let { id } = useParams()
  let history = useHistory()
  const classes = useStyles()

  // Availability Setter Helpers
  useEffect(() => {
    setToday(new Date().toLocaleDateString())
  }, [])

  useEffect(() => {
    const unmountMe = setPlaceHolders(currentUserData)
    return unmountMe
  }, [currentUserData])

  const removeOldDates = today => {
    const todaySplitted = today.split('/').map(num => Number(num))
    if(!currentUserData.availabledays){
      return []
    }
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
    let day = e.toLocaleDateString()
    const oldAvailability = removeOldDates(today)
    const newAvailability = [...oldAvailability, day]
    const updatedProfile = Object.assign(
      { ...requestBody },
      { availability: { days: newAvailability } }
    )
    setRequestBody(updatedProfile)
  }

  // Image Helpers
  useEffect(() => {
    const unmount = db
      .collection('UsersProfiles')
      .doc(currentUser.email)
      .onSnapshot(doc => {
        setUploadedImage(doc.data().images || [])
      })
    return unmount
  }, [storedImage, currentUser.email])

  useEffect(() => {
    const newImg = uploadedImage[uploadedImage.length - 1]
    setNewImage(newImg)
  }, [uploadedImage, setNewImage])

  useEffect(() => {
    setRequestImageBody({
      name: newImage?.name,
      url: newImage?.url,
      album: newImage?.album
    })
  }, [newImage])

  // Image Setter
  const setImage = async e => {
    const storedImageCall = await firestoreThisImage(
      e.target.files[0],
      currentUser.email,
      placeHolders.image.album
    )
    setStoredImage(storedImageCall)
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
    setRequestBody({
      ...requestBody,
      [event.target.name]: event.target.value
    })
  }

  const updateProfile = profileInfo => {
    axios
      .put(`${API}/users/${id}`, profileInfo)
      .then(() => getFreshUserData(id))
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

    if (requestImageBody.album !== undefined) {
      const body = Object.assign(
        { ...requestBody },
        { image: requestImageBody }
      )
      updateProfile(body, id)
    } else {
      updateProfile(requestBody, id)
    }
  }

  return (
    <Container maxWidth='lg' className={classes.container}>
      <CssBaseline />
      <Box className={classes.editProfilePictureArea}>
        <label htmlFor='icon-button-file'>
          <Input
            className={classes.photocamera}
            onChange={setImage}
            id='icon-button-file'
            accept='image/*'
            type='file'
          />
          <IconButton
            className={classes.camera}
            aria-label='upload picture'
            component='span'
            color='primary'
          >
            <PhotoCamera />
          </IconButton>
        </label>
        <Paper elevation={1} className={classes.userProfilePicturePaper}>
          <img
            // src='https://images.pexels.com/photos/2078265/pexels-photo-2078265.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
            src={
              placeHolders.image?.url ? placeHolders.image.url : defaultProfile
            }
            alt='Profile-user'
            className={classes.userProfilePicture}
          />
        </Paper>
      </Box>

      <Box className={classes.editLayout}>
        <Container className={classes.twoForms}>
          <FormControl variant='standard' fullWidth>
            <InputLabel htmlFor='name'>Name</InputLabel>
            <Input
              placeholder={placeHolders.name}
              className={classes.textField}
              value={requestBody.name || ''}
              onChange={handleChange}
              name='name'
              id='name'
              startAdornment={
                <InputAdornment position='start'>
                  <img src={user} alt='name' style={{ width: '25px' }} />
                </InputAdornment>
              }
            />
          </FormControl>

          <FormControl variant='standard' fullWidth>
            <InputLabel htmlFor='lastname'>Last Name</InputLabel>
            <Input
              placeholder={placeHolders.lastname}
              className={classes.textField}
              value={requestBody.lastname || ''}
              onChange={handleChange}
              name='lastname'
              id='lastname'
              startAdornment={
                <InputAdornment position='start'>
                  <img src={user} alt='lastname' style={{ width: '25px' }} />
                </InputAdornment>
              }
            />
          </FormControl>

          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              KeyboardButtonProps={{ 'aria-label': 'change date' }}
              onChange={setAvailability}
              className={classes.date}
              placeholder={today}
              orientation='landscape'
              format='MM/dd/yyyy'
              label='Date'
              id='date'
              fullWidth
            />
          </MuiPickersUtilsProvider>

          <FormControl variant='standard' fullWidth>
            <InputLabel htmlFor='location'>Location</InputLabel>
            <Input
              placeholder={String(placeHolders.location)}
              value={requestBody.location || ''}
              className={classes.textField}
              onChange={handleChange}
              name='location'
              id='location'
              startAdornment={
                <InputAdornment position='start'>
                  <img src={pin} alt='location pin' style={{ width: '25px' }} />
                </InputAdornment>
              }
            />
          </FormControl>
        </Container>

        <Container className={classes.twoForms}>
          <TextField
            value={requestBody.experience ? requestBody.experience.experience  : ''}
            className={classes.textField}
            onChange={setExperience}
            label='Experience Level'
            margin='normal'
            variant='filled'
            name='experience'
            id='experience'
            fullWidth
            select
          >
            {experience.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            value={requestBody.gender || ''}
            onChange={handleChange}
            label='Preferred Gender'
            margin='normal'
            variant='filled'
            name='gender'
            id='gender'
            fullWidth
            select
          >
            {gender.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            value={requestBody.radius || ''}
            onChange={handleChange}
            margin='normal'
            label='Radius'
            variant='filled'
            name='radius'
            id='radius'
            fullWidth
            select
          >
            {radius.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            value={requestBody.goals ? requestBody.goals.goals[requestBody.goals.goals.length -1] : ''}
            onChange={setGoals}
            margin='normal'
            label='Goals'
            id='goals'
            variant='filled'
            name='goals'
            fullWidth
            select
          >
            {goals.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Container>
      </Box>

      <div className={classes.buttonEdit}>
        <Button
          onClick={() => history.push(`/users/${placeHolders.id}/profile`)}
          style={{ width: '40%' }}
          variant='outlined'
          color='secondary'
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          style={{ width: '40%' }}
          variant='contained'
          color='primary'
        >
          Update Profile
        </Button>
      </div>
    </Container>
  )
}
