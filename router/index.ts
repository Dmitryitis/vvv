import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Calculator from '../views/Calculator.vue'
import History from '../views/History.vue'
import Analytics from '../views/Analytics.vue'
import About from '../views/About.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Calculator',
    component: Calculator
  },
  {
    path: '/history',
    name: 'History',
    component: History
  },
  {
    path: '/analytics',
    name: 'Analytics',
    component: Analytics
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