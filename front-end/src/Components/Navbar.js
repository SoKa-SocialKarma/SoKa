import React from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Index from '../Pages/Index';
import Show from '../Pages/Show';
import Profile from '../Pages/Profile';
import Home from '../Pages/Home';
import Search from '../Pages/Questionnaire';
import Icon from '@material-ui/core/Icon';
import HomeTwoToneIcon from '@material-ui/icons/HomeTwoTone';
import ChatIcon from '@material-ui/icons/Chat';
import AccountBoxTwoToneIcon from '@material-ui/icons/AccountBoxTwoTone';
import SearchTwoToneIcon from '@material-ui/icons/SearchTwoTone';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import { EmojiFlagsOutlined } from '@material-ui/icons';
import SearchForm from './SearchForm';
import Button from '@material-ui/core/Button';
// import Button from '@material-ui/icons/Button'
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	appBarShift: {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	menuButton: {
		marginRight: 36,
	},
	hide: {
		display: 'none',
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
		whiteSpace: 'nowrap',
	},
	drawerOpen: {
		width: drawerWidth,
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	drawerClose: {
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		overflowX: 'hidden',
		width: theme.spacing(7) + 1,
		[theme.breakpoints.up('sm')]: {
			width: theme.spacing(9) + 1,
		},
	},
	toolbar: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		padding: theme.spacing(0, 1),
		// necessary for content to be below app bar
		...theme.mixins.toolbar,
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
	},
}));

export default function Navbar() {
	const classes = useStyles();
	const theme = useTheme();
	const [open, setOpen] = React.useState(false);

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	return (
		<div className={classes.root}>
			<CssBaseline />
			<AppBar
				position="fixed"
				className={clsx(classes.appBar, {
					[classes.appBarShift]: open,
				})}
			>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={handleDrawerOpen}
						edge="start"
						className={clsx(classes.menuButton, {
							[classes.hide]: open,
						})}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" noWrap component={Link} to="/" onClick={Home}>
						Soka
					</Typography>

					<span>
						<SearchForm />
					</span>
					<Button variant="contained" color="primary">
						Login
					</Button>
					{/* <span>
    <SearchForm/>
</span> */}
				</Toolbar>
			</AppBar>
			<Drawer
				variant="permanent"
				className={clsx(classes.drawer, {
					[classes.drawerOpen]: open,
					[classes.drawerClose]: !open,
				})}
				classes={{
					paper: clsx({
						[classes.drawerOpen]: open,
						[classes.drawerClose]: !open,
					}),
				}}
			>
				<div className={classes.toolbar}>
					<IconButton onClick={handleDrawerClose}>{theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}</IconButton>
				</div>
				<Divider />
				<List>
					<ListItem component={Link} to="/matches" onClick={Index}>
						<ListItemIcon>
							<EmojiEmotionsIcon style={{ color: 'purple' }} />
						</ListItemIcon>
						<ListItemText primary="Matches" />
					</ListItem>

					<ListItem component={Link} to="/messages" onClick={Show}>
						<ListItemIcon>
							<ChatIcon style={{ color: 'purple' }} />
						</ListItemIcon>
						<ListItemText primary="Inbox" />
					</ListItem>

					<ListItem component={Link} to="/profile" onClick={Profile}>
						<ListItemIcon>
							<AccountBoxTwoToneIcon style={{ color: 'purple' }} />
						</ListItemIcon>
						<ListItemText primary="Profile" />
					</ListItem>

					{/* <ListItem component={Link} to="/search" onClick={Search}>
<ListItemIcon>
<SearchTwoToneIcon style={{ color: "purple"}}/>
</ListItemIcon>
<ListItemText primary="New Search"/>
</ListItem> */}
				</List>
				<Divider />
				{/* <List>
          {['Edit Profile', 'Settings', 'Log out'].map((text, index) => (
            <ListItem button key={text} >
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List> */}
			</Drawer>
			<main className={classes.content} style={{ color: 'purple' }}>
				<div className={classes.toolbar} />
			</main>
		</div>
	);
}
