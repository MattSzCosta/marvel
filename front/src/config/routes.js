/* eslint-disable react/display-name */
import React from 'react'
import Labels from '~/helpers/enums/Labels'
// Views
import Login from '~/views/login/Login'
import Search from '~/views/search/Search'
export const routes = [
  {
    path: '/',
    exact: true,
    title: () => Labels.LOGIN_TITLE,
    view: () => <Login />,
    onlyAuthorized: false
  },
  {
    path: '/',
    exact: true,
    title: () => Labels.LOGIN_TITLE,
    view: () => <Search />,
    onlyAuthorized: true,
    mainPage: true
  }
]

export default routes
