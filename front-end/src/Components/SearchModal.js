import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useAuth } from '../Context/AuthContext'

import PopularSearches from './PopularSearches'

import { makeStyles } from '@material-ui/core/styles'
import {
  Container,
  Backdrop,
  Button,
  Paper,
  Fade,
  Modal
} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  paper: {
    width: '100vw',
    transform: 'translateY(81px)',
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
  const { getSokaRequestQuery } = useAuth()
  const history = useHistory()

  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [today, setToday] = useState('')

  const handleOpenSearchMenu = () => {
    setOpen(true)
  }

  const handleCloseSearchMenu = () => {
    setOpen(false)
  }

  const getDate = async () => {
    const date = new Date(new Date().toString().split('GMT')[0] + ' UTC')
      .toISOString()
      .split('.')[0]
    await setToday(date)
  }

  const getSearchResults = async searchParams => {
    await getSokaRequestQuery(searchParams)
    history.push('/search-results')
    handleCloseSearchMenu()
  }

  useEffect(() => {
    const unsubscribe = getDate()
    return unsubscribe
  }, [])

  return (
    <div>
      <Button onClick={handleOpenSearchMenu}>
        <img
          src='https://img.icons8.com/external-kiranshastry-gradient-kiranshastry/64/000000/external-search-fitness-kiranshastry-gradient-kiranshastry.png'
          alt='search menu'
          style={{
            width: '56px',
            height: '56px',
            transform: 'translate(10px,8px)'
          }}
        />
      </Button>

      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        className={classes.modal}
        open={open}
        onClose={handleCloseSearchMenu}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={open}>
          <Paper elevation={3} className={classes.paper}>
            <Container className={classes.container}>
              <PopularSearches today={today} getSearchResults={getSearchResults} />
            </Container>
          </Paper>
        </Fade>
      </Modal>
    </div>
  )
}
