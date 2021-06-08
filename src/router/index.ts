import { createRouter, createWebHistory } from 'vue-router'
import { asyncRouterMap } from '@/config/router.config'

export default createRouter({
  history: createWebHistory(),
  routes: asyncRouterMap
})
