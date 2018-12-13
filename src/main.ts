import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import 'vuetify/src/stylus/app.styl';

import App from './ui/App.vue';
import router from '@/ui/router';
import store from '@/state/store';
import './registerServiceWorker';

Vue.config.productionTip = false;

Vue.use(Vuetify, {
  iconfont: 'md',
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
