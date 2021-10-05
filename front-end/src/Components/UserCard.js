import { useAuth } from '../Context/AuthContext'

import Button from '@material-ui/core/Button'
import Rating from '@material-ui/lab/Rating'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'
import UserModal from './UserModal'

import defaultProfile from '../Assets/defaultProfile.png'

const useStyles = makeStyles({
  root: {
    margin: '0',
    textAlign: 'center',
    padding: '10px',
    userSelect: 'none',
    fontFamily: 'Merriweather',
  },
  image: {
    width: '75%',
    padding: '20px',
    margin: '0',
    display: 'flex',
    alignSelf: 'center',
    justifySelf: 'center',
  },
  flex45: {
    width: '45%',
    height: '60%',
    gridRow: '6 / 7',
    placeSelf: 'center',
  },
  button: {
    borderRadius: '40px',
  },
  ratingBox: {
    display: 'grid',
    gridRow: '3 / 4',
    placeItems: 'center',
    width: '100%',
    paddingTop: '8px',
    userSelect: 'none',
    fontFamily: 'Merriweather',
  },
  infoBox: {
    display: 'grid',
    gridRow: '5 / 6',
    placeItems: 'center',
    width: '100%',
    userSelect: 'none',
    fontFamily: 'Merriweather',
  },
  divider: {
    height: '2px!important',
    backgroundColor: 'rgb(139, 58, 231)!important',
    width: '60%!important',
    margin: '0 20% 0 20%!important',
  },
});

function UserCard({ profile }) {
  const classes = useStyles()
  const { currentUser } = useAuth()
  const keepAspectRatio = {
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
    width: 'auto',
    height: 'auto'
  }

  const { name, lastname, location, karma, experience, availabledays, image } = profile

  return (
    <>
      <h4 className={classes.root}>
        {name} {lastname}
      </h4>
      <img
        className={classes.image}
        src={image.url ? image.url : defaultProfile}
        alt='buddypic'
        style={keepAspectRatio}
      />
      <Box
        component='fieldset'
        mb={3}
        borderColor='transparent'
        className={classes.ratingBox}
      >
        <Typography
          component='legend'
          variant='h6'
          className={classes.ratingBox}
        >
          Karma Stars
        </Typography>

        <Rating
          name='read-only'
          value={Number(karma) - 0.4}
          readOnly
          precision={0.1}
          style={{ color: 'rgb(139, 58, 231)' }}
        />
      </Box>
      <Divider className={classes.divider} />
      <Box borderColor='transparent' className={classes.infoBox}>
        <div className={classes.flex}>
          <p>Availability: {availabledays ? availabledays[0] : ''}</p>
          <p>Location : {location ? location : ''}</p>
          <p>Experience: {experience}</p>
        </div>
      </Box>


      {!currentUser ? (
        <Button
          variant='contained'
          className={classes.flex45}
          color='secondary'
        >
          Match
        </Button>
      ) : (
        <Button
          variant='contained'
          color='secondary'
          className={classes.flex45}
        >
          Match
        </Button>
      )}
      <UserModal profile={profile} />
    </>
  )
}
export default UserCard;
