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
        path: 'addSport',
        name: 'addSport',
        component: () => import('../views/sms/addSport/AddSport'),
        meta: {title: '添加运动', icon: 'sms-addSport'}
      },
      {
        path: 'updateSport',
        name: 'updateSport',
        component: () => import('../views/sms/sport/update'),
        meta: {title: '更新运动'},
        hidden: true
      },
      {
        path: 'addSportCate',
        name: 'addSportCate',
        component: () => import('../views/sms/sportCompose/add'),
        meta: {title: '添加运动分类'},
        hidden: true
      },
      {
        path: 'updateSportCate',
        name: 'updateSportCate',
        component: () => import('../views/sms/sportCompose/update'),
        meta: {title: '更新运动分类'},
        hidden: true
      },
      {
        path: 'sportCompose',
        name: 'sportCompose',
        component: () => import('../views/sms/sportCompose/SportCompose'),
        meta: {title: '运动分类', icon: 'sms-SportCompose'}
      },
      {
        path: 'calorie',
        name: 'calorie',
        component: () => import('../views/sms/calorie/Calorie'),
        meta: {title: '运动记录', icon: 'sms-history'}
      },
      {
        path: 'orderDetail',
        name: 'orderDetail',
        component: () => import('../views/sms/calorie/orderDetail'),
        meta: {title: '计划详情'},
        hidden:true
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
        path: 'addFood',
        name: 'addFood',
        component: () => import('../views/fms/addFood/AddFood'),
        meta: {title: '添加食品', icon: 'fms-add'}
      },
      {
        path: 'updateFood',
        name: 'updateFood',
        component: () => import('../views/fms/food/update'),
        meta: {title: '更新食品'},
        hidden: true
      },
      {
        path: 'foodCate',
        name: 'foodCate',
        component: () => import('../views/fms/foodCate/FoodCate'),
        meta: {title: '食品分类', icon: 'fms-foodCate'}
      },
      {
        path: 'addFoodCate',
        name: 'addFoodCate',
        component: () => import('../views/fms/foodCate/add'),
        meta: {title: '添加食品分类'},
        hidden: true
      },
      {
        path: 'updateFoodCate',
        name: 'updateFoodCate',
        component: () => import('../views/fms/foodCate/update'),
        meta: {title: '更新食品分类'},
        hidden: true
      },
      {
        path: 'foodCompose',
        name: 'foodCompose',
        component: () => import('../views/fms/foodCompose/FoodCompose'),
        meta: {title: '营养搭配', icon: 'fms-FoodCompose'}
      }
    ]
  },
  {
    path: '/hms',
    name: 'hms',
    redirect: '/hms/manage',
    meta: {title: '社区', icon: 'hms'},
    component: layout,
    children: [
      {
        path: 'subject',
        name: 'subject',
        component: () => import('../views/hms/subject/Subject'),
        meta: {title: '主题管理', icon: 'hms-subject'}
      },
      {
        path: 'member',
        name: 'member',
        component: () => import('../views/hms/member/Member'),
        meta: {title: '用户管理', icon: 'hms-member'}
      },
      {
        path: 'advertise',
        name: 'advertise',
        component: () => import('../views/hms/advertise/Advertise'),
        meta: {title: '广告列表', icon: 'hms-advertise'}
      },
      {
        path: 'addAdvertise',
        name: 'addHomeAdvertise',
        component: () => import('../views/hms/advertise/add'),
        meta: {title: '添加广告'},
        hidden:true
      },
      {
        path: 'subjectList',
        name: 'subjectList',
        component: () => import('../views/hms/subject/SubjectList'),
        meta: {title: '主题列表'},
        hidden:true
      },
      {
        path: 'subjectComment',
        name: 'subjectComment',
        component: () => import('../views/hms/subject/SubjectComment'),
        meta: {title: '主题评论'},
        hidden:true
      },
      {
        path: 'updateAdvertise',
        name: 'updateHomeAdvertise',
        component: () => import('../views/hms/advertise/update'),
        meta: {title: '编辑广告'},
        hidden:true
      },
      {
        path: 'addSubject',
        name: 'addSubject',
        component: () => import('../views/hms/subject/addSubject'),
        meta: {title: '添加专题'},
        hidden: true
      },
      {
        path: 'updateSubject',
        name: 'updateSubject',
        component: () => import('../views/hms/subject/updateSubject'),
        meta: {title: '更新专题'},
        hidden: true
      },
      {
        path: 'addSubjectList',
        name: 'addSubjectList',
        component: () => import('../views/hms/subject/addSubjectList'),
        meta: {title: '添加主题'},
        hidden: true
      },
      {
        path: 'updateSubjectList',
        name: 'updateSubjectList',
        component: () => import('../views/hms/subject/updateSubjectList'),
        meta: {title: '更新主题'},
        hidden: true
      },
    ]
  },
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
  }

]

export default new VueRouter({
  mode: 'hash',
  scrollBehavior: () => ({y: 0}),
  routes: router
})
