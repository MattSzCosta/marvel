import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Route, withRouter } from 'react-router-dom'
import authAction from '~/actions/authAction'

const PrivateRoute = ({ component: Component, ...props }) => {
  const { isAuthenticated } = useSelector((state) => state.auth)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(authAction.verifyCredentialsAuthentication(isAuthenticated))
  }, [dispatch, isAuthenticated])

  return (
    <Route
      {...props}
      render={(propsRender) => <Component {...propsRender} />}
    />
  )
}

export default withRouter(PrivateRoute)
