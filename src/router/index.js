import Vue from 'vue'
import Router from 'vue-router'
import login from '@/views/login'
import register from '@/views/register'
import main from '@/views/main'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },{
      path:'/register',
      name:'register',
      component:register
    },{
      path:'/main',
      name:'main',
      component:main
    }
  ]
})
