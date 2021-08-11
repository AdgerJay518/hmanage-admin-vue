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
      },
      {
        path: 'addMenu',
        name: 'addMenu',
        component: () => import('../views/ums/menu/addMenu'),
        meta: {title: '添加菜单'},
        hidden: true
      },
      {
        path: 'updateMenu',
        name: 'updateMenu',
        component: () => import('../views/ums/menu/update'),
        meta: {title: '修改菜单'},
        hidden: true
      }
    ]
  },
  {
    path: '/pms',
    name: 'pms',
    redirect: '/pms/product',
    component: layout,
    meta: {title: '商品', icon: 'pms'},
    children: [
      {
        path: 'product',
        name: 'product',
        component: () => import('../views/pms/product/Product'),
        meta: {title: '商品列表', icon: 'pms-product'}
      },
      {
        path: 'addProduct',
        name: 'addProduct',
        component: () => import('../views/pms/addProduct/addProduct'),
        meta: {title: '添加商品', icon: 'pms-addProduct'}
      },
    ]
  },
  {
    path: '/sms',
    name: 'sms',
    redirect: '/sms/sport',
    meta: {title: '运动', icon: 'sms'},
    component: layout,
    children: [
      {
        path: 'sport',
        name: 'sport',
        component: () => import('../views/sms/sport/Sport'),
        meta: {title: '运动列表', icon: 'sms-sport'}
      },
      {
        path: 'sportCompose',
        name: 'sportCompose',
        component: () => import('../views/sms/sportCompose/SportCompose'),
        meta: {title: '运动组合', icon: 'sms-SportCompose'}
      },
      {
        path: 'calorie',
        name: 'calorie',
        component: () => import('../views/sms/calorie/Calorie'),
        meta: {title: '卡路里', icon: 'sms-calorie'}
      },
    ]
  },
  {
    path: '/fms',
    name: 'fms',
    redirect: '/fms/food',
    meta: {title: '食品', icon: 'fms'},
    component: layout,
    children: [
      {
        path: 'food',
        name: 'food',
        component: () => import('../views/fms/food/Food'),
        meta: {title: '食品列表', icon: 'fms-food'}
      },
      {
        path: 'foodCompose',
        name: 'foodCompose',
        component: () => import('../views/fms/foodCompose/FoodCompose'),
        meta: {title: '营养搭配', icon: 'fms-FoodCompose'}
      },
    ]
  }

]

export default new VueRouter({
  mode: 'history',
  scrollBehavior: () => ({y: 0}),
  routes: router
})
