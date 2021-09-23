import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
// import axios from "axios";
// import { useState, useEffect } from "react";
// import { useHistory } from "react-router-dom";
import { AuthProvider } from './Context/AuthContext'
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import sokaTheme from './Assets/theme.json'

// import PublicLayout from './Layouts/PublicLayout'
// import PrivateLayout from './Layouts/PrivateLayout'
// import RouteWithLayout from './Components/RoutewithLayout'

import Home from './Pages/Home'
import LoginDashboard from './Pages/LoginDashboard'
import Login from './Pages/Login'
import Signp from './Pages/Signp'
import LoginInfo from './Pages/LoginInfo'
import UpdateProfile from './Pages/UpdateProfile'
import ForgotPassword from './Pages/ForgotPassword'
import MapBox from './Components/MapBox'

import UserMatches from './Pages/UserMatches'
import UserFeed from './Pages/UserFeed'
import UserProfile from './Pages/UserProfile'

import SearchResults from './Pages/SearchResults'
import Navbar from './Components/Navbar'
import FourOFour from './Pages/FourOFour'

import Show from './Pages/Show'
import EditProfile from './Components/EditProfile'

import PrivateRoute from './Components/PrivateRoute'

// import UserMatches from './Components/UserMatches'
// import { apiURL } from './Util/apiURL'

// const API = apiURL()
function App () {
    // let history =useHistory();

  //   const deleteProfile = (id) => {
  //     try {
  // axios.delete(`${API}/users${id}`).then((response) => {
  //   const details = [...profile];
  //   details.splice(
  //     profile.findIndex((prfile) => prfile.id === Number(id)), 1
  //   );
  //   setProfile(details);
  //   history.push("/profile")
  // })
  //     }catch (error) {
  //       console.warn("catch", error)
  //     }
  //   }

    // const updateProfile = (profile, id) => {
    //   try {
    //     axios.put(`${API}/users/${id}`, prof).then((response) => {
    //       const neuVar = [...profile];
    //       const index = neuVar.findIndex((prof) => prof.id === Number(id));
    //       neuVar[index] = prof;
    //       setProfile(neuVar);
    //       history.push(`/profile/${id}`);
    //     });
    //   } catch (error) {
    //     console.warn("catch", error);
    //   }
    // };
    const theme = createTheme(sokaTheme);
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
              <Route path='/login-info' component={LoginInfo} />
              <Route path='/search-results' component={SearchResults} />
              <Route path='/forgot-password' component={ForgotPassword}  />
              <PrivateRoute
                path='/login-dashboard'
                component={LoginDashboard}
              />
              <PrivateRoute path='/users/:id/messages' component={Show} />
              <PrivateRoute path='/users/:id/profile' component={UserProfile} />
              <PrivateRoute path='/users/:id/edit' component={EditProfile} />
              <PrivateRoute path='/users/:id/update-profile' component={UpdateProfile} />
              <PrivateRoute path='/users/:id/feed/matches' component={UserMatches} />
              <PrivateRoute path='/users/:id/feed' component={UserFeed} />
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
