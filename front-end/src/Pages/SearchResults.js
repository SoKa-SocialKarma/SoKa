import { useAuth } from '../Context/AuthContext'

import UserCard from '../Components/UserCard.js'
import NoSearchResults from '../Components/NoSearchResults.js'

import { makeStyles } from '@material-ui/core/styles'
import { Container, Paper } from '@material-ui/core'

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

function SearchResults () {
  const classes = useStyles()
  const { currentSearchResults } = useAuth()
  return (
    <>
      <Container className={classes.root}>
        {currentSearchResults?.map(profile => {
          return (
            <Paper className={classes.paper}>
              <UserCard profile={profile} key={profile.id} />
            </Paper>
          )
        })}
        {!currentSearchResults.length && <NoSearchResults />}
      </Container>
    </>
  )
}

export default SearchResults
