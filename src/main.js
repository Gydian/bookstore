// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import qs from 'qs'

Vue.config.productionTip = false
Vue.use(ElementUI)

axios.defaults.baseURL = 'http://192.168.11.249:9000'
axios.defaults.headers.post['Content-Type'] = "application/json"
axios.defaults.headers.post['Access-Control-Allow-Origin'] = 'http://192.168.11.249:9000'
// axios.defaults.withCredentials = true;
axios.defaults.headers.common['Authorization'] = store.state.token;

Vue.prototype.axios = axios      //全局注册，使用方法为:this.axios
Vue.prototype.qs = qs            //全局注册，使用方法为:this.qs

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
