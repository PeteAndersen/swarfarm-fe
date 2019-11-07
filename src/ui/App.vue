<template>
  <v-app>
    <AppBar />

    <div class="loading-indicator">
      <v-progress-linear :active="$store.state.loading" :indeterminate="true"></v-progress-linear>
    </div>

    <MainNav />

    <v-content>
      <router-view></router-view>
    </v-content>

    <Toast />
  </v-app>
</template>

<script>
import AppBar from './components/AppBar';
import MainNav from './components/MainNav';
import Toast from './components/Toast';

export default {
  name: 'App',
  components: {
    AppBar,
    MainNav,
    Toast,
  },
};
</script>

<style scoped>
.loading-indicator {
  position: fixed;
  top: 64px;
  left: 0;
  width: 100%;
}
</style>
