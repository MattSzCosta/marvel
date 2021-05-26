import http from '~/config/httpRequest/http'

export const getComics = (params) => {
  return new Promise((resolve, reject) => {
    http
      .get(`/comics`, { params })
      .then((res) => resolve(res))
      .catch((err) => reject(err))
  })
}

export const getComicDetail = (params) => {
  return new Promise((resolve, reject) => {
    http
      .get(`/comic`, { params })
      .then((res) => resolve(res))
      .catch((err) => reject(err))
  })
}

export const getCharDetail = (params) => {
  return new Promise((resolve, reject) => {
    http
      .get(`/char`, { params })
      .then((res) => resolve(res))
      .catch((err) => reject(err))
  })
}

export const getChars = (params) => {
  return new Promise((resolve, reject) => {
    http
      .get(`/chars`, { params })
      .then((res) => resolve(res))
      .catch((err) => reject(err))
  })
}

export const setLikeContent = (params) => {
  return new Promise((resolve, reject) => {
    http
      .post(`/user/like`, params)
      .then((res) => resolve(res))
      .catch((err) => reject(err))
  })
}

export const getAllLikedByUser = () => {
  return new Promise((resolve, reject) => {
    http
      .get(`/user/like`)
      .then((res) => resolve(res))
      .catch((err) => reject(err))
  })
}

export default {
  getComics,
  getComicDetail,
  getCharDetail,
  getChars,
  setLikeContent,
  getAllLikedByUser
}
