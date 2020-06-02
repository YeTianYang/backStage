import Vue from 'vue'
import App from './App.vue'

//导入全局基础样式
import css from './assets/css/base.less'
//导入element-ui 
import element from './element/index'


// //导入message模块
// import { Message } from 'element-ui'
// Vue.prototype.$message = Message;
// import { MessageBox } from 'element-ui'
// Vue.prototype.$messageBox = MessageBox;

Vue.use(css)
//使用element-ui 
Vue.use(element)

//导入封装的router
import router from './router/router'

//注册全局组件:面包屑
import bread from './components/bread.vue'
Vue.component('bread',bread)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  //挂在路由对象
  router
}).$mount('#app')
