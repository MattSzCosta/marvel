import React, { useEffect } from 'react'
import { MuiThemeProvider } from 'material-ui/styles'
import { Container } from '@material-ui/core'
import FormProfile from '~/components/profile/FormProfile'
import { useSelector } from 'react-redux'
import { Skeleton } from '@material-ui/lab'
import userAction from '~/actions/userAction'

const Profile = () => {
  const { user } = useSelector((state) => state.auth)
  useEffect(() => {
    userAction.getUser()
  }, [])
  return (
    <MuiThemeProvider>
      <Container style={{ backgroundColor: '#333' }}>
        {user && Object.entries(user).length > 1 ? (
          <FormProfile user={user} />
        ) : (
          <Skeleton variant="rect" width="100%" height={50} />
        )}
      </Container>
    </MuiThemeProvider>
  )
}

export default Profile
