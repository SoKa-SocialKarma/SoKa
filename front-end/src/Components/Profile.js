import { Paper } from '@material-ui/core';
import { useAPI } from '../Context/AuthContext';
import { useRouteMatch } from 'react-router-dom';
import MapBox from './MapBox';

import IconButton from '@mui/material/IconButton';
import { makeStyles } from '@material-ui/core/styles';

import defaulProfile from '../Assets/defaultProfile.png';
import facebook from '../Assets/facebook.png';
import instagram from '../Assets/instagram.png';
import twitter from '../Assets/twitter.png';
import pencil from '../Assets/pencil.png';
import userPin from '../Assets/user.png';
import pin from '../Assets/pin.png';
import calendar from '../Assets/calendar.png';
import certification from '../Assets/certification.png';
import target from '../Assets/target.png';
import distance from '../Assets/distance.png';
import linkedin from '../Assets/linkedin.png';

const useStyles = makeStyles({
	root: {
		height: 'auto',
		width: 'auto',
		marginTop: '-5%',
		padding: 0,
		display: 'grid',
		gridTemplateRows: 'auto minmax(auto,10%) 1fr 1fr',
	},
	flexCenter: {
		display: 'flex',
		flexDirection: 'column',
		fontSize: '1rem',
	},
});

function Profile(profile) {
	const { currentUserData } = useAPI();
	const { url } = useRouteMatch();
	const edit = url
		.split('/')
		.filter((page) => page !== 'profile')
		.concat('edit')
		.join('/');
	const classes = useStyles();

	const {
		name,
		lastname,
		gender,
		location,
		availabledays,
		experience,
		goals,
		radius,
		image,
		id
	} = currentUserData;

	return (
		<Paper className={classes.root}>
			<div id='profHeader' className='profBackground'>
				{window.location.pathname === `/users/${id}/profile` && (
					<img
						className='profPic'
						// src={image.url}
						src={image?.url ? image.url : defaulProfile}
						alt='profile-foto'
						style={{ width: '200px', height: '180px' }}
					/>
				)}
				{(window.location.pathname === `/users/${id}/feed/matches` ||
					window.location.pathname === `/search-results` || window.location.pathname === `/users/14/feed`) && (
						<img
							className='profPic'
							src={profile.profile.image.url ? profile.profile.image.url : defaulProfile}
							alt='profile-foto'
							style={{ width: '200px', height: '180px' }}
						/>
					)}

			</div>

			<div id='cardContainer'>
				{window.location.pathname === `/users/${id}/profile` && (
					<h1 id='card merri-font'>
						{name} {lastname}
					</h1>
				)}
				{(window.location.pathname === `/users/${id}/feed/matches` ||
					window.location.pathname === `/search-results` || window.location.pathname === `/users/${id}/feed`) && (
						<h1 id='card'>
							{profile.profile.name} {profile.profile.lastname}
						</h1>
					)}
				<div id='socials'>
					<a href='https://www.instagram.com/' target='_blank' rel='noreferrer'>
						<img src={instagram} alt='instagram login' className='socialImage' />
					</a>
					<a href='https://www.facebook.com/' target='_blank' rel='noreferrer'>
						<img src={facebook} alt='facebook login' className='socialImage' />
					</a>
					<a href='https://www.linkedin.com/'>
						<img src={linkedin} alt='Linkedin login' className='socialImage' />
					</a>
					<a href='https://twitter.com/?lang=en' target='_blank' rel='noreferrer'>
						<img src={twitter} alt='Twitter login' className='socialImage' />
					</a>
				</div>
			</div>

			<div>
				<div className='containerGrid'>
					<div className='item1'>
						<div className={classes.flexCenter}>
							<div id='editiconContainer'>
								<h3>About</h3>
								{window.location.pathname === `/users/${id}/profile` && (
									<div id='editicon'>
										<IconButton href={edit}>
											<img src={pencil} alt='editicon' style={{ width: '20px' }} />
										</IconButton>
									</div>
								)}
							</div>

							<h5>Gender:</h5>
							{window.location.pathname === `/users/${id}/profile` && (
								<ul>
									<li>
										<img src={userPin} alt='userPin icon' />
										{gender}
									</li>
								</ul>
							)}

							{(window.location.pathname === `/users/${id}/feed/matches` ||
								window.location.pathname === `/search-results` || window.location.pathname === `/users/${id}/feed`) && (
									<ul>
										<li>
											<img src={userPin} alt='userPin icon' />
											{profile.profile.gender}
										</li>
									</ul>
								)}
							<h5>Location:</h5>
							{window.location.pathname === `/users/${id}/profile` && (
								<ul>
									<li>
										<img src={pin} alt='location pin' />
										{location}
									</li>
								</ul>
							)}

							{(window.location.pathname === `/users/${id}/feed/matches` ||
								window.location.pathname === `/search-results` || window.location.pathname === `/users/${id}/feed`) && (
									<ul>
										<li>
											<img src={pin} alt='location pin' />
											{profile.profile.location}
										</li>
									</ul>
								)}

							<h5>Availablility:</h5>
							{window.location.pathname === `/users/${id}/profile` && (
								<ul>
									<li>
										<img src={calendar} alt='calendar' />
										{availabledays ? `${availabledays[0]}, ${availabledays[1]}` : ''}
									</li>
								</ul>
							)}

							{(window.location.pathname === `/users/${id}/feed/matches` ||
								window.location.pathname === `/search-results` || window.location.pathname === `/users/${id}/feed`) && (
									<ul>
										<li>
											<img src={calendar} alt='calendar' />
											{profile.profile.availabledays
												? `${profile.profile.availabledays[0]}, ${profile.profile.availabledays[1]}`
												: ''}
										</li>
									</ul>
								)}

							<h5>Experience :</h5>
							{window.location.pathname === `/users/${id}/profile` && (
								<ul>
									<li>
										<img src={certification} alt='medal' />
										{experience}
									</li>
								</ul>
							)}

							{(window.location.pathname === `/users/${id}/feed/matches` ||
								window.location.pathname === `/search-results` || window.location.pathname === `/users/${id}/feed`) && (
									<ul>
										<li>
											<img src={certification} alt='medal' />
											{profile.profile.experience}
										</li>
									</ul>
								)}

							<h5>Goals:</h5>
							{window.location.pathname === `/users/${id}/profile` && (
								<ul>
									<li>
										<img src={target} alt='target' />

										{goals ? `${goals[0]}, ${goals[1]}, ${goals[2]}, ${goals[3]} ` : ''}
									</li>
								</ul>
							)}

							{(window.location.pathname === `/users/${id}/feed/matches` ||
								window.location.pathname === `/search-results` || window.location.pathname === `/users/${id}/feed`) && (
									<ul>
										<li>
											<img src={target} alt='target' />

											{profile.profile.goals
												? `${profile.profile.goals[0]}, ${profile.profile.goals[1]}, ${profile.profile.goals[2]}, ${profile.profile.goals[3]} `
												: ''}
										</li>
									</ul>
								)}

							<h5>Radius:</h5>
							{window.location.pathname === `/users/${id}/profile` && (
								<ul>
									<li>
										<img src={distance} alt='two location tags' />
										{radius} miles
									</li>
								</ul>
							)}

							{(window.location.pathname === `/users/${id}/feed/matches` ||
								window.location.pathname === `/search-results` || window.location.pathname === `/users/${id}/feed`) && (
									<ul>
										<li>
											<img src={distance} alt='two location tags' />
											{profile.profile.radius} miles
										</li>
									</ul>
								)}
						</div>
					</div>

					<div id='badges' className='item2'>
						<div className={classes.flexCenter}>
							<h3>Badges</h3>
							<div>
								<h5>Great Motivator</h5>
								<ul>
									<li>
										<img
											src='https://cdn-icons-png.flaticon.com/512/2928/2928144.png'
											alt=''
											style={{ width: '45px' }}
										/>
										Enthusiastic
									</li>
								</ul>
							</div>

							<div>
								<h5>Spot On</h5>
								<ul>
									<li>
										<img
											src='https://cdn-icons-png.flaticon.com/512/4053/4053735.png'
											alt=''
											style={{ width: '45px' }}
										/>
										Assisted in lifting heavy weights safely
									</li>
								</ul>
							</div>

							<div>
								<h5>Mobility Master</h5>
								<ul>
									<li>
										<img
											src='https://cdn-icons-png.flaticon.com/512/2843/2843974.png'
											alt=''
											style={{ width: '45px' }}
										/>
										Stretch tightented muscles before workout
									</li>
								</ul>
							</div>

							<div>
								<h5>Punctuality</h5>
								<ul>
									<li>
										<img
											src='https://cdn-icons-png.flaticon.com/512/2090/2090622.png'
											alt=''
											style={{ width: '45px' }}
										/>
										Responds on time
									</li>
								</ul>
							</div>

							<div>
								<h5>Cardiologist</h5>
								<ul>
									<li>
										<img
											src='https://cdn-icons-png.flaticon.com/512/2237/2237680.png'
											alt=''
											style={{ width: '45px' }}
										/>
										Increase BPM
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='item4'>
				<MapBox adjustmentWidth={0.2} adjustmentHeight={0.3} />
			</div>
		</Paper>
	);
}
export default Profile;



















