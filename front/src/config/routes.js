/* eslint-disable react/display-name */
import React from 'react'
import ContentDetail from '~/views/contentDetail/ContentDetail'
// Views
import Login from '~/views/login/Login'
import Profile from '~/views/profile/Profile'
import Search from '~/views/search/Search'
export const routes = [
  {
    path: '/',
    exact: true,
    view: () => <Login />,
    onlyAuthorized: false
  },
  {
    path: '/',
    exact: true,
    view: () => <Search />,
    onlyAuthorized: true,
    mainPage: true
  },
  {
    path: '/detail/',
    exact: true,
    view: () => <ContentDetail />,
    onlyAuthorized: true
  },
  {
    path: '/profile',
    exact: true,
    view: () => <Profile />,
    onlyAuthorized: true
  }
]

export default routes
