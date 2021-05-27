import http from '~/config/httpRequest/http'

export const me = () => {
  return new Promise((resolve, reject) => {
    http
      .get(`/user/me`)
      .then((res) => resolve(res))
      .catch((err) => reject(err))
  })
}

const updateMe = (params) => {
  return new Promise((resolve, reject) => {
    http
      .put(`/user/me`, params)
      .then((res) => resolve(res))
      .catch((err) => reject(err))
  })
}

export default {
  updateMe,
  me
}
