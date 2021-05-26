import {
  Box,
  Container,
  Grid,
  CircularProgress,
  Toolbar,
  Typography
} from '@material-ui/core'
import { ThemeProvider } from '@material-ui/core/styles'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
// import { Link } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import authAction from '~/actions/authAction'
import marvelAction from '~/actions/marvelAction'
import Labels from '~/helpers/enums/Labels'
import DropdownProfile from './DropdownProfile'
import './Layout.scss'
import { anonymousTheme, authenticatedTheme } from './MuiThemeBaseLayout'

const AuthenticatedLayout = (props) => {
  const dispatch = useDispatch()
  const { loading } = useSelector((state) => state.app)
  const { user } = useSelector((state) => state.auth)

  const { t } = useTranslation()

  useEffect(() => {
    if (!user) dispatch(authAction.getProfile())
  }, [dispatch, user])

  useEffect(() => {
    dispatch(marvelAction.getAllLikedContent())
  }, [dispatch, marvelAction])

  return (
    <ThemeProvider theme={authenticatedTheme}>
      <Box className="app-layout">
        <Grid>
          <Grid></Grid>
        </Grid>
        <Box className="app-header">
          <Toolbar>
            <div className="logo-container"></div>
            <Typography className="header-title" variant="h5" noWrap>
              {t(Labels.LOGIN_TITLE)}
            </Typography>

            <Grid className="profile">
              <Grid item xs={12} md={12} className="username-container">
                <Typography variant="body2" className="username">
                  olá, {user && user.name}
                  <DropdownProfile />
                </Typography>
              </Grid>
            </Grid>
          </Toolbar>
          <Grid>
            {Object.values(loading).some((x) => x) && <CircularProgress />}
          </Grid>
        </Box>
        <Box className="app-main">
          <Box className={`app-content`}>
            <Container maxWidth={false}>{props?.children} </Container>
          </Box>
        </Box>
      </Box>

      <ToastContainer style={{ zIndex: 99999 }} />
    </ThemeProvider>
  )
}

const AnonymousLayout = (props) => {
  const { loading } = useSelector((state) => state.app)

  return (
    <ThemeProvider theme={anonymousTheme}>
      {loading.header && <CircularProgress />}
      <Box className="marvel-background">{props.children}</Box>
      <ToastContainer style={{ zIndex: 99999 }} />
    </ThemeProvider>
  )
}

export default { AuthenticatedLayout, AnonymousLayout }
