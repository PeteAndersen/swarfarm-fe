import Vue from 'vue';
import Router from 'vue-router';

import bestiaryRouter from './views/bestiary/routes';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [...bestiaryRouter],
});
