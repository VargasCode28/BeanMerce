// import axios from 'axios'

// const privateApi = axios.create({
//   baseURL: 'http://localhost:3000/api',
//   headers: {
//     'Content-Type': 'application/json'
//   }
// })

// privateApi.interceptors.request.use(config => {
//   const token = localStorage.getItem('token')

//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`
//   }

//   return config
// })

// export default privateApi  
























import axios from 'axios'

const privateApi = axios.create({
  baseURL: 'http://localhost:3000/api'
})

// ✅ interceptor SOLO para el token
privateApi.interceptors.request.use(config => {
  const token = localStorage.getItem('token')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

export default privateApi
