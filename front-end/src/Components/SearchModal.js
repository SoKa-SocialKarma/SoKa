import { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { useAPI } from '../Context/AuthContext'

import PopularSearches from './PopularSearches'
import searchLogo from '../Assets/searchLogo.svg'

import { makeStyles } from '@material-ui/core/styles'
import {
  Container,
  Backdrop,
  IconButton,
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
    transform: 'translateY(10.1vh)',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  },
  container: {
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  searchLogo: {
    maxWidth: '100%',
    maxHeight: '100%',
    width: 'auto',
    height: 'auto'
  }
}))

export default function SearchModal() {
  const { getResultsUsingSokaQuery, currentSearchResults } = useAPI()

  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [today, setToday] = useState('')
  const [mustRedirect, setMustRedirect] = useState(false)

  useEffect(() => {
    if (currentSearchResults) {
      setMustRedirect(true)
    }
  }, [currentSearchResults])

  useEffect(() => {
    getDate()
  }, [])

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
    setToday(await date)
  }

  const getSearchResults = async searchParams => {
    await getResultsUsingSokaQuery(searchParams)
    handleCloseSearchMenu()
  }

  return (
    <>
      {mustRedirect && <Redirect to='/search-results' />}
      <IconButton onClick={handleOpenSearchMenu} className={classes.searchLogo}>
        <img
          src={searchLogo}
          alt='search menu'
          style={{
            width: '60%',
            height: '60%'
          }}
        />
      </IconButton>

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
              <PopularSearches
                today={today}
                getSearchResults={getSearchResults}
              />
            </Container>
          </Paper>
        </Fade>
      </Modal>
    </>
  )
}
