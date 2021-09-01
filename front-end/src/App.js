import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React from "react";
// import Login from "./Pages/Login";
// import FourOFour from "./Pages/FourOFour";
import Home from "./Pages/Home";
// import Index from "./Pages/Index";
// import Questionaire from "./Pages/Questionare";
// import Show from "./Pages/Show";
//import Navbar from "./Components/Navbar"

function App(){
  return (
    <div>
      <Router>
        {/* <Navbar /> */}
        <main>
          <Switch>
            <Route exact path="/" >
              <Home />
            </Route>
            
          </Switch>
        </main>
      </Router>
    </div>
  );
};

export default App;
//routes
// INDEX/login
// INDEX/signup
// SHOW /users/:id
// UPDATE /users/:id/edit
// CREATE /users/new
// SHOW/relevant
// SHOW/users/:id/matches/


// <Route exact path="/demo">
// <Index/>
// </Route>
// <Route>
// <Login/>
// </Route>
// <Route>
// <FourOFour/>
// </Route>
// <Route>
// <Questionaire/>
// </Route>
// <Route>
// <Show/>
// </Route>