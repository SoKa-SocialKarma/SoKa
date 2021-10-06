import { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useAPI } from '../Context/AuthContext'
import { labels } from '../Util/searchFields'
import GoodExperience from '../Components/GoodExperience'
import BadExperience from '../Components/BadExperience'
import Badges from '../Components/Badges'
import WeLoveYou from '../Components/WeLoveYou'
import Sparkles from '../Components/Sparkles'

import { Avatar, Container, Typography, Button } from '@material-ui/core/'
import Rating from '@mui/material/Rating'
import Box from '@mui/material/Box'
import StarIcon from '@mui/icons-material/Star'
import { makeStyles } from '@material-ui/core/styles'
import defaultProfile from '../Assets/defaultProfile.png'
import { apiURL } from '../Util/apiURL'
import axios from 'axios'

const API = apiURL()


const useStyles = makeStyles(theme => ({
  container: {
    height: 'fit-content',
    padding: '4% 2% 4% 2%',
    display: 'grid',
    gridTemplateRows: '34vh auto auto'
  },
  boxOne: {
    height: '100%',
    display: 'grid',
    gridRow: '1/2',
    gridTemplateRows: '10% 18% 20% 18% 20%'
  },
  boxTwo: {
    height: '50%',
    display: 'grid',
    gridRow: '3/4'
  },
  avatar: {
    position: 'relative',
    border: 'solid 0.25rem rgba(162, 101, 236, 0.4)',
    borderRadius: '50%',
    width: '5rem',
    height: '5rem',
    display: 'grid',
    placeSelf: 'center',
    margin: ' 0 0 5% 0'
  },
  message: {
    color: 'black',
    height: '100%',
    display: 'grid',
    gridRow: '2/3',
    placeSelf: 'center',
    padding: '1%'
  },
  ratingContainer: {
    width: '100%',
    display: 'grid',
    gridRow: '3/4',
    placeSelf: 'center',
    padding: '2% 1% 1% 1%'
  },
  ratingStars: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  experience: {
    display: 'grid',
    gridRow: '4/5',
    placeSelf: 'center',
    padding: '1.5% 1% 2% 1%',
    fontSize: '1.2rem'
  },
  giveKarma: {
    width: '70%',
    display: 'grid',
    gridRow: '2/3',
    placeSelf: 'center'
  },
  karmaButtonContainer: {
    display: 'flex',
    justifyContent: 'space-around'
  }
}))

const ReviewPairUp = () => {
  const classes = useStyles()
  const { currentRevieweeData, getFreshUserData, updateCurrentRevieweeData } = useAPI()
  const [ body, setBody ] = useState({})
  const [reviewee, setReviewee] = useState()
  const [revieweeImage, setRevieweeImage] = useState(defaultProfile)
  const [revieweeId, setRevieweeId] = useState()
  const [showGood, setShowGood] = useState(false)
  const [showBad, setShowBad] = useState(false)

  const [karma, setKarma] = useState(2.5)
  const [hover, setHover] = useState(-1)
  const history = useHistory()
  const { id } = useParams()

  useEffect(() => {
    setReviewee(currentRevieweeData)
    setRevieweeImage(reviewee ? reviewee.image.url : defaultProfile)
    setRevieweeId(currentRevieweeData ? currentRevieweeData.id : reviewee.id)
  }, [currentRevieweeData, reviewee])

  useEffect(() => {
    if (karma > 3) {
      setShowGood(true)
      setShowBad(false)
    }
    if (karma < 2.5) {
      setShowBad(true)
      setShowGood(false)
    }
  }, [karma])

  useEffect(() => {
    const newKarma = (Number(currentRevieweeData ? currentRevieweeData.karma : reviewee.karma) + karma) / 2
    setBody({karma: Number(newKarma.toFixed(2)) })
  },[karma])


  const updateRevieweeKarma = () =>{
    axios.put(`${API}/users/${revieweeId}`, body).catch(c => console.warn('catch', c))
  }

  const updateUser = () =>{
    const userUpdate = {"pendingReview":{"pendingReview":false,"reviewing":{"id":0,"username":"-"}}}
     axios
    .put(`${API}/users/${id}`, userUpdate)
    .then(() => getFreshUserData(id))
    .then(()=>updateCurrentRevieweeData(0))
    .then(
      () => {
        history.push(`/users/${id}/feed`)
      },
      error => console.error(error)
      )
      .catch(c => console.warn('catch', c))
  }

  const giveKarma = () => {
    updateRevieweeKarma()
    updateUser() 
  }

  return (
    <>
      <Container maxWidth='lg' className={classes.container}>
        <Container className={classes.boxOne}>
          <Avatar
            alt='user-tobe-reviewed'
            src={revieweeImage}
            className={classes.avatar}
          />
          <Typography
            className={classes.message}
            color='inherit'
            variant='h5'
            component='div'
          >
            How was your experience with {reviewee ? reviewee.name : ''}
            {reviewee ? reviewee.lastname : ''}?
          </Typography>

          <Container className={classes.ratingContainer}>
            <Container className={classes.ratingStars}>
              <Rating
                size='large'
                name='hover-feedback'
                value={karma}
                precision={0.5}
                onChange={(event, newValue) => {
                  setKarma(newValue)
                }}
                onChangeActive={(event, newHover) => {
                  setHover(newHover)
                }}
                emptyIcon={
                  <StarIcon style={{ opacity: 0.55 }} fontSize='inherit' />
                }
              />
              {karma !== null && (
                <Box sx={{ ml: 4, fontSize: 22 }}>
                  {labels[hover !== -1 ? hover : karma]}
                </Box>
              )}
            </Container>
          </Container>
          {showGood && (
            <Typography
              className={classes.experience}
              color='inherit'
              variant='h5'
              component='div'
            >
              Awesome! What did you like.?
            </Typography>
          )}
          {showBad && (
            <Typography
              className={classes.experience}
              color='inherit'
              variant='h5'
              component='div'
            >
              Oh no. What went wrong.?
            </Typography>
          )}

          {showGood && <GoodExperience karma={karma} />}
          {showBad && <BadExperience karma={karma} />}
        </Container>
        <Container className={classes.giveKarma}>
          <Container className={classes.karmaButtonContainer}>
            <Sparkles>
              <Button variant='outlined' onClick={giveKarma}>Give Karma</Button>
            </Sparkles>
          </Container>
        </Container>
        <Box className={classes.boxTwo}>
          {showGood && <Badges />}
          {showBad && <WeLoveYou />}
        </Box>
      </Container>
    </>
  )
}

export default ReviewPairUp
ReviewPairUp.componentName = 'ReviewPairUp'
