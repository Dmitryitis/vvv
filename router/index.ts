import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Calculator from '../src/views/Calculator.vue'
import About from '../src/views/About.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Calculator',
    component: Calculator
  },
  {
    path: '/about',
    name: 'About',
    component: About
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router