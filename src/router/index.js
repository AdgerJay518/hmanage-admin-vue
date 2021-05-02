import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import axios from "../axios";
import store from "../store"
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
      // {
      //   path: '/ums/admin',
      //   name: 'User',
      //   component: () => import( '../views/ums/admin/User'),
      //   meta: {title: '用户列表', icon: 'ums-admin'}
      // },
      // {
      //   path: '/ums/role',
      //   name: 'Role',
      //   component: () => import( '../views/ums/role/Role'),
      //   meta: {title: '角色列表', icon: 'ums-role'}
      // },
      // {
      //   path: '/ums/menu',
      //   name: 'Menu',
      //   component: () => import( '../views/ums/menu/Menu'),
      //   meta: {title: '菜单列表', icon: 'ums-menu'}
      // },
      // {
      //   path: '/ums/resource',
      //   name: 'Resource',
      //   component: () => import( '../views/ums/resource/Resource'),
      //   meta: {title: '资源列表', icon: 'ums-resource'}
      // }
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

router.beforeEach((to,from,next)=>{
  let hasRoute=store.state.menu.hasRoute
  if(!hasRoute){
    axios.get("/ums/menu",{
      headers:{
        Authorization:localStorage.getItem("token")
      }
    }).then(res=>{
      store.commit("setMenu",res.data.data.menu)
      store.commit("setAut",res.data.data.aut)

      let Routes=router.options.routes
      res.data.data.menu.forEach(menu=>{
        if(menu.children){
          menu.children.forEach(e=>{
            let route=menuToRoute(e)
            if(route){
              Routes[0].children.push(route)
            }
          })
        }
      })
      console.log(Routes)
      router.addRoutes(Routes)
      hasRoute=true
      store.commit("changeRouteState",hasRoute)
    })
  }

next()
})
const menuToRoute=(menu)=>{
  if(!menu.component){
    return null
  }
  let route={
    name:menu.name,
    path:menu.path,
    meta:{
      icon:menu.icon,
      title:menu.title
    }
  }
  route.component=()=>import('../views'+menu.component+'.vue')
  return route
}

export default router
