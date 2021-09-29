import { Route, Redirect } from 'react-router-dom';
import { useAPI } from '../Context/AuthContext';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const {currentUser} = useAPI();

  return (
    <Route
      {...rest}
      render={props => {
        return currentUser ? <Component {...props} /> : <Redirect to='/login' />
      }}
    ></Route>
  )
}

export default PrivateRoute