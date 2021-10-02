import { Route, Redirect } from 'react-router-dom'
import { useAPI } from '../Context/AuthContext'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { currentUser, newUserBlocked } = useAPI()

  const goToNewUser = Boolean(currentUser) && newUserBlocked
  const goToLogin = Boolean(Boolean(currentUser) === false)

  return (
    <Route
      {...rest}
      render={props => {
        if (goToLogin) {
          return <Redirect to='/login' />
        } else if (goToNewUser && Component.componentName === 'LoginQs') {
          return <Component {...props} />
        } else if (goToNewUser && Component.componentName !== 'LoginQs') {
          return <Redirect to='/users/newUser' />
        } else {
          return <Component {...props} />
        }
      }}
    ></Route>
  )
}

export default PrivateRoute
