import Vue from 'vue'
import App from './App.vue'

//导入全局基础样式
import css from './assets/css/base.less'
//导入element-ui 
import element from './element/index'
//导入路由
import VueRouter from 'vue-router'
//导入组件
import Login from './components/login.vue'
import Index from './components/index.vue'

// //导入message模块
// import { Message } from 'element-ui'
// Vue.prototype.$message = Message;



Vue.use(css)
//使用element-ui 
Vue.use(element)
//使用路由
Vue.use(VueRouter)



//准备规则
const routes = [
  { path: "/login", component: Login },
  { path: '/index', component: Index }
]

//创建路由对象
const router = new VueRouter({
  routes
})

//创建全局导航守卫,通过判断token的存在是否返回登入页面
router.beforeEach((to, from, next) => {
  //如果去的路径包含有index,就去首页
  if (to.path.indexOf('index') != -1) {
    //判断是否有登入，就看有不有token
    if (window.localStorage.getItem('token')) {
      //放行
      next()
    } else {
      //提示先登录
      Vue.prototype.$message('请先登录')
      //退回到登入页面
      router.push('login')
    }
  } else {
    //去其他页面
    next()
  }
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  //挂在路由对象
  router
}).$mount('#app')
