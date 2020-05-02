import Vue from 'vue'
import App from './App.vue'

//导入element-ui 
import element from './element/index'

Vue.use(element)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
