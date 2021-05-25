import Utils from '~/helpers/Utils'
import marvelService from '~/services/marvelService'

const getAllComics =
  (
    { seach = '', limit = 12, offer = 0 },
    callBack = () => {},
    LOADING_IDENTIFICATOR = 'all'
  ) =>
  (dispatch) => {
    dispatch(Utils.startLoading(LOADING_IDENTIFICATOR))

    return marvelService
      .getComics({ seach, limit, offer })
      .then((res) => callBack({ comics: res.data }))
      .catch((err) => callBack({ erro: err }))
      .finally(() => dispatch(Utils.endLoading(LOADING_IDENTIFICATOR)))
  }

export default { getAllComics }
