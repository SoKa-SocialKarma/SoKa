import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../Context/AuthContext'

import SearchModal from './SearchModal'
import sokalsm from '../Assets/sokalsm.png'
import clsx from 'clsx'

import { makeStyles, useTheme } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import CssBaseline from '@material-ui/core/CssBaseline'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ChatIcon from '@material-ui/icons/Chat'
import Button from '@material-ui/core/Button'
import AccountBoxTwoToneIcon from '@material-ui/icons/AccountBoxTwoTone'
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions'

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
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36
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
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar
  },
  topCenter: {
    width: '100%',
    height: '80px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignSelf: 'center'
  },
  content: {
    flexGrow: 1
  },
  child: {
    paddingTop: theme.spacing(12),
    paddingBottom: theme.spacing(12)
  },
  authContainer: {
    width: '60%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  login: {
    width: '20%',
    fontSize: '1rem',
    color: 'white'
  },
  menuIcon: {
    justifySelf: 'center',
    alignSelf: 'center'
  }
}))

export default function Navbar ({ children }) {
  const { currentUser } = useAuth()
  const classes = useStyles()
  const theme = useTheme()
  const [open, setOpen] = useState(false)

  const handleDrawerOpen = () => {
    setOpen(true)
  }
  const handleDrawerClose = () => {
    setOpen(false)
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position='fixed'
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            edge='start'
            className={clsx(classes.menuButton, {
              [classes.hide]: open
            })}
          >
            <MenuIcon className={classes.menuIcon} />
          </IconButton>
          <div className={classes.topCenter}>
            <Typography variant='h3' noWrap component={Link} to='/'>
              <img src={sokalsm} alt='sokalogo' id='SokaLogo' />
            </Typography>
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
                <Button component={Link} to='/signup' className={classes.login}>
                  SignUp
                </Button>
              ) : null}
            </div>
          </div>
        </Toolbar>
      </AppBar>

      <Drawer
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
        <List>
          <ListItem component={Link} to='/matches'>
            <ListItemIcon>
              <EmojiEmotionsIcon
                style={{ color: 'purple', width: '36px', height: '36px' }}
              />
            </ListItemIcon>
            <ListItemText primary='Matches' />
          </ListItem>

          <ListItem component={Link} to='/messages'>
            <ListItemIcon>
              <ChatIcon
                style={{ color: 'purple', width: '36px', height: '36px' }}
              />
            </ListItemIcon>
            <ListItemText primary='Inbox' />
          </ListItem>

          <ListItem component={Link} to='/profile'>
            <ListItemIcon>
              <AccountBoxTwoToneIcon
                style={{ color: 'purple', width: '36px', height: '36px' }}
              />
            </ListItemIcon>
            <ListItemText primary='Profile' />
          </ListItem>
          <ListItem component={Link} to='/map'>
            <ListItemIcon>
              <img
                src='https://img.icons8.com/nolan/64/map-marker.png'
                alt='mapbox-current-location'
                style={{ width: '36px', height: '36px' }}
              />
            </ListItemIcon>
            <ListItemText primary='Map' />
          </ListItem>
        </List>
        <Divider />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.child}>{children}</div>
      </main>
    </div>
  )
}
