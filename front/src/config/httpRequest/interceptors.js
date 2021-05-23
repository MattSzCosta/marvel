import Utils from '~/helpers/Utils'
import Constants from '~/helpers/enums/Constants'
import Labels from '~/helpers/enums/Labels'

export const addInterceptors = (http) => {
  // RESPONSE INTERCEPTORS
  http.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      if (!error.response) {
        Utils.showTranslatedToast(
          {
            type: Constants.ERROR,
            description: Labels.NETWORK_ERROR
          },
          { toastId: 503 }
        )
      } else {
        console.log(error.response.data)
        switch (error.request.status) {
          case 401:
            if (Utils.hasTokenValid()) {
              Utils.removeToken()
              localStorage.setItem(Constants.TOKEN_INVALID, true)
              window.location.reload()
            }
            break
          case 403:
            Utils.showTranslatedToast({
              type: Constants.ERROR,
              description: Labels.FORBIDDEN
            })
            break
          case 405:
            Utils.showTranslatedToast({
              type: Constants.ERROR,
              description: Labels.METHOD_NOT_ALLOWED
            })
            break
          case 400:
            Utils.showError(error.response.data?.error)
            break
          default:
            break
        }

        if (error.request.status >= 500) {
          Utils.showError(Labels.INTERNAL_SERVER_ERROR)
        }
      }
      return Promise.reject(error)
    }
  )

  // REQUEST INTERCEPTORS
  http.interceptors.request.use(
    async (config) => {
      if (Utils.hasTokenValid) {
        config.headers.Authorization = `Bearer ${Utils.getToken()}`
      }
      return config
    },
    (error) => {
      // I cand handle a request with errors here
      return Promise.reject(error)
    }
  )

  return http
}
