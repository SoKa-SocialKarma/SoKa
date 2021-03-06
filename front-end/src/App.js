import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { AuthProvider } from './Context/AuthContext'
import { createTheme, ThemeProvider } from '@material-ui/core/styles'
import sokaTheme from './Assets/theme.json'

import Home from './Pages/Home'
import LoginDashboard from './Pages/LoginDashboard'
import Login from './Pages/Login'
import Signp from './Pages/Signp'
import UpdateProfile from './Pages/UpdateProfile'
import Show from './Pages/Show'
import ForgotPassword from './Pages/ForgotPassword'
import UserMatches from './Pages/UserMatches'
import UserFeed from './Pages/UserFeed'
import Profile from './Components/Profile'
import SearchResults from './Pages/SearchResults'
import FourOFour from './Pages/FourOFour'
import LoginQs from './Pages/LoginQs'
import ReviewPairUp from './Pages/ReviewPairUp'

import MapBox from './Components/MapBox'
import Navbar from './Components/Navbar'
import EditProfile from './Components/EditProfile'
import PrivateRoute from './Components/PrivateRoute'


function App () {
  const theme = createTheme(sokaTheme)

  return (
    <>
      <Router>
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <Navbar>
              <Switch>
                <Route exact path='/' component={Home} />
                <Route path='/map' component={MapBox} />
                <Route path='/login' component={Login} />
                <Route path='/signup' component={Signp} />
                <Route path='/search-results' component={SearchResults} />
                <Route path='/forgot-password' component={ForgotPassword} />
                <PrivateRoute
                  path='/login-dashboard'
                  component={LoginDashboard}
                />
                <PrivateRoute path='/users/:id/messages' component={Show} />
                <PrivateRoute path='/users/:id/profile' component={Profile} />
                <PrivateRoute path='/users/:id/edit' component={EditProfile} />
                <PrivateRoute path='/users/:id/reviewing-session' component={ReviewPairUp} />
                <PrivateRoute
                  path='/users/:id/update-login-profile'
                  component={UpdateProfile}
                />
                <PrivateRoute
                  path='/users/:id/feed/matches'
                  component={UserMatches}
                />
                <PrivateRoute path='/users/:id/feed' component={UserFeed} />
                <PrivateRoute path='/users/newUser' component={LoginQs} />
                <Route path='*' component={FourOFour} />
              </Switch>
            </Navbar>
          </ThemeProvider>
        </AuthProvider>
      </Router>
    </>
  )
}

export default App
