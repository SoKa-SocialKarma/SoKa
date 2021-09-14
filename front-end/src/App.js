import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { AuthProvider } from './Context/AuthContext'

import PublicLayout from './Layouts/PublicLayout'
import PrivateLayout from './Layouts/PrivateLayout'
import RouteWithLayout from './Components/RoutewithLayout'

import LoginDashboard from './Pages/LoginDashboard'
import Login from './Pages/Login'
import SignUp from './Pages/SignUp'
import UpdateProfile from './Pages/UpdateProfile'
import ForgotPassword from './Pages/ForgotPassword'

import Profile from './Pages/Profile'

import Demo from './Pages/Demo'
import Navbar from './Components/Navbar'
import FourOFour from './Pages/FourOFour'

import Show from './Pages/Show'
import EditProfile from './Components/EditProfile'

import PrivateRoute from './Components/PrivateRoute'

function App () {
  return (
    <>
      <Router>
        <AuthProvider>
          <Navbar>
            <Switch>
              <Route exact path='/' component={Demo} />
              <PrivateRoute path='/update-profile' component={UpdateProfile} />
              <Route path='/signup' component={SignUp} />
              <Route path='/login' component={Login} />
              <Route path='/forgot-password' component={ForgotPassword} />
              {/* <Route exact path='/matches' component={Index} /> */}
              <Route path='/messages' component={Show} />
              <Route path='/profile' component={Profile} />
              <Route path='/edit' component={EditProfile} />
              <Route path='*' component={FourOFour} />
            </Switch>
          </Navbar>
        </AuthProvider>
      </Router>
    </>
  )
}

export default App
//routes
// INDEX/login
// INDEX/signup
// SHOW /users/:id
// UPDATE /users/:id/edit
// CREATE /users/new
// SHOW/relevant
// SHOW/users/:id/matches/
