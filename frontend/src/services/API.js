import axios from 'axios'

const API = axios.create({
    baseURL:'https://myapp-1-fvmj.onrender.com/'
})

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const registerUser = (data)=>{
    return API.post('/register',data)
}

export const loginUser = (data) =>{
    return API.post('/login',data)
}

export const allPost = (data) =>{
    return API.get('/allpost',data)
}

export const dashboard = ()=>{
    return API.get('/dashboard')
}

export const newPost = (data) =>{
    return API.post('/newPost',data)
}

export const findUser = (id) =>{
    return API.get('/findUser',{params:{id}})
}

export const updateUser = (data) =>{
    return API.post('/updateUser',data)
}

export const userPost = (data)=>{
    return API.get('/userpost',data)
}

export const updatePost = (data)=>{
    return API.post('/updatePost',data)
}

export const deletePost = (id)=>{
    return API.delete(`/delete/${id}`)
}