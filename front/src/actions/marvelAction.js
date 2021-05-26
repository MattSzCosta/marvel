import Constants from '~/helpers/enums/Constants'
import Utils from '~/helpers/Utils'
import marvelService from '~/services/marvelService'

const getAllLikedContent =
  (LOADING_IDENTIFICATOR = 'all') =>
  (dispatch) => {
    dispatch(Utils.startLoading(LOADING_IDENTIFICATOR))

    return marvelService
      .getAllLikedByUser()
      .then((res) => {
        dispatch({ type: Constants.GET_FAV, payload: res.data })
      })
      .catch((err) => Utils.showError(err.reponse?.error))
      .finally(() => dispatch(Utils.endLoading(LOADING_IDENTIFICATOR)))
  }

export default { getAllLikedContent }
