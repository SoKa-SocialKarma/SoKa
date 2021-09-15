import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { AuthProvider } from './Context/AuthContext'

// import PublicLayout from './Layouts/PublicLayout'
// import PrivateLayout from './Layouts/PrivateLayout'
// import RouteWithLayout from './Components/RoutewithLayout'

import Home from './Pages/Home'
import LoginDashboard from './Pages/LoginDashboard'
import Login from './Pages/Login'
import Signp from './Pages/Signp'
import UpdateProfile from './Pages/UpdateProfile'
import ForgotPassword from './Pages/ForgotPassword'
import MapBox from './Components/MapBox'

import Profile from './Pages/Profile'

import Demo from './Pages/Demo'
import Navbar from './Components/Navbar'
import FourOFour from './Pages/FourOFour'

import Show from './Pages/Show'
import EditProfile from './Components/EditProfile'

import PrivateRoute from './Components/PrivateRoute'
// import UserMatches from './Components/UserMatches'

function App () {
  return (
    <>
      <Router>
        <AuthProvider>
          <Navbar>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/map' component={MapBox} />
              <Route path='/login' component={Login} />
              <Route path='/signup' component={Signp} />
              <PrivateRoute
                path='/login-dashboard'
                component={LoginDashboard}
              />
              <Route
                path='/forgot-password'
                component={ForgotPassword}
              />
              <PrivateRoute path='/matches' component={Demo} />
              {/* <PrivateRoute path='/matches' component={UserMatches} /> */}
              <PrivateRoute path='/messages' component={Show} />
              <PrivateRoute path='/profile' component={Profile} />
              <PrivateRoute path='/edit' component={EditProfile} />
              <PrivateRoute path='/update-profile' component={UpdateProfile} />
              <Route path='*' component={FourOFour} />
            </Switch>
          </Navbar>
        </AuthProvider>
      </Router>
    </>
  )
}

export default App
