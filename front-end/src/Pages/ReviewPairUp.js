import { useState, useEffect } from 'react'
import { useAPI } from '../Context/AuthContext'
import { labels } from '../Util/searchFields'
import GoodExperience from '../Components/GoodExperience'
import BadExperience from '../Components/BadExperience'
import Badges from '../Components/Badges'

import { Avatar, Container, Typography } from '@material-ui/core/'
import Rating from '@mui/material/Rating'
import Box from '@mui/material/Box'
import StarIcon from '@mui/icons-material/Star'
import { makeStyles } from '@material-ui/core/styles'
import defaultProfile from '../Assets/defaultProfile.png'

const useStyles = makeStyles(theme => ({
  container: {
    height: 'fit-content',
    padding: '4% 2% 4% 2%',
    display: 'grid',
    gridTemplateRows: '1fr 1fr'
  },
  boxOne: {
    height: '86%',
    display: 'grid',
    gridRow: '1/2',
    gridTemplateRows: '10% 18% 20% 18% 20%'
  },
  boxTwo: {
    height: '50%',
    display: 'grid',
    gridRow: '2/3'
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
  }
}))

const ReviewPairUp = () => {
  const classes = useStyles()
  const { currentRevieweeData } = useAPI()
  const [reviewee, setReviewee] = useState()
  const [showGood, setShowGood] = useState(false)
  const [showBad, setShowBad] = useState(false)

  const [karma, setKarma] = useState(2.5)
  const [hover, setHover] = useState(-1)

  useEffect(() => {
    setReviewee(currentRevieweeData)
  }, [currentRevieweeData])

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

  return (
    <>
      <Container maxWidth='lg' className={classes.container}>
        <Container className={classes.boxOne}>
          <Avatar
            alt='user-tobe-reviewed'
            src={defaultProfile}
            className={classes.avatar}
          />
          <Typography
            className={classes.message}
            color='inherit'
            variant='h5'
            component='div'
          >
            How was your experience with {reviewee ? reviewee.name : ''}{' '}
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
        <Box className={classes.boxTwo}>{showGood && <Badges />}</Box>
      </Container>
    </>
  )
}

export default ReviewPairUp
ReviewPairUp.componentName = 'ReviewPairUp'
