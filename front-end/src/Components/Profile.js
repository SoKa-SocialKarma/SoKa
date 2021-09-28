import { Paper } from '@material-ui/core'
import { useAPI } from '../Context/AuthContext'

import MapBox from './MapBox'

import { makeStyles } from '@material-ui/core/styles'
import linkedin from '../Assets/linkedin.png'

import purpBackground from '../Assets/purpBackground.jpg'
import facebook from '../Assets/facebook.png'
import instagram from '../Assets/instagram.png'
import twitter from '../Assets/twitter.png'
import pencil from "../Assets/pencil.png"


const useStyles = makeStyles({
  root: {
    height: 'auto',
    width: 'auto',
    marginTop: '-4%',
    padding: 0,
    display: 'grid',
    gridTemplateRows: 'auto minmax(auto,10%) auto 1fr'
  },
  flexCenter: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  }
})

function Profile () {
  const { currentUserData } = useAPI()
  const classes = useStyles()

  const {
    name,
    lastname,
    username,
    gender,
    location,
    availabledays,
    experience,
    goals,
    radius
  } = currentUserData


  return (
    <Paper className={classes.root}>
      <div id='profHeader'>
        <img
          className='profBackground'
          src={purpBackground}
          alt='Purple radiant background'
        />
        <img
          className='profPic'
          src='https://images.pexels.com/photos/2078265/pexels-photo-2078265.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
          alt=''
          style={{ width: '200px', height: '180px' }}
        />
      </div>
      <h2 id='card'>
        {name} {lastname}
      </h2>

      <div className='containerGrid'>
        <div className='item1'>
          <div className={classes.flexCenter}>
            <h2>About</h2>
            <h6>
              {' '}
              Name: {name} {lastname}
            </h6>
            <h6>Gender: {gender}</h6>
            <h6>Location:{location}</h6>
            <h6>
              Availablility:
              {availabledays
                ? ` ${availabledays[0]}, ${availabledays[1]} `
                : ''}
            </h6>
            <h6>Experience : {experience}</h6>
            <h6>
              Goals:{' '}
              {goals
                ? `${goals[0]}, ${goals[1]}, ${goals[2]}, ${goals[3]} `
                : ''}
            </h6>
            <h6>Radius:{radius} miles</h6>
          </div>
        </div>
        <div id='badges' className='item2'>
          <div className={classes.flexCenter}>
            <h2>Badges</h2>

            <img
              src='https://cdn-icons-png.flaticon.com/512/2928/2928144.png'
              alt=''
              style={{ width: '40px' }}
            />

            <h4>Great Motivator</h4>

            <img
              src='https://cdn-icons-png.flaticon.com/512/4053/4053735.png'
              alt=''
              style={{ width: '40px' }}
            />
            <h4>Spot On</h4>

            <img
              src='https://cdn-icons-png.flaticon.com/512/2843/2843974.png'
              alt=''
              style={{ width: '40px' }}
            />
            <h4>Mobility Master</h4>

            <img
              src='https://cdn-icons-png.flaticon.com/512/2090/2090622.png'
              alt=''
              style={{ width: '40px' }}
            />
            <h4>Punctuality</h4>

            <img
              src='https://cdn-icons-png.flaticon.com/512/2237/2237680.png'
              alt=''
              style={{ width: '40px' }}
            />
            <h4>Cardiologist</h4>
          </div>
        </div>

        <div id='socials' class='item3'>
          {/* <Link to={`/users/${index}/edit`}>
          <button type="button"  >
          EDIT
          
          </button>
          </Link>
          <button>
          NOTIFICATIONS
        </button> */}

          <a href='https://www.instagram.com/' target='_blank' rel='noreferrer'>
            <img
              src={instagram}
              alt='instagram login'
              style={{ width: '40px' }}
            />
          </a>
          <a href='https://www.facebook.com/' target='_blank' rel='noreferrer'>
            <img
              src={facebook}
              alt='facebook login'
              style={{ width: '40px' }}
            />
          </a>
          <a href='https://www.linkedin.com/'>
            <img
              src={linkedin}
              alt='Linkedin login'
              style={{ width: '40px' }}
            />
          </a>
          <a
            href='https://twitter.com/?lang=en'
            target='_blank'
            rel='noreferrer'
          >
            <img src={twitter} alt='Twitter login' style={{ width: '40px' }} />
          </a>
        </div>

        <div className='item4'>
          <MapBox adjustmentWidth={480} adjustmentHeight={300} />
        </div>
      </div>
    </Paper>
  )
}
export default Profile

// (1,'Great Motivator','{"name":"","url":"https://cdn-icons-png.flaticon.com/512/2928/2928144.png","album":""}',
// '{"info":"Enthusiastic"}'),
// (2,'Spot On','{"name":"","url":"https://cdn-icons-png.flaticon.com/512/4053/4053735.png","album":""}',
// '{"info":"Assisted in lifting heavy weights safely"}'),
// (3,'Mobility Master','{"name":"","url":"https://cdn-icons-png.flaticon.com/512/2843/2843974.png","album":""}',
// '{"info":"Helped stretch tightented muscles before workout"}'),
// (4,'Punctual','{"name":"","url":"https://cdn-icons-png.flaticon.com/512/2090/2090622.png","album":""}',
// '{"info":"Responds to all messages and shows up on time"}'),
// (5,'Cardiologist','{"name":"","url":"https://cdn-icons-png.flaticon.com/512/2237/2237680.png","album":""}',
// '{"info":"Helped increase BPM"}');
