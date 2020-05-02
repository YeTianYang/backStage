import Vue from 'vue'
import App from './App.vue'

//导入基础样式
import css from './assets/css/base.less'
//导入element-ui 
import element from './element/index'
//导入路由
import VueRouter from 'vue-router'


//导入组件
import Login from './components/login.vue'
import Index from './components/index.vue'

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

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  //挂在路由对象
  router
}).$mount('#app')
