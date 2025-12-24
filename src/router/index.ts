import { createRouter, createWebHistory } from 'vue-router'
import Users from '../components/Users.vue'
import RandomUser from '../components/RandomUser.vue'

const routes = [
  { path: '/', redirect: '/users' },
  { path: '/users', component: Users },
  { path: '/random', component: RandomUser }
]

export default createRouter({
    history: createWebHistory(),
    routes
})