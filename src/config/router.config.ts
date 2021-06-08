import { BasicLayout } from '@/layouts'

// RouteView

export const asyncRouterMap = [
  {
    path: '/',
    name: 'index',
    // component: BasicLayout,
    component: () => import('@/views/Function/index.vue'),
    meta: { title: 'Home' },
    redirect: '/function',
    children: [
      {
        path: '/function',
        name: 'function',
        // component: RouteView,
        // meta: { title: 'menu.function', icon: 'table' },
        component: () => import('@/views/Function/index.vue'),
      },
      {
        path: '/xfunction',
        name: 'xfunction',
        // component: RouteView,
        // meta: { title: 'menu.function', icon: 'table' },
        component: () => import('@/views/Temp/index.vue'),
      },
    ]
  },
  // {
  //   path: '*',
  //   redirect: '/404',
  //   hidden: true
  // }
]