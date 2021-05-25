import i18next from 'i18next'
import jwtDecode from 'jwt-decode'
import _ from 'lodash'
import { toast } from 'react-toastify'
import Constants from '~/helpers/enums/Constants'
import debounce from 'lodash.debounce'

export const not = (obj) => !obj

export const isEmpty = (obj) => _.isEmpty(obj)

export const isNotEmpty = (obj) => !isEmpty(obj)

export const isEmptyOrNullOrZero = (obj) => {
  return isEmpty(obj) || obj === 0
}

export const setToken = (token, key = Constants.TOKEN) => {
  localStorage.setItem(key, token)
}

export const getToken = (key = Constants.TOKEN) => {
  return localStorage.getItem(key)
}

const tokenExpTime = (token) => {
  if (isEmpty(token.exp)) return true
  return token.exp > Math.floor(new Date().getTime() / 1000)
}

export const hasTokenValid = () => {
  const token = getDataToken()
  return isNotEmpty(token) && tokenExpTime(token)
}

export const removeToken = (key = Constants.TOKEN) => {
  return localStorage.removeItem(key)
}

export const startLoading = (identifier) => ({
  type: Constants.UPDATE_LOADING,
  loading: { [identifier]: true }
})

export const endLoading = (identifier) => ({
  type: Constants.UPDATE_LOADING,
  loading: { [identifier]: false }
})

const showToast = (description, type, ...props) => {
  toast(description, {
    type: type,
    position: toast.POSITION.TOP_CENTER,
    ...props
  })
}

export const showTranslatedToast = ({ description, type }, props) => {
  if (!description) return
  try {
    const Translated = i18next.t(description)
    description = Translated
  } finally {
    showToast(description, type, props)
  }
}

export const showError = debounce((message) => {
  toast(message, {
    type: Constants.ERROR
  })
}, 1000)

export const showSuccess = (message) => {
  showTranslatedToast({
    type: Constants.SUCCESS,
    description: message
  })
}

export const showInfo = (message) => {
  showTranslatedToast({
    type: Constants.INFO,
    description: message
  })
}

export const showAllErrors = (errors) => {
  const show = (err) => {
    err &&
      err.forEach((e) => {
        showError(e)
      })
  }

  if (errors.response.data.errors) {
    show(
      Object.values(errors.response.data.errors).reduce((a, b) => a.concat(b))
    )
  } else if (errors.response.data) {
    showError(errors.response.data.error)
  }
}

export const getDataToken = () => {
  const token = getToken()
  if (token) {
    return jwtDecode(token)
  }
  return null
}

export const makeService = (service, id) => {
  return (callback = () => {}) => {
    service({ id })
      .then(callback)
      .catch((err) => callback(null, err))
  }
}

export default {
  not,
  isEmpty,
  isNotEmpty,
  endLoading,
  startLoading,
  hasTokenValid,
  setToken,
  removeToken,
  getToken,
  showTranslatedToast,
  isEmptyOrNullOrZero,
  showAllErrors,
  showSuccess,
  showInfo,
  showError,
  makeService
}
