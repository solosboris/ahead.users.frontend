import axios from 'axios'
import type { User } from '../stores/users'

const restClient = axios.create({
    baseURL: 'http://localhost:8080/ahead',
    headers: { 'Content-Type': 'application/json' }
})

export const getUsers = () =>
    restClient.get<User[]>('/users')

export const getRandom = () =>
    restClient.get<User>('/users/random')