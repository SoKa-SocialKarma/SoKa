import { Route, Redirect } from 'react-router-dom'
import { useAPI } from '../Context/AuthContext'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const {
    currentUser,
    newUserBlocked,
    currentRevieweeData,
    currentUserData
  } = useAPI()

  function isEmpty (obj) {
    return Object.keys(obj).length === 0
  }

  const goToNewUser = Boolean(currentUser) && newUserBlocked
  const goToLogin = Boolean(Boolean(currentUser) === false)

  let pendingReview = false

  if (isEmpty(currentUserData) && isEmpty(currentRevieweeData)) {
    pendingReview = false
  } else if (isEmpty(currentUser) && isEmpty(currentRevieweeData)) {
    pendingReview = false
  } else if (currentUserData && !isEmpty(currentRevieweeData)) {
    pendingReview = currentRevieweeData.todoreview.pendingReview
  } else {
    pendingReview = currentUserData.todoreview.pendingReview
  }

  return (
    <Route
      {...rest}
      render={props => {
        if (goToLogin) {
          return <Redirect to='/login' />
        } else if (
          (pendingReview || goToNewUser) &&
          Component.componentName === 'LoginDashBoard'
        ) {
          return <Component {...props} />
        } else if (goToNewUser && Component.componentName === 'LoginQs') {
          return <Component {...props} />
        } else if (goToNewUser && Component.componentName !== 'LoginQs') {
          return <Redirect to='/users/newUser' />
        } else if (
          pendingReview &&
          Component.componentName !== 'ReviewPairUp'
        ) {
          return (
            <Redirect to={`/users/${currentUserData.id}/reviewing-session`} />
          )
        } else if (
          pendingReview &&
          Component.componentName === 'ReviewPairUp'
        ) {
          return <Component {...props} />
        } else {
          return <Component {...props} />
        }
      }}
    ></Route>
  )
}

export default PrivateRoute
