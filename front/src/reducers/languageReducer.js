import Constants from '~/helpers/enums/Constants'

const INITIAL_STATE = {
  language: 'pt-BR'
}

function languageReducer(state = INITIAL_STATE, action = null) {
  switch (action.type) {
    case Constants.LANGUAGE:
      return {
        ...state,
        language: action.language
      }

    default:
      return state
  }
}

export default languageReducer
