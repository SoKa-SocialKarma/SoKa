import { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { goals, experience, radius } from '../Util/searchFields'

import FormControl from '@material-ui/core/FormControl'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px'
  },
  optionMenu: {
    width: '22%'
  },
  bigFont: {
    fontSize: '1.85rem'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '22%'
  }
}))



/** ================================================================
*            					MAIN FUNCTION
*   ================================================================
**/


const PopularSearches = ({ today }) => {
  const classes = useStyles()
  const [userSelected, setUserSelected] = useState('')

  const handleChange = event => {
    setUserSelected(event.target.value)
  }

  return (
    <>
      <FormControl className={classes.root}>
        <TextField
          id='outlined-select-goals'
          select
          label='Goals'
          value={userSelected}
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
          value={userSelected}
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
          id='outlined-select-radius'
          select
          label='Radius'
          value={userSelected}
          onChange={handleChange}
          variant='outlined'
          className={classes.optionMenu}
        >
          {radius.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id='datetime-local'
          label='Day'
          type='datetime-local'
          defaultValue={today}
          className={classes.textField}
          InputLabelProps={{
            shrink: true
          }}
        />
      </FormControl>
    </>
  )
}

export default PopularSearches
