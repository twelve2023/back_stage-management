import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router';
import store from './store';
import './api/mock'
import Cookie from 'js-cookie'

Vue.config.productionTip = false
Vue.use(ElementUI);

// 全局前置守卫
router.beforeEach((to, from, next) => {
  // to当前的路由对象，from要跳往的路由对象，next进行跳转动作
  // 获取token
  const token =Cookie.get('token')
  if(!token&&to.name!=='login'){//token不存在（即用户没有登陆），且当前页面不是登录页
    next({name:'login'})//跳转回登录页
  }else if(token&&to.name==='login'){//token存在（即用户已登陆），且当前页面是登录页
    next({name:'home'})//跳转至首页
  }else{
    next()
  }
})

new Vue({
  store ,
  router,
  render: h => h(App),
  // 解决刷新白屏问题
  created(){
    store.commit('addMenu',router)
  }
}).$mount('#app')
