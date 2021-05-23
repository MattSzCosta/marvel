import http from '~/config/httpRequest/http'

const CONTROLLER_NAME = ''

export const login = (credentials) => {
  return new Promise((resolve, reject) => {
    http
      .post(`/${CONTROLLER_NAME}/login`, credentials)
      .then((res) => resolve(res))
      .catch((err) => reject(err))
  })
}
export default { login }
