import { useEffect, useState } from 'react'
import { Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import Users from '../Components/Users.js'
import UserProfile from '../Components/UserProfile.js'
import Paper from '@material-ui/core/Paper'
import axios from 'axios'
import { apiURL } from '../Util/apiURL.js'
const API = apiURL()

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    gap: '20px'
  },
  paper: {
    width: '48%',
    height: '640px',
    padding: '10px',
    display: 'grid',
    gridTemplateRows: '10% 40% 7% 23% 18%'
  }
})

function Demo () {
  const classes = useStyles()
  const [demoProfiles, setDemoProfiles] = useState([])

  const getDemoUsers = async () => {
    try {
      const { data } = await axios.get(`${API}/users?limit=6`)
      setDemoProfiles(data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    return getDemoUsers()
  }, [])

  return (
    <>
      <Container className={classes.root}>
        {demoProfiles?.map(profile => {
          return (
            <Paper className={classes.paper}>
              <Users profile={profile} key={profile.id} />
            </Paper>
          )
        })}
      </Container>
    </>
  )
}

export default Demo
