import { useState, useRef, useEffect } from 'react'
import { useElement, useAPI } from '../Context/AuthContext'
import { Link } from 'react-router-dom'
import SearchModal from './SearchModal'
import sokablue2 from '../Assets/sokablue2.png'
import clsx from 'clsx'

import { makeStyles, useTheme } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import CssBaseline from '@material-ui/core/CssBaseline'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Button from '@material-ui/core/Button'
const drawerWidth = 180

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100vw - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36,
    height: '100%'
  },
  hide: {
    display: 'none'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap'
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1
    }
  },
  toolbar: {
    width: '100%',
    height: '10vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar
  },
  topCenter: {
    width: '100vw',
    height: '10vh',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignSelf: 'center'
  },
  content: {
    flexGrow: 1,
    width: 'auto',
    height: '100vh',
    paddingTop: '12vh',
    paddingBottom: '2vh',
    overflowY: 'scroll'
  },
  authContainer: {
    width: '60%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: '10px'
  },
  login: {
    transform: 'translateY(10%)',
    height: '80%',
    width: '20%',
    fontSize: '1rem',
    color: 'white',
    '&:hover': {
      backgroundColor: '#edebfe',
      color: '#212121'
    }
  },
  menuIcon: {
    justifySelf: 'center',
    alignSelf: 'center'
  },
  iconsLeftSide: {
    height: '46vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly'
  },
  sokaContainer: {
    padding: '5px 0 5px 0',
    height: '100%'
  },
  sokaLogo: {
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
    width: 'auto',
    height: 'auto'
  }
}))

export default function Navbar ({ children }) {
  const { currentUser, currentUserData } = useAPI()
  const { elementSetter, drawerSetter } = useElement()
  const mainElementRef = useRef()
  const drawerElementRef = useRef()

  const classes = useStyles()
  const theme = useTheme()
  const [open, setOpen] = useState(false)
  const [id, setId] = useState(0)

  const handleDrawerOpen = () => {
    setOpen(true)
  }
  const handleDrawerClose = () => {
    setOpen(false)
  }

  const handleResize = () => {
    elementSetter({
      height: mainElementRef.current.clientHeight - 94,
      width: window.innerWidth - 74,
      element: mainElementRef.current
    })
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    elementSetter({
      height: mainElementRef.current.clientHeight - 94,
      width: window.innerWidth - 74,
      element: mainElementRef.current
    })
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  },[])

  const handleMouseEnter = () => {
    setOpen(true)
  }
  const handleMouseLeave = () => {
    setOpen(false)
  }

  useEffect(() => {
    drawerElementRef.current.addEventListener('mouseenter', handleMouseEnter)
    drawerSetter({
      drawerElement: drawerElementRef.current
    })
    // Don't need to remove event listener because Navbar never unmounts
    // return () => {
    //   drawerElementRef.removeEventListener('mouseenter', handleMouseLeave)
    // }
  }, [])

  useEffect(() => {
    drawerElementRef.current.addEventListener('mouseleave', handleMouseLeave)
    drawerSetter({
      drawerElement: drawerElementRef.current
    })
    // Don't need to remove event listener because Navbar never unmounts
    // return () => {
    //   drawerElementRef.removeEventListener('mouseleave', handleMouseLeave)
    // }
  }, [])

  useEffect(() => {
    currentUserData.id ? setId(currentUserData.id) : setId(0)
  }, [currentUserData])

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position='fixed'
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}
      >
        <Toolbar
          className={classes.toolbar}
          style={{ backgroundColor: '#10056F' }}
        >
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            edge='start'
            className={clsx(classes.menuButton, {
              [classes.hide]: open
            })}
          >
            <img
              src='https://img.icons8.com/fluency/2x/menu.png'
              alt='Menu'
              style={{ width: '36px', height: '36px' }}
            />
          </IconButton>
          <div className={classes.topCenter}>
            <IconButton
              component={Link}
              to='/'
              className={classes.sokaContainer}
            >
              <img src={sokablue2} alt='soka' className={classes.sokaLogo} />
            </IconButton>
            <div className={classes.authContainer}>
              <SearchModal />
              {!currentUser ? (
                <Button component={Link} to='/login' className={classes.login}>
                  Login
                </Button>
              ) : (
                <Button
                  component={Link}
                  to='/login-dashboard'
                  className={classes.login}
                >
                  {currentUser.email}
                </Button>
              )}
              {!currentUser ? (
                <Button
                  component={Link}
                  to='/signup'
                  className={classes.login}
                  style={{ border: 'solid 1px #edebfe' }}
                >
                  SignUp
                </Button>
              ) : null}
            </div>
          </div>
        </Toolbar>
      </AppBar>

      <Drawer
        ref={drawerElementRef}
        variant='permanent'
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open
          })
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List className={classes.iconsLeftSide}>
          <ListItem component={Link} to={`/users/${id}/feed/matches`}>
            <ListItemIcon>
              <img
                src='https://img.icons8.com/nolan/2x/handshake.png'
                alt='matches'
                style={{ width: '48px', height: '48px' }}
              />
            </ListItemIcon>
            <ListItemText primary='Matches' style={{ color: '#10056F' }} />
          </ListItem>

          {/* <ListItem component={Link} to={`/users/${id}/messages`}>
            <ListItemIcon>
              <img
                src='https://img.icons8.com/nolan/2x/messages-mac.png'
                alt='messages'
                style={{ width: '48px', height: '48px' }}
              />
            </ListItemIcon>
            <ListItemText primary='Inbox' style={{ color: '#10056F' }} />
          </ListItem> */}

          <ListItem component={Link} to={`/users/${id}/profile`}>
            <ListItemIcon>
              <img
                src='https://img.icons8.com/nolan/64/lifecycle.png'
                alt='profile'
                style={{ width: '48px', height: '48px' }}
              />
            </ListItemIcon>
            <ListItemText primary='Profile' style={{ color: '#10056F' }} />
          </ListItem>
          <ListItem component={Link} to='/map'>
            <ListItemIcon>
              <img
                src='https://img.icons8.com/nolan/64/map-marker.png'
                alt='mapbox-current-location'
                style={{ width: '48px', height: '48px' }}
              />
            </ListItemIcon>
            <ListItemText primary='Map' style={{ color: '#10056F' }} />
          </ListItem>
        </List>
        <Divider />
      </Drawer>
      <main className={classes.content} ref={mainElementRef}>
        {children}
      </main>
    </div>
  )
}
