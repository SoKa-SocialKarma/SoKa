import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { AuthProvider } from './Context/AuthContext'
import { apiURL } from './Util/apiURL.js'

import LoginDashboard from './Pages/LoginDashboard'
import Login from './Pages/Login'
import SignUp from './Pages/SignUp'
import UpdateProfile from './Pages/UpdateProfile'
import ForgotPassword from './Pages/ForgotPassword'

import Profile from './Pages/Profile'

import Index from './Pages/Index'
import Navbar from './Components/Navbar'
import FourOFour from './Pages/FourOFour'

import Show from './Pages/Show'
import EditProfile from './Components/EditProfile'

import './App.css'
import PrivateRoute from './Components/PrivateRoute'
import axios from 'axios'


const API = apiURL();

function App () {


  // const [matches, setMatch] = useState([]);
  const [demoProfiles, setDemoProfiles ] = useState([]);

  const getDemoUsers = async () =>{
    try{
      const {data} = await axios.get(`${API}/users?limit=6`)
      setDemoProfiles(data)
    }catch(err){
      console.log(err)
    }
  }

  useEffect(() => {
    return getDemoUsers();
  },[])


  return (
    <div className='body'>
      <Router>
        <Navbar />
        <main>
          <AuthProvider>
            <Switch>
              <Route exact path='/'>
                <Index demoProfiles={demoProfiles}/>
              </Route>
              <PrivateRoute path='/update-profile' component={UpdateProfile} />
              <Route path='/signup' component={SignUp} />
              <Route path='/login' component={Login} />
              <Route path='/forgot-password' component={ForgotPassword} />
              <Route exact path='/matches' component={Index} />
              <Route path='/messages' component={Show} />
              <Route path='/profile' component={Profile} /> 
              <Route path='/edit'>
                <EditProfile />
              </Route>
              <Route path='*'>
                <FourOFour />
              </Route>
            </Switch>
          </AuthProvider>
        </main>
      </Router>
    </div>
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
