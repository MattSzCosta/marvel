import Constants from '~/helpers/enums/Constants'

const INITIAL_STATE = {
  favChars: [],
  favComics: []
}

function marvelReducer(state = INITIAL_STATE, action = null) {
  switch (action.type) {
    case Constants.GET_FAV:
      return {
        ...state,
        favChars: action.payload.characters,
        favComics: action.payload.comics
      }
    default:
      return state
  }
}

export default marvelReducer
