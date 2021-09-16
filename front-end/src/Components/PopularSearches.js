import { useState } from 'react'
import { gender, location, radius } from '../Util/searchFields'

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
    padding: '10px 20px 0px 20px!important'
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

const PopularSearches = ({ getSearchResults }) => {
  const classes = useStyles()

  const [userSelectedGender, setUserSelectedGender] = useState('')
  const [userSelectedLocation, setUserSelectedLocation] = useState('')
  const [userSelectedRadius, setUserSelectedRadius] = useState('')

  const handleChange = event => {
    event.preventDefault()
    switch (event.target.name) {
      case 'gender':
        setUserSelectedGender(event.target.value)
        break
      case 'location':
        setUserSelectedLocation(event.target.value)
        break
      case 'radius':
        setUserSelectedRadius(event.target.value)
        break
      default:
        break
    }
  }

  const handleSubmit = async event => {
    event.preventDefault()

    const searchParams = {
      gender: userSelectedGender,
      location: userSelectedLocation,
      radius: userSelectedRadius
    }

    await getSearchResults(searchParams)
  }

  return (
    <Container className={classes.container}>
      <FormHelperText id='my-helper-text'>
        Multiple options to narrow your search :
      </FormHelperText>
      <Container className={classes.root}>
        <FormControl className={classes.optionMenu}>
          <TextField
            id='outlined-select-goals'
            select
            label='Gender'
            name='gender'
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
            name='location'
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
            name='radius'
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
          color='primary'
          className={classes.searchButton}
        >
          Search Now!
        </Button>
      </Container>
    </Container>
  )
}

export default PopularSearches
