import { combineReducers } from 'redux'

// Application Reducers
import language from '~/reducers/languageReducer'
import Constants from '~/helpers/enums/Constants'
import app from '~/reducers/appReducer'
import auth from '~/reducers/authReducer'

const appReducer = combineReducers({
  language,
  app,
  auth
})

const rootReducer = (state, action) => {
  if (action.type === Constants.LOGOUT) {
    state = undefined
  }

  return appReducer(state, action)
}

export default rootReducer
