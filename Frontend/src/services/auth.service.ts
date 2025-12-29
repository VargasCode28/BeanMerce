import api from './api'



export const loginRequest = (email: string, password: string) => 
    api.post('/login', {email, password})


export const registerRequest = (email: string, password: string) => 
    api.post('/register', {email, password})

