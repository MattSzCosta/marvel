import http from '~/config/httpRequest/http'

export const login = (credentials) => {
  return new Promise((resolve, reject) => {
    http
      .post(`/login`, credentials)
      .then((res) => resolve(res))
      .catch((err) => reject(err))
  })
}

const register = (form) => {
  return new Promise((resolve, reject) => {
    http
      .post(`/user/me`, form)
      .then((res) => resolve(res))
      .catch((err) => reject(err))
  })
}
export default { login, register }
