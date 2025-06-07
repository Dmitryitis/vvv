import { createRouter, createWebHistory } from 'vue-router'
import Calculator from '../views/Calculator.vue'
import About from '../views/About.vue'

const routes = [
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