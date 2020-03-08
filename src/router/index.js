import Vue from 'vue'
import Router from 'vue-router'
import login from '@/views/login'
import register from '@/views/register'
import main from '@/views/main'
import personal from '@/views/personal'
import administration from '@/views/administration'
import accountManage from '@/management/accountManage'
import bookManage from '@/management/bookManage'
import newBookStatistic from '@/management/newBookStatistic'
import registerStatistic from '@/management/registerStatistic'
import salesStatistic from '@/management/salesStatistic'
import totalBookStatistic from '@/management/totalBookStatistic'

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
      name:'mian',
      component:main
    },{
      path:'/personal',
      name:'personal',
      component:personal
    },{
      path:'/administration',
      name:'administration',
      component:administration,
      children:[
        {
          path:'accountManage',
          name:'accountManage',
          component:accountManage
        },
        {
          path:'bookManage',
          name:'bookManage',
          component:bookManage
        },
        {
          path:'newBookStatistic',
          name:'newBookStatistic',
          component:newBookStatistic
        },
        {
          path:'registerStatistic',
          name:'registerStatistic',
          component:registerStatistic
        },
        {
          path:'salesStatistic',
          name:'salesStatistic',
          component:salesStatistic
        },
        {
          path:'totalBookStatistic',
          name:'totalBookStatistic',
          component:totalBookStatistic
        }
      ]
    }
  ]
});

//导航守卫
//使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登录
router.beforeEach((to, from, next) => {
  let token = localStorage.getItem('token');
  if (to.name !== 'login') {
    if (token) next()
    else next({ path: '/' })
  } 
  else {
    if (token) next({ name: 'mian' })
    else next()
  }
})
export default router
