import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children:[
      {
        path: '/index',
        name: 'Index',
        component: () => import( '../views/Index')
      },
    ]
  },
  {
    path: '/ums',
    name: 'ums',
    component: Home,
    meta: {title: '权限', icon: 'ums'},
    children:[
      {
        path: '/ums/admin',
        name: 'User',
        component: () => import( '../views/ums/admin/User'),
        meta: {title: '用户列表', icon: 'ums-admin'}
      },
      {
        path: '/ums/role',
        name: 'Role',
        component: () => import( '../views/ums/role/Role'),
        meta: {title: '角色列表', icon: 'ums-role'}
      },
      {
        path: '/ums/menu',
        name: 'Menu',
        component: () => import( '../views/ums/menu/Menu'),
        meta: {title: '菜单列表', icon: 'ums-menu'}
      },
      {
        path: '/ums/resource',
        name: 'Resource',
        component: () => import( '../views/ums/resource/Resource'),
        meta: {title: '资源列表', icon: 'ums-resource'}
      }
    ]
  },
  {
    path: '/Login',
    name: 'Login',
    component: () => import( '../views/Login')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
