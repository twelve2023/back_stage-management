import Vue from 'vue'
import VueRouter from 'vue-router'
// 引入组件
import Home from '../views/Home.vue'
import User from '../views/User.vue'
import Main from '../views/Main.vue'
import Mall from '../views/Mall.vue'
import PageOne from '../views/PageOne.vue'
import PageTwo from '../views/PageTwo.vue'
import Login from '../views/Login.vue'
// import { component } from 'vue/types/umd'
Vue.use(VueRouter)

// 将路由与组件做映射
const routes = [
  // 主路由
  {
    path: '/',
    component: Main,
    name:'Main',
    redirect:'/home',
   children:[
    // {path:'home',name:'home',component:Home},
    // {path:'user',name:'user',component:User},
    // {path:'mall',name:'mall',component:Mall},
    // {path:'page1',name:'page1',component:PageOne},
    // {path:'page2',name:'page2',component:PageTwo}
   ]
  },
  {
    path:'/login',
    name:'login',
    component: Login,
  }

]

//   创建router实例
const router = new VueRouter({
  routes // (缩写) 相当于 routes: routes
})
export default router

