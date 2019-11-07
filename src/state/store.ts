import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import { RootState } from './types';
import bestiary from './bestiary/store';

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
  // plugins: [createPersistedState()],
  state: {
    loading: false,
    error: false,
    drawer: true,
    toast: [],
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
    ADD_TOAST(state, value) {
      state.toast.push(value);
    },
    CLEAR_TOAST(state) {
      state.toast.shift();
    },
  },
  getters: {
    firstToast: state => (state.toast.length ? state.toast[0] : null),
  },
  modules: {
    bestiary,
  },
};

export default new Vuex.Store<RootState>(store);
