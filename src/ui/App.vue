<template>
  <v-app>
    <div class="loading-indicator">
      <v-progress-linear :active="$store.state.loading" :indeterminate="true" class="ma-0"></v-progress-linear>
    </div>

    <AppBar />
    <MainNav />

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import AppBar from './components/AppBar';
import MainNav from './components/MainNav';

export default {
  name: 'App',
  components: {
    AppBar,
    MainNav,
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
