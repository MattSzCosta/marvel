import Constants from '~/helpers/enums/Constants'
import Utils from '~/helpers/Utils'

const changeLanguage =
  (i18nNotation, LOADING_IDENTIFICATOR = '') =>
  (dispatch) => {
    dispatch(Utils.startLoading(LOADING_IDENTIFICATOR))

    dispatch({ type: Constants.LANGUAGE, language: i18nNotation })

    dispatch(Utils.endLoading(LOADING_IDENTIFICATOR))
  }

export default {
  changeLanguage
}
