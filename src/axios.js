import axios from 'axios'

const prodURL = 'https://sleepy-everglades-19578.herokuapp.com'
const devURL = "http://localhost:8000"

export const axiosInstance = () => axios.create({
  baseURL: prodURL,
  withCredentials: true
})
