import axios from 'axios'
import { toast } from 'react-toastify'

/**
 * This file is used to configure the default settings for axios.
 * This serves as an abstraction layer for the axios library.
 */
axios.defaults.baseURL = ''

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500

  if (expectedError) {
    toast.error('An unexpected error occurred.')
  }

  return Promise.reject(error)
})

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
}
