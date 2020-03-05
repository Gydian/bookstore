import Vue from 'vue'
import Router from 'vue-router'
import login from '@/views/login'
import register from '@/views/register'
import main from '@/views/main'
import personal from '@/views/personal'

Vue.use(Router)

const router =  new Router({
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
    },{
      path:'/personal',
      name:'personal',
      component:personal
    }
  ]
});

//导航守卫
//使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登录
router.beforeEach((to, from, next) => {
  if (to.path === '/') {
    next();
  }else{
    let token = localStorage.getItem('token');
    if (token === 'null' || token === '') {
      next('/');
    }else{
      next();
    }
  }
});
export default router
