import Constants from '~/helpers/enums/Constants'
import Labels from '~/helpers/enums/Labels'

// TYPES: success, info, warning, error.

// Sucess
export const MSG_SUCCESS = {
  type: Constants.SUCCESS,
  description: Labels.SUCCESSFUL_OPERATION
}
export const MSG_LOGIN_SUCCESS = {
  type: Constants.SUCCESS,
  description: Labels.SUCCESSFULLY_LOGGED
}

// Error
export const MSG_ERROR_NONPERMANENT = {
  type: Constants.ERROR,
  description: Labels.UNAVAILABLE_SERVICE
}
export const MSG_ERROR_PERMANENT = {
  type: Constants.ERROR,
  description: Labels.NEED_SUPPORT
}

// Network
export const NOT_FOUND = {
  type: Constants.ERROR,
  description: Labels.NOT_FOUND
}
export const BAD_REQUEST = {
  type: Constants.ERROR,
  description: Labels.BAD_REQUEST
}
export const UNAUTHORIZED = {
  type: Constants.WARNING,
  description: Labels.UNAUTHORIZED
}
export const FORBIDDEN = {
  type: Constants.ERROR,
  description: Labels.FORBIDDEN
}
export const INTERNAL_SERVER_ERROR = {
  type: Constants.ERROR,
  description: Labels.INTERNAL_SERVER_ERROR
}
export const ACCESS_DENIED = {
  type: Constants.ERROR,
  description: Labels.ACCESS_DENIED
}

export default {
  MSG_SUCCESS,
  MSG_ERROR_NONPERMANENT,
  MSG_ERROR_PERMANENT,
  MSG_LOGIN_SUCCESS,
  NOT_FOUND,
  BAD_REQUEST,
  UNAUTHORIZED,
  FORBIDDEN,
  INTERNAL_SERVER_ERROR,
  ACCESS_DENIED
}
