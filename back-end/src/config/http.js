import axios from 'axios';

const _instance = null;

const getInstance = () => {
  if (_instance !== null) return _instance;

  const env = process.env || {}

  const config = {
    baseURL: env.MARVEL_URL_API || '/api'
  };

  if (env.NODE_ENV !== 'development') {
    config['timeout'] = env.TIMEOUT || 600000;
  }

  return axios.create(config);
};

export default getInstance();
