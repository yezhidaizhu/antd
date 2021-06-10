import { BasicLayout, BasicLayoutContent } from '@/layouts'

// RouteView

export const asyncRouterMap = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    // component: () => import('@/views/Function/index.vue'),
    meta: { title: 'Home' },
    redirect: '/function/function1',
    children: [
      {
        path: '/function',
        name: 'function',
        component: BasicLayoutContent,
        redirect: '/function/function1',
        children: [
          {
            path: '/function/function1',
            name: 'function1',
            component: () => import('@/views/functionx/index.vue'),
          },
          {
            path: '/function/function2',
            name: 'function2',
            component: () => import('@/views/temp/index.vue'),
          }
        ]
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