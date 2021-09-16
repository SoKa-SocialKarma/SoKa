import { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { goals, experience } from '../Util/searchFields'

import {
  TextField,
  MenuItem,
  FormHelperText,
  Container,
  FormControl
} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: '10px 0px 0px 0px',
    gap: theme.spacing(3.6)
  },
  optionMenu: {
    width: '22%'
  },
  container: {
    padding: '0px 20px 0px 20px!important'
  }
}))

/** ================================================================
 *            					MAIN FUNCTION
 *   ================================================================
 **/

const UniqueSearchForm = ({ today, getSearchResults }) => {
  const classes = useStyles()
  const [searchParams, setSearchParams] = useState({
    goal: '',
    experience: '',
    availability: today
  })

  const [day, setDay] = useState(today)

  const handleDateChange = event => {
    event.preventDefault()
    setDay(event.target.value)
    console.log('DATE EVENT IN UNIQUES')
    console.log(day)
  }

  const handleChange = async event => {
    event.preventDefault()
    switch (event.target.name) {
      case 'goal':
        await getSearchResults({
          goal: event.target.value,
          experience: '',
          availability: ''
        })
        break
      case 'experience':
        await getSearchResults({
          experience: event.target.value,
          goal: '',
          availability: ''
        })
        break
      case 'availability':
        await getSearchResults({
          availability: event.target.value,
          goal: '',
          experience: ''
        })
        break
      default:
        break
    }

    setSearchParams({ goal: '', experience: '', availability: today })
  }

  return (
    <Container className={classes.container}>
      <FormHelperText id='my-helper-text'>
        Quick search filtered by only one field :
      </FormHelperText>
      <FormControl className={classes.root}>
        <TextField
          id='outlined-select-goals'
          select
          label='Goals'
          name='goal'
          value={searchParams.goal}
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
          name='experience'
          value={searchParams.experience}
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
          name='availability'
          type='datetime-local'
          className={classes.optionMenu}
          value={day}
          onChange={handleDateChange}
          InputLabelProps={{
            shrink: true
          }}
        />
      </FormControl>
    </Container>
  )
}

export default UniqueSearchForm
