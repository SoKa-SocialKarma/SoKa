import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import React from 'react';
// import Login from "./Pages/Login";
import FourOFour from './Pages/FourOFour';
import Home from './Pages/Home';
import Index from './Pages/Index';
import Show from './Pages/Show';
import Profile from './Pages/Profile';
import EditForm from './Components/EditForm';
import Navbar from './Components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// const API= apiURL();

function App() {
	// const [matches, setMatch] = useState([]);

	//useEffect(() => {
	//try{
	//axios.get(`${API}/matches`).then(
	//(response) => {
	//setMat
	//}
	//)
	// }
	//})
	return (
		<div className="body">
			<Router>
				<Navbar />
				<main>
					<Switch>
						<Route exact path="/">
							<Home />
						</Route>
						<Route exact path="/matches">
							<Index />
						</Route>
						<Route exact path="/users">
							<Index />
						</Route>
						<Route path="/messages">
							<Show />
						</Route>
						<Route path="/profile">
							<Profile />
						</Route>
						<Route path="/edit">
							<EditForm />
						</Route>
						<Route path="*">
							<FourOFour />
						</Route>
					</Switch>
				</main>
			</Router>
		</div>
	);
}

export default App;
//routes
// INDEX/login
// INDEX/signup
// SHOW /users/:id
// UPDATE /users/:id/edit
// CREATE /users/new
// SHOW/relevant
// SHOW/users/:id/matches/
