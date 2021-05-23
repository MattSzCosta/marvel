import axios from 'axios'
import { addInterceptors } from './interceptors'

const _instance = null

const getInstance = () => {
  if (_instance !== null) return _instance

  // eslint-disable-next-line no-undef
  const env = process.env || {}

  const config = {
    baseURL: env.REACT_APP_URL_API || '/api'
  }

  if (env.NODE_ENV !== 'development') {
    config['timeout'] = env.REACT_APP_TIMEOUT || 600000
  }

  let newInstance = axios.create(config)

  newInstance = addInterceptors(newInstance)

  return newInstance
}

export default getInstance()
