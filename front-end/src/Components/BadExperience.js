import { useState } from 'react'
import { Box, Container, Button } from '@material-ui/core/'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  options: {
    display: 'grid',
    gridRow: '5/6',
    placeSelf: 'center',
    height: '100%'
  },
  optionsFlex: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center'
  },
  selectButton: {
    width: '14%',
    height: '45%',
    padding: '1%',
    margin: '1%',
    textTransform: 'Capitalize',
    fontSize: '1.1rem'
  }
}))

const BadExperience = () => {
  const classes = useStyles()
  const [selected, setSelected] = useState(new Array(6).fill(false))

  const toggleSelection = e => {
    e.preventDefault()
    const index = Number(e.target.parentElement.value)
    const newSelected = [...selected]
    newSelected[index] = !newSelected[index]
    setSelected(newSelected)
  }

  return (
    <>
      <Container className={classes.options}>
        <Box className={classes.optionsFlex}>
          <Button
            value={0}
            onClick={toggleSelection}
            className={classes.selectButton}
            variant={selected[0] ? 'contained' : 'outlined'}
            color={selected[0] ? 'primary' : 'default'}
          >
            Unpunctual
          </Button>
          <Button
            value={1}
            onClick={toggleSelection}
            className={classes.selectButton}
            variant={selected[1] ? 'contained' : 'outlined'}
            color={selected[1] ? 'primary' : 'default'}
          >
            Rude
          </Button>
          <Button
            value={2}
            onClick={toggleSelection}
            className={classes.selectButton}
            variant={selected[2] ? 'contained' : 'outlined'}
            color={selected[2] ? 'primary' : 'default'}
          >
            Narcissistic
          </Button>

          <Button
            value={3}
            onClick={toggleSelection}
            className={classes.selectButton}
            variant={selected[3] ? 'contained' : 'outlined'}
            color={selected[3] ? 'primary' : 'default'}
          >
            Unprofessional
          </Button>
          <Button
            value={4}
            onClick={toggleSelection}
            className={classes.selectButton}
            variant={selected[4] ? 'contained' : 'outlined'}
            color={selected[4] ? 'primary' : 'default'}
          >
            Negative
          </Button>
          <Button
            value={5}
            onClick={toggleSelection}
            className={classes.selectButton}
            variant={selected[5] ? 'contained' : 'outlined'}
            color={selected[5] ? 'primary' : 'default'}
          >
            Unaccountable
          </Button>
        </Box>
      </Container>
    </>
  )
}

export default BadExperience
