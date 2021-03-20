// axios
import axios from 'axios'
const baseURL = 'http://18.179.108.80:8080/'

const service = axios.create({
  baseURL, // api base_url
  timeout: 60000 // request timeout
})

export default service
