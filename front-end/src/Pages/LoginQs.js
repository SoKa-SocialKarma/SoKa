import { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { useAPI } from '../Context/AuthContext'
import { apiURL } from '../Util/apiURL'
import axios from 'axios'

import {
  Grid,
  Typography,
  createTheme,
  ThemeProvider,
  Box,
  Container,
  Avatar,
  TextField,
  Button,
  CssBaseline,
  Select,
  InputLabel,
  MenuItem
} from '@material-ui/core'

const theme = createTheme()
const API = apiURL()

export default function LoginQs () {
  const [newUserBody, setNewUserBody] = useState({})
  const [ selectedEx, setSelectedEx ] = useState('')
  const [id, setId] = useState('')
  const {
    currentUser,
    currentUserData,
    getNewUserData,
    unblockNewUser,
    createFirebaseAlbum
  } = useAPI()

  useEffect(() => {
    setNewUserBody({ uuid: currentUser.uid })
  }, [currentUser.uid])

  useEffect(() => {
    if (currentUserData.id) {
      setId(currentUserData.id)
    }
  }, [currentUserData.id])

  const createNewProfile = newUserBody => {
    return axios
      .post(`${API}/users`, newUserBody)
      .then(() => unblockNewUser(currentUser.uid))
      .then(() => getNewUserData(currentUser))
      .then(() => createFirebaseAlbum(currentUser))
      .catch(err => console.log(err))
  }

  // Experience Setter
  const setExperience = e => {
    e.preventDefault()
	setSelectedEx(e.target.value)

    const userExp = new RegExp(`["${e.target.value}"]`)
    const experience = `{"experience":${userExp.source}}`
    const image = '{"name":"","url":"","album":""}'
    const goals = '{"goals":[]}'
    const availability = '{"days":[]}'
    const coordinates = '{"latitude":40.7128,"longitude":-74.006}'
    const matchRequests = '{"matchRequests":[],"acceptedMatchesHistory":[]}'
    const pendingReview =
      '{"pendingReview":false,"reviewing":{"id":0,"username":""}}'

    setNewUserBody(
      Object.assign(
        { ...newUserBody },
        { username: '' },
        { location: 'New York' },
        {coordinates: coordinates},
        { karma: 5 },
        { image: image },
        { badges: false },
        { goals: goals },
        { experience: experience },
        { availability: availability },
        { matchRequests: matchRequests },
        { pendingReview: pendingReview }
      )
    )
  }

  const handleChange = e => {
    e.preventDefault()

    setNewUserBody({
      ...newUserBody,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = e => {
    e.preventDefault()

    createNewProfile(newUserBody)
  }

  return (
    <ThemeProvider theme={theme}>
      {id && <Redirect to={`/users/${id}/feed`} />}
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}></Avatar>
          <Typography component='h1' variant='h5'>
            Personalize your account
          </Typography>
          <Box component='form' noValidate sx={{ mt: 3 }}>
            <Grid container spacing={5}>
              <Grid item xs={12} sm={0}>
                <TextField
                  value={newUserBody.name ? newUserBody.name : ''}
                  onChange={handleChange}
                  name='name'
                  required
                  fullWidth
                  id='name'
                  label='First Name'
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={0}>
                <TextField
                  value={newUserBody.lastname ? newUserBody.lastname : ''}
                  onChange={handleChange}
                  required
                  fullWidth
                  id='lastname'
                  label='Last Name'
                  name='lastname'
                  variant='standard'
                />
              </Grid>
              <Grid item xs={12}>
                <InputLabel id='experience'>Experience</InputLabel>
                <Select
                  value={selectedEx}
                  onChange={setExperience}
                  label='experience'
                  fullWidth
                >
                  <MenuItem value='Beginner'>Beginner</MenuItem>
                  <MenuItem value='Intermediate'>Intermediate</MenuItem>
                  <MenuItem value='Advanced'>Advanced</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={12}>
                <InputLabel id='radius'>Radius</InputLabel>
                <Select
                  value={newUserBody.radius ? newUserBody.radius : ''}
                  onChange={handleChange}
                  name='radius'
                  label='radius'
                  fullWidth
                >
                  <MenuItem value={5}>5 miles</MenuItem>
                  <MenuItem value={10}>10 miles</MenuItem>
                  <MenuItem value={15}>15 miles</MenuItem>
                  <MenuItem value={25}>25 miles</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={12}></Grid>
            </Grid>
            <Button
              onClick={handleSubmit}
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
            >
              Save
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}

LoginQs.componentName = 'LoginQs'
