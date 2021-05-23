import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Route, Redirect, withRouter } from 'react-router-dom'
import authAction from '~/actions/authAction'
import Utils from '~/helpers/Utils'

const PrivateRoute = ({ component: Component, ...props }) => {
  const { isAuthenticated } = useSelector((state) => state.auth)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(authAction.verifyCredentialsAuthentication(isAuthenticated))
  }, [dispatch, isAuthenticated])

  const requireProfile = (requestProfile) => {
    return Utils.checkUserProfile(requestProfile)
  }

  return (
    <Route
      {...props}
      render={(propsRender) =>
        requireProfile(props.profiles) ? (
          <Component {...propsRender} />
        ) : (
          <Redirect to={'/not-authorized'} />
        )
      }
    />
  )
}

export default withRouter(PrivateRoute)
