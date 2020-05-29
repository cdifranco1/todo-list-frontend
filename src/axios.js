import axios from 'axios'


export const axiosBase = axios.create({
  baseUrl: 'localhost:8000'
})