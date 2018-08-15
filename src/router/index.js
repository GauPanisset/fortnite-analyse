import Vue from 'vue'
import Router from 'vue-router'
import Reader from '@/components/Reader'

import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue);

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ReplayReader',
      component: Reader
    }
  ]
})
