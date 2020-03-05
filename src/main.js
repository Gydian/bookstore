// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import qs from 'qs'
import store from './store/index'

Vue.config.productionTip = false
Vue.use(ElementUI)

axios.defaults.baseURL = 'http://localhost:9010'
// axios.defaults.headers.post['Content-Type'] = "application/json"
// axios.defaults.headers.post['Access-Control-Allow-Origin'] = 'http://localhost:9010'
// axios.defaults.withCredentials = true;
// axios.defaults.headers.common['Authorization'] = store.state.token;

Vue.prototype.axios = axios      //全局注册，使用方法为:this.axios
Vue.prototype.qs = qs            //全局注册，使用方法为:this.qs

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

//添加请求拦截器
axios.interceptors.request.use(config => {
  //在发送请求之前做些什么
  //判断是否存在token， 如果存在将每个页面header都添加token
  if (store.state.token) {
    config.headers.common['access_token'] = localStorage.getItem('token');
  }
  return config;
}, error => {
  //请求错误做些什么
  return Promise.reject(error);
});

//http response 拦截器
axios.interceptors.response.use(response => {

  return response;
}, error => {
  console.log("#############");
  console.log(error);
  if (error.response) {
    switch (error.response.status) {
      case 401:
        this.$store.commit('del_token');
        router.replace({
          path: '/',
          query: { redirect: router.currentRoute.fullPath } //登录成功后跳入浏览的当前页面
        })
    }
  }
  console.log("-------------");
  return Promise.reject(error.response.data);
});


