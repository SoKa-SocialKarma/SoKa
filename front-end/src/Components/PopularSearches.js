import { useState } from 'react'
import { gender, location, radius } from '../Util/searchFields'
import { goals, experience } from '../Util/searchFields'

import {
  FormControl,
  FormHelperText,
  TextField,
  MenuItem,
  Button,
  Container
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: '16px 0px 0px 0px',
    gap: theme.spacing(3.6)
  },
  optionMenu: {
    width: '22%'
  },
  container: {
    padding: '0px 20px 0px 20px!important'
  },
  bigFont: {
    fontSize: '1.85rem'
  },
  searchButton: {
    height: '100%'
  }
}))

/** ================================================================
 *            					MAIN FUNCTION
 *   ================================================================
 **/

const PopularSearches = ({ today, getSearchResults }) => {
  const classes = useStyles()

  const [userSelectedGoal, setUserSelectedGoal] = useState('')
  const [userSelectedExperience, setUserSelectedExperience] = useState('')
  const [userSelectedAvailability, setUserSelectedAvailability] = useState(
    today
  )
  const [userSelectedGender, setUserSelectedGender] = useState('')
  const [userSelectedLocation, setUserSelectedLocation] = useState('')
  const [userSelectedRadius, setUserSelectedRadius] = useState('')

  const handleChange = event => {
    event.preventDefault()
    switch (event.target.name) {
      case 'goal-search':
        setUserSelectedGoal(event.target.value)
        break
      case 'experience-search':
        setUserSelectedExperience(event.target.value)
        break
      case 'availability-search':
        setUserSelectedAvailability(event.target.value)
        break
      case 'gender-search':
        setUserSelectedGender(event.target.value)
        break
      case 'location-search':
        setUserSelectedLocation(event.target.value)
        break
      case 'radius-search':
        setUserSelectedRadius(event.target.value)
        break
      default:
        break
    }
  }

  const handleSubmit = event => {
    event.preventDefault()

    const searchParams = {
      goal: userSelectedGoal,
      experience: userSelectedExperience,
      availability: userSelectedAvailability,
      gender: userSelectedGender,
      location: userSelectedLocation,
      radius: userSelectedRadius
    }
    getSearchResults(searchParams)
  }

  return (
    <Container className={classes.container}>
      <FormHelperText id='my-helper-text'>
        Quick Search with Multiple combinations :
      </FormHelperText>
      <FormControl className={classes.root}>
        <TextField
          id='outlined-select-goals'
          select
          label='Goals'
          name='goal-search'
          value={userSelectedGoal}
          onChange={handleChange}
          variant='outlined'
          className={classes.optionMenu}
        >
          {goals.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id='outlined-select-experience'
          select
          label='Experience'
          name='experience-search'
          value={userSelectedExperience}
          onChange={handleChange}
          variant='outlined'
          className={classes.optionMenu}
        >
          {experience.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id='datetime-local'
          label='Day'
          name='availability-search'
          type='datetime-local'
          className={classes.optionMenu}
          value={userSelectedAvailability}
          onChange={handleChange}
          InputLabelProps={{
            shrink: true
          }}
        />
      </FormControl>
      <Container className={classes.root}>
        <FormControl className={classes.optionMenu}>
          <TextField
            id='outlined-select-goals'
            select
            label='Gender'
            name='gender-search'
            value={userSelectedGender}
            onChange={handleChange}
            variant='outlined'
          >
            {gender.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </FormControl>
        <FormControl className={classes.optionMenu}>
          <TextField
            id='outlined-select-experience'
            select
            label='Borough'
            name='location-search'
            value={userSelectedLocation}
            onChange={handleChange}
            variant='outlined'
          >
            {location.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </FormControl>
        <FormControl className={classes.optionMenu}>
          <TextField
            id='outlined-select-radius'
            select
            label='Radius'
            name='radius-search'
            value={userSelectedRadius}
            onChange={handleChange}
            variant='outlined'
          >
            {radius.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </FormControl>
        <Button
          onClick={handleSubmit}
          variant='contained'
          color='secondary'
          className={classes.searchButton}
        >
          Search Now!
        </Button>
      </Container>
    </Container>
  )
}

export default PopularSearches
