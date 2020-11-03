// eslint-disable-next-line
import { UserLayout } from '@/layouts'

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/',
    component: UserLayout,
    redirect: '/basin',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
      },
      {
        path: 'basin',
        name: 'basin',
        component: () => import(/* webpackChunkName: "user" */ '@/views/typicalBasin/Index')
      },
      {
        path: 'forecast',
        name: 'forecast',
        component: () => import(/* webpackChunkName: "user" */ '@/views/forecast/Index')
      },
      {
        path: 'framework',
        name: 'framework',
        component: () => import(/* webpackChunkName: "user" */ '@/views/framework/Index')
      },
      {
        path: 'method',
        name: 'method',
        component: () => import(/* webpackChunkName: "user" */ '@/views/method/Index')
      },
      {
        path: 'model',
        name: 'model',
        component: () => import(/* webpackChunkName: "user" */ '@/views/model/Index')
      },
      {
        path: 'topic',
        name: 'topic',
        component: () => import(/* webpackChunkName: "user" */ '@/views/topic/Index')
      },
      {
        path: 'uncertainty',
        name: 'uncertainty',
        component: () => import(/* webpackChunkName: "user" */ '@/views/uncertainty/Index')
      },
      {
        path: 'data',
        name: 'data',
        component: () => import(/* webpackChunkName: "user" */ '@/views/data/Index')
      }
    ]
  }


  // {
  //   path: '/404',
  //   component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  // },
  // {
  //   path: '*', redirect: '/404', hidden: true
  // }

]
