// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// css类
import 'muse-ui/dist/muse-ui.css';
import 'muse-ui-loading/dist/muse-ui-loading.css'; 
import 'muse-ui-toast/dist/muse-ui-toast.all.css'; 
import '@/app.scss'

// 工具类
import './utils/rem'

// UI类
import MuseUI from 'muse-ui'
import Loading from 'muse-ui-loading';
import Toast from "muse-ui-toast";
Vue.use(MuseUI);
Vue.use(Loading);
Vue.use(Toast,{
  position: 'top',
  close: true,    
  closeIcon: 'close',  
  successIcon: 'check_circle', 
  errorIcon: 'warning'
});

// 请求类
import axios from '@/axios/api';
Vue.use(axios);

// import axios from "axios";
// axios.defaults.baseURL = "/apiv1";
// Vue.prototype.$http = axios;

// store
import store from '@/store';

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
