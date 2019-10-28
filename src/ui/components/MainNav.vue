<template>
  <v-navigation-drawer app clipped v-model="drawer">
    <v-list dense nav>
      <v-list-item link to="/">Home</v-list-item>
      <v-list-item link to="/bestiary">Bestiary</v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'MainNav',
  computed: {
    drawer: {
      get() {
        return this.$store.state.drawer;
      },
      set(value) {
        this.$store.commit('DRAWER', { value });
      },
    },
  },
};
</script>
