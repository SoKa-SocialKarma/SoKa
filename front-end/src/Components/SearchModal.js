import { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'

import PopularSearches from './PopularSearches'
import SearchForm from './SearchForm'

import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Container from '@material-ui/core/Container'

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  paper: {
    width: '100vw',
    transform: 'translateY(60px)',
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  },
  container: {
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
}))

export default function SearchModal () {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [today, setToday] = useState('')

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const getDate = async () => {
    const date = new Date(new Date().toString().split('GMT')[0] + ' UTC')
      .toISOString()
      .split('.')[0]
    await setToday(date)
  }

  useEffect(() => {
    getDate()
  }, [])

  return (
    <div>
      <Button onClick={handleOpen}>Search</Button>

      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={open}>
          <Paper elevation={3} className={classes.paper}>
            <Container className={classes.container}>
              <SearchForm />
              <PopularSearches today={today} />
            </Container>
          </Paper>
        </Fade>
      </Modal>
    </div>
  )
}
