import { useState, useEffect } from 'react'
import { Container } from '@material-ui/core/'
import { makeStyles } from '@material-ui/core/styles'
import { useAPI } from '../Context/AuthContext'
import Badge from './Badge'

const useStyles = makeStyles(theme => ({
  root: {
    width: '80%',
    height: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    padding: '1.5% 1% 2% 1%',
    gap: theme.spacing(1)
  }
}))

const Badges = () => {
  const classes = useStyles()
  const { sokaBadges } = useAPI()
  const [badges, setBadges] = useState([])

  useEffect(() => {
    setBadges(sokaBadges)
  }, [sokaBadges])

  return (
    <Container className={classes.root}>
      {badges.map(badge => {
        return <Badge key={badge.id} badge={badge} />
      })}
    </Container>
  )
}

export default Badges
