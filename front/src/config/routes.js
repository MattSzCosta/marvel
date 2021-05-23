/* eslint-disable react/display-name */
import React from 'react'
import Labels from '~/helpers/enums/Labels'
// Views
import Login from '~/views/login/login'
export const routes = [
  {
    path: '/login',
    exact: true,
    title: () => Labels.LOGIN_TITLE,
    view: () => <Login />,
    onlyAuthorized: false
  }
]

export default routes
