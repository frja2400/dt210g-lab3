import axios from 'axios'

const API_URL = 'http://localhost:5260/api'

// Skapar Axios-instans med bas-URL och JSON-header för att inte behöva skriva URL och headers i varje anrop
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
})

// Interceptor som automatiskt lägger till JWT-token i headers
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

// API-funktioner för Posts
export const getPosts = () => api.get('/post')
export const getPost = (id: number) => api.get(`/post/${id}`)
export const createPost = (post: { title: string; category: string; content: string }) =>
    api.post('/post', post)
export const updatePost = (id: number, post: { title: string; category: string; content: string }) =>
    api.put(`/post/${id}`, post)
export const deletePost = (id: number) => api.delete(`/post/${id}`)

export default api