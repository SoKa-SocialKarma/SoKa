import { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { FormHelperText } from '@material-ui/core'
import clsx from 'clsx'

import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
	padding: '20px'
  },
  radiosContainer:{
	  flexDirection: 'column',
	  justifyContent: 'space-evenly',
  },
  searchButton:{
	  width: '100%',
	  justifySelf:'center',
	  alignSelf: 'center',
	  padding: '10px',
  },
  bigFont: {
    fontSize: '1.85rem'
  },
  radios: {
    flexDirection: 'row'
  },
  disabled: {
    '&:hover': {
      backgroundColor: 'transparent'
    }
  },
  icon: {
    borderRadius: '50%',
    width: 16,
    height: 16,
    boxShadow:
      'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
    backgroundColor: '#f5f8fa',
    backgroundImage:
      'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
    '$root.Mui-focusVisible &': {
      outline: '2px auto rgba(19,124,189,.6)',
      outlineOffset: 2
    },
    'input:hover ~ &': {
      backgroundColor: '#ebf1f5'
    },
    'input:disabled ~ &': {
      boxShadow: 'none',
      background: 'rgba(206,217,224,.5)'
    }
  },
  checkedIcon: {
    backgroundColor: '#137cbd',
    backgroundImage:
      'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
    '&:before': {
      display: 'block',
      width: 16,
      height: 16,
      backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
      content: '""'
    },
    'input:hover ~ &': {
      backgroundColor: '#106ba3'
    }
  }
}))

/** ================================================================
 *            					MAIN FUNCTION
 *   ================================================================
 **/

const SearchForm = () => {
  const classes = useStyles()
  const [value, setValue] = useState('none')

  const handleRadioChange = event => {
    setValue(event.target.value)
  }

  function StyledRadio (props) {
    const classes = useStyles()

    return (
      <Radio
        className={classes.disabled}
        disableRipple
        color='default'
        checkedIcon={
          <span className={clsx(classes.icon, classes.checkedIcon)} />
        }
        icon={<span className={classes.icon} />}
        {...props}
      />
    )
  }

  const handleUserInput = e => {
    e.prevent.default()
  }
  const handleSubmit = e => {
    e.prevent.default()
  }

  const submitUserSearch = async e => {
    e.preventDefault()
    // verify If user input !== ''
    // if true, call the api
    // endpoint /users?
  }

  return (
    <>
      <FormControl className={classes.root} onSubmit={handleSubmit}>
        <Input
          placeholder='🔍 Search our incredible users'
          inputProps={{ 'aria-label': 'description' }}
          className={classes.bigFont}
          onChange={handleUserInput}
          onKeyPress={e => e.key === 'Enter' && submitUserSearch(e)}
        />
        <FormHelperText id='my-helper-text'>
          Optional search filtered by :
        </FormHelperText>
		<Container className={classes.radiosContainer}>
        <RadioGroup
          aria-label='search-by'
          name='search-radio'
          value={value}
          onChange={handleRadioChange}
          className={classes.radios}
        >
          <FormControlLabel value='name' control={<Radio />} label='Name' />
          <FormControlLabel
            value='lastname'
            control={<Radio />}
            label='Lastname'
          />
          <FormControlLabel
            value='username'
            control={<Radio />}
            label='Username'
          />
          <FormControlLabel
            value='location'
            control={<Radio />}
            label='Location'
          />
          <FormControlLabel value='gender' control={<Radio />} label='Gender' />
          <FormControlLabel
            value='disabled'
            name='none'
            disabled
            control={<StyledRadio />}
            label='(None)'
          />
        </RadioGroup>
		<Button type="submit" variant="contained" color="primary" className={classes.searchButton}>Search Now!</Button>
		</Container>
      </FormControl>
    </>
  )
}

export default SearchForm
