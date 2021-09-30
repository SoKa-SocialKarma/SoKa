import { Paper } from '@material-ui/core'
import { useAPI } from '../Context/AuthContext'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router'
import MapBox from './MapBox'

import { makeStyles } from '@material-ui/core/styles'

import facebook from '../Assets/facebook.png'
import instagram from '../Assets/instagram.png'
import twitter from '../Assets/twitter.png'
import pencil from '../Assets/pencil.png'
import user from '../Assets/user.png'
import pin from '../Assets/pin.png'
import calendar from '../Assets/calendar.png'
import certification from '../Assets/certification.png'
import target from '../Assets/target.png'
import distance from '../Assets/distance.png'
import linkedin from '../Assets/linkedin.png'

const useStyles = makeStyles({
	root: {
		height: 'auto',
		width: 'auto',
		marginTop: '-5%',
		padding: 0,
		display: 'grid',
		gridTemplateRows: 'auto minmax(auto,10%) 1fr 1fr',
		fontFamily: 'Merriweather',
	},
	flexCenter: {
		display: 'flex',
		flexDirection: 'column',
		fontSize: '1rem',
		fontFamily: 'Merriweather',
	},
});

function Profile() {
  const { currentUserData } = useAPI()
  const { id } = useParams()
  const classes = useStyles()

  const {
    name,
    lastname,
    gender,
    location,
    availabledays,
    experience,
    goals,
    radius
  } = currentUserData

  return (
    <Paper>



      <div id='profHeader' className='profBackground'>
        <img
          className='profPic'
          src='https://images.pexels.com/photos/2078265/pexels-photo-2078265.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
          alt=''
          style={{ width: '200px', height: '180px' }}
        />
      </div>

      <div id='cardContainer'>
        <h1 id='card'>
          {name} {lastname}
        </h1>

        <div id='socials'>
          <a href='https://www.instagram.com/' target='_blank' rel='noreferrer'>
            <img
              src={instagram}
              alt='instagram login'
              className='socialImage'
            />
          </a>
          <a href='https://www.facebook.com/' target='_blank' rel='noreferrer'>
            <img src={facebook} alt='facebook login' className='socialImage' />
          </a>
          <a href='https://www.linkedin.com/'>
            <img src={linkedin} alt='Linkedin login' className='socialImage' />
          </a>
          <a
            href='https://twitter.com/?lang=en'
            target='_blank'
            rel='noreferrer'
          >
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
                <div id='editicon'>
                  <Link to={`users/${id}/edit`}>
                    <img
                      src={pencil}
                      alt='editicon'
                      style={{ width: '20px' }}
                    />
                  </Link>
                </div>
              </div>

              <h5>
                Gender:
              </h5>
              <ul>
                <li>
                  <img src={user} alt='user' />
                  {gender}
                </li>
              </ul>

              <h5>
                Location:
              </h5>
              <ul>
                <li>
                  <img src={pin} alt='location pin' />
                  {location}
                </li>
              </ul>
              <h5>
                Availablility:
              </h5>
              <ul>
                <li>
                  <img
                    src={calendar}
                    alt='calendar'
                  />
                  {availabledays
                    ? `${availabledays[0]}, ${availabledays[1]}`
                    : ''}
                </li>
              </ul>
              <h5>
                Experience :
              </h5>
              <ul>
                <li>
                  <img src={certification} alt='medal' />
                  {experience}
                </li>
              </ul>

              <h5>
                Goals:
              </h5>
              <ul>
                <li>
                  <img src={target} alt='target' />

                  {goals
                    ? `${goals[0]}, ${goals[1]}, ${goals[2]}, ${goals[3]} `
                    : ''}
                </li>
              </ul>

              <h5>
                Radius:
              </h5>
              <ul>
                <li>
                  <img src={distance} alt='two location tags' />
                  {radius} miles
                </li>
              </ul>
            </div>
          </div>

          <div id='badges' className='item2'>
            <div className={classes.flexCenter}>
              <h3>Badges</h3>
              <div>
                <h5>
                  Great Motivator:
                </h5>
                <ul>
                  <li>
                    <img
                      src='https://cdn-icons-png.flaticon.com/512/2928/2928144.png'
                      alt=''
                      style={{ width: '30px' }}
                    />
                    Enthusiastic
                  </li>
                </ul>
              </div>

              <div>
                <h5>
                  Spot On:
                </h5>
                <ul>
                  <li>
                    <img
                      src='https://cdn-icons-png.flaticon.com/512/4053/4053735.png'
                      alt=''
                      style={{ width: '30px' }}
                    />
                    Assisted in lifting heavy weights safely
                  </li>
                </ul>
              </div>

              <div>
                <h5>Mobility Master:</h5>
                <ul>
                  <li>
                    <img
                      src='https://cdn-icons-png.flaticon.com/512/2843/2843974.png'
                      alt=''
                      style={{ width: '30px' }}
                    />
                    Stretch tightented muscles before workout
                  </li>
                </ul>
              </div>

              <div>
                <h5>Punctuality:</h5>
                <ul>
                  <li>
                    <img
                      src='https://cdn-icons-png.flaticon.com/512/2090/2090622.png'
                      alt=''
                      style={{ width: '30px' }}
                    />
                    Responds on time
                  </li>
                </ul>
              </div>

              <div>
                <h5>Cardiologist:</h5>
                <ul>
                  <li>
                    <img
                      src='https://cdn-icons-png.flaticon.com/512/2237/2237680.png'
                      alt=''
                      style={{ width: '30px' }}
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
  )
}
export default Profile
