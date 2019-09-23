import Vue from 'vue';
import vuetify from '@/plugins/vuetify';

import App from '@/ui/App.vue';
import router from '@/ui/router';
import store from '@/state/store';
import './registerServiceWorker';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app');
