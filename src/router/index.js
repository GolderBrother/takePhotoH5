import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/page/Home'
import Register from '@/page/Register'
import TakePhoto from '@/page/TakePhoto'
import Welcome from '@/page/Welcome'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path:"*",
      redirect: "/"
    },
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/takePhoto',
      name: 'TakePhoto',
      component: TakePhoto
    }
    ,{
      path: '/welcome',
      name: 'Welcome',
      component: Welcome
    }
  ]
})
