import { useState, useEffect } from 'react'
import { Box, Paper } from '@material-ui/core/'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  badge: {
    width: '30%',
    padding: '2% 4% 2% 4%',
    margin: '1%',
    cursor: 'pointer',
    borderRadius: '10px'
  },
  badgeDetails: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  badgeImage: {
    width: '40%'
  },
  title: {
    fontSize: '1rem',
    fontWeight: 'bold',
    padding: '2% 1% 4% 1%'
  },
  info: {
    fontSize: '0.8rem',
    padding: '6% 1% 1% 1%',
    textAlign: 'center'
  }
}))

const Badge = props => {
  const classes = useStyles()

  const [animation, setAnimation] = useState()
  const [toggle, setToggle] = useState(false)
  const badge = props.badge

  useEffect(() => {
    renderAnimations()
  }, [toggle])

  const renderAnimations = () => {
    return toggle ? setAnimation(1) : setAnimation(0)
  }

  const handleClick = () => {
    setToggle(!toggle)
  }

  return (
    <Paper
      className={classes.badge}
      id={badge.image.name}
      elevation={3}
      onClick={handleClick}
      animation={animation}
    >
      <Box className={classes.badgeDetails}>
        <span className={classes.title}>{badge.badge_name}</span>
        <img
          src={badge.image.url}
          alt={badge.badge_name}
          className={classes.badgeImage}
        />
        <span className={classes.info}>{badge.info.info}</span>
      </Box>
    </Paper>
  )
}

export default Badge
