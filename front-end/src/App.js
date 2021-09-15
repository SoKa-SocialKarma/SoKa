import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import axios from "axios";
// import { useState, useEffect } from "react";
// import { useHistory } from "react-router-dom";
import { AuthProvider } from './Context/AuthContext';

import PublicLayout from './Layouts/PublicLayout'
import PrivateLayout from './Layouts/PrivateLayout'
import RouteWithLayout from './Components/RoutewithLayout'

import LoginDashboard from './Pages/LoginDashboard'
import Login from './Pages/Login'
// import SignUp from './Pages/SignUp'
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
import UserMatches from './Components/UserMatches'
// import { apiURL } from './Util/apiURL'

// const API = apiURL()
function App () {
//   let history =useHistory();
//   const [profile,setProfile] = UseState([]);

//   useEffect(() => {
//     try{
//       axios.get(`${API}/users`).then((response) => {
//         setProfile(response.data)
//       },
//       (error) => console.log("get", error)
//       );
//     }catch (error) {
//       console.warn("catch", error)
//     }
//   },[])

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

//   const updateProfile = (prof, id) => {
//     try {
//       axios.put(`${API}/users/${id}`, prof).then((response) => {
//         const neuVar = [...profile];
//         const index = neuVar.findIndex((prof) => prof.id === Number(id));
//         neuVar[index] = prof;
//         setProfile(neuVar);
//         history.push(`/profile/${id}`);
//       });
//     } catch (error) {
//       console.warn("catch", error);
//     }
//   };

  return (
    <>
      <Router>
        <AuthProvider>
          <Navbar>
            <Switch>
              <Route exact path='/' component={Demo} />
              <PrivateRoute path='/update-profile' component={UpdateProfile} />
              <Route path='/map' component={MapBox} />
              {/* <Route path='/signup' component={SignUp} /> */}
              <Route path='/login' component={Login} />
              <Route path='/forgot-password' component={ForgotPassword} />
              <Route path='/matches' component={UserMatches} />
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

