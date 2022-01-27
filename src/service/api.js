import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:5000/',
  timeout: 10000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

instance.interceptors.request.use((config) => {
  config.params = config.params || {}
  if (config.media) {
    config.headers['Content-Type'] = 'multipart/form-data'
  }

  // console.log(config);
  return config
}, function (error) {
  // Do something with request error
  // console.log(error);
  return Promise.reject(error)
})

instance.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  // console.log(response);
  return response
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  /* console.log(error);
  console.log(error.toJSON()); */
  return Promise.reject(error)
})

export default instance
