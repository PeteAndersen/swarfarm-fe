import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';

import { RootState } from './types';
import bestiary from './bestiary/store';

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
  state: {
    loading: false,
    error: false,
    drawer: true,
  },
  mutations: {
    LOADING(state, { value }) {
      state.loading = value;
    },
    ERROR(state, { value }) {
      state.error = value;
    },
    DRAWER(state, { value }) {
      state.drawer = value;
    },
    TOGGLE_DRAWER(state) {
      state.drawer = !state.drawer;
    },
  },
  modules: {
    bestiary,
  },
  strict: process.env.NODE_ENV !== 'production',
};

export default new Vuex.Store<RootState>(store);
