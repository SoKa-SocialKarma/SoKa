import { useEffect, useState } from 'react'
// import { useParams } from 'react-router'

import UserCard from '../Components/UserCard.js'
import { Container, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

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

function UserFeed () {
  const classes = useStyles()
  const [currentUserPotentialMatchesProfiles, setCurrentUserPotentialMatchesProfiles] = useState([])
//   const { id } = useParams()

  const getCurrentUserPotentialMatches = async () => {
    try {
      const { data } = await axios.get(`${API}/users`)
      setCurrentUserPotentialMatchesProfiles(data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    return getCurrentUserPotentialMatches()
  }, [])

  return (
    <>
      <Container className={classes.root}>
        {currentUserPotentialMatchesProfiles?.map(profile => {
          return (
            <Paper className={classes.paper}>
              <UserCard profile={profile} key={profile.id} />
            </Paper>
          )
        })}
      </Container>
    </>
  )
}

export default UserFeed