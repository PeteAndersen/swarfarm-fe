<template>
  <v-app>
    <div class="loading-indicator">
      <v-progress-linear :active="$store.state.loading" :indeterminate="true" class="ma-0"></v-progress-linear>
    </div>

    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>SWARFARM</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text to="/bestiary">Bestiary</v-btn>
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',
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
