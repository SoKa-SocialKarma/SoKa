import { useEffect, useState } from 'react'
import { useParams, Redirect } from 'react-router'
import { useAPI } from '../Context/AuthContext'

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
    height: '85vh',
    padding: '10px',
    display: 'grid',
    gridTemplateRows: '10% 32% 13% 2% 18% 12% 8%'
  }
})

function UserMatches () {
  const classes = useStyles()
  const [currentUserMatches, setCurrentUserMatches] = useState([])
  const [sameUser, setSameUser] = useState(false)
  const { currentUserData } = useAPI()
  const { id } = useParams()

  useEffect(() => {
    const unSubscribe = async () => {
      try {
        const { data } = await axios.get(
          `${API}/users/${currentUserData.id}/feed/matches`
        )
        setCurrentUserMatches(data)
        setSameUser(id == currentUserData.id)
      } catch (err) {
        console.log(err)
      }
    }
    
  return unSubscribe()
  }, [currentUserData, id])

  return (
    <>
      <Container className={classes.root}>
        {sameUser ? (
          currentUserMatches.map(profile => {
            return (
              <Paper className={classes.paper} key={`${profile.id}-mui-matches`}>
                <UserCard profile={profile} key={profile.id} />
              </Paper>
            )
          })
        ) : (
          <Redirect to={`/users/${currentUserData.id}/feed/matches`} />
        )}
      </Container>
    </>
  )
}

export default UserMatches
