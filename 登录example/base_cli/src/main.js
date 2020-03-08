import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import MyHeader from './components/MyHeader'
import md5 from 'js-md5'

Vue.component("my-header",MyHeader);//注册为全局组件

axios.defaults.baseURL="http://localhost:8080";//基础路径
axios.defaults.withCredentials=true;//携带cookie请求验证

Vue.config.productionTip = false
Vue.prototype.$axios=axios;
Vue.prototype.$md5=md5;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
