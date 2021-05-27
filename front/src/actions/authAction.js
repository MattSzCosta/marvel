import authService from '~/services/authService'
import Constants from '~/helpers/enums/Constants'
import Utils from '~/helpers/Utils'
import jwtDecode from 'jwt-decode'
import userAction from './userAction'

const sendCredentials =
  (values, callback = () => {}, LOADING_IDENTIFICATOR = 'header') =>
  (dispatch) => {
    dispatch(Utils.startLoading(LOADING_IDENTIFICATOR))

    return authService
      .login(values)
      .then((response) => {
        if (response) {
          Utils.setToken(response.data.access_token)
          const token = jwtDecode(response.data.access_token)
          dispatch({
            type: Constants.LOGIN,
            payload: {
              user: {
                firstName: token.firstName
              }
            }
          })
          callback()
        }
      })
      .catch((error) => {
        callback(error)
      })
      .finally(() => {
        dispatch(Utils.endLoading(LOADING_IDENTIFICATOR))
      })
  }

const verifyCredentialsAuthentication = (isAuthenticated) => (dispatch) => {
  if (Utils.not(isAuthenticated) && Utils.hasTokenValid()) {
    dispatch({ type: Constants.LOGIN, payload: {} })
  } else if (Utils.not(Utils.hasTokenValid())) {
    dispatch({ type: Constants.LOGOUT })
  }
}

const logout = () => (dispatch) => {
  dispatch({ type: Constants.LOGOUT })
  Utils.removeToken()
}

const getProfile = () => (dispatch) => {
  const token = Utils.getToken()
  if (token) {
    const tokenDecode = jwtDecode(token)
    dispatch({
      type: Constants.LOGIN,
      payload: {
        user: {
          firstName: tokenDecode.firstName
        }
      }
    })
    dispatch(userAction.getUser())
  }
}

const register =
  (values, callback = () => {}, LOADING_IDENTIFICATOR = 'header') =>
  (dispatch) => {
    dispatch(Utils.startLoading(LOADING_IDENTIFICATOR))

    return authService
      .register(values)
      .then(() => {
        callback()
      })
      .catch((error) => {
        callback(error)
      })
      .finally(() => {
        dispatch(Utils.endLoading(LOADING_IDENTIFICATOR))
      })
  }

export default {
  sendCredentials,
  verifyCredentialsAuthentication,
  logout,
  getProfile,
  register
}
