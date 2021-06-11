import { BasicLayout, BasicLayoutContent } from '@/layouts'

// RouteView
export const asyncRouterMap = [
  {
    path: '/',
    name: 'Home',
    component: BasicLayout,
    meta: { title: 'Home' },
    redirect: '/function',
    children: [
      {
        path: '/function',
        name: 'function',
        meta: { title: 'function', icon: 'TableOutlined' }, // icon @https://2x.antdv.com/components/icon-cn
        component: () => import('@/views/function/index.vue'),
      },
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/exception/404.vue')
  }
]