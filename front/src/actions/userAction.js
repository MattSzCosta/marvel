import userService from '~/services/userService'
import Constants from '~/helpers/enums/Constants'
import Utils from '~/helpers/Utils'

const updateUser =
  (values, callback = () => {}, LOADING_IDENTIFICATOR = 'all') =>
  (dispatch) => {
    dispatch(Utils.startLoading(LOADING_IDENTIFICATOR))

    return userService
      .updateMe(values)
      .then(() => {
        dispatch(getUser())
        callback()
      })
      .catch((error) => {
        callback(error)
      })
      .finally(() => {
        dispatch(Utils.endLoading(LOADING_IDENTIFICATOR))
      })
  }

const getUser =
  (LOADING_IDENTIFICATOR = 'all') =>
  (dispatch) => {
    dispatch(Utils.startLoading(LOADING_IDENTIFICATOR))

    return userService
      .me()
      .then((response) => {
        dispatch({
          type: Constants.GET_USER,
          payload: response.data.user
        })
      })
      .catch((error) => {
        Utils.showError(error.response?.error)
      })
      .finally(() => {
        dispatch(Utils.endLoading(LOADING_IDENTIFICATOR))
      })
  }

export default { updateUser, getUser }
