import Vue from 'vue'
import layout from "../views/layout/Layout"
import VueRouter from 'vue-router'
Vue.use(VueRouter)

export const router = [
  {path: '/login', component: () => import('../views/Login'), hidden: true},
  {
    path: '',
    component: layout,
    redirect: '/home',
    children: [{
      path: 'home',
      name: 'home',
      component: () => import('../views/Home'),
      meta: {title: '首页', icon: 'home'}
    }]
  }
]

export const asyncRouter = [
  {
    path: '/ums',
    name: 'ums',
    redirect: '/ums/admin',
    meta: {title: '权限', icon: 'ums'},
    component: layout,
    children:[
      {
        path: 'admin',
        name: 'admin',
        component: () => import('../views/ums/admin/User'),
        meta: {title: '用户列表', icon: 'ums-admin'}
      },
      {
        path: 'role',
        name: 'role',
        component: () => import('../views/ums/role/Role'),
        meta: {title: '角色列表', icon: 'ums-role'}
      },
      {
        path: 'allocMenu',
        name: 'allocMenu',
        component: () => import('../views/ums/role/allocMenu'),
        meta: {title: '分配菜单'},
        hidden: true
      },
      {
        path: 'allocResource',
        name: 'allocResource',
        component: () => import('../views/ums/role/allocResource'),
        meta: {title: '分配资源'},
        hidden: true
      },
      {
        path: 'menu',
        name: 'menu',
        component: () => import('../views/ums/menu/Menu'),
        meta: {title: '菜单列表', icon: 'ums-menu'}
      },
      {
        path: 'resource',
        name: 'resource',
        component: () => import('../views/ums/resource/Resource'),
        meta: {title: '资源列表', icon: 'ums-resource'}
      },
      {
        path: 'resourceCategory',
        name: 'resourceCategory',
        component: () => import('../views/ums/resource/categoryList'),
        meta: {title: '资源分类'},
        hidden: true
      }
    ]
  },
]

export default new VueRouter({
  mode: 'history',
  scrollBehavior: () => ({y: 0}),
  routes: router
})
