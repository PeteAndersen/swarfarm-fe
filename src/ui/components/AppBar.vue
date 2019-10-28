<template>
  <v-app-bar app clipped-left>
    <v-app-bar-nav-icon @click.stop="TOGGLE_DRAWER()"></v-app-bar-nav-icon>

    <v-toolbar-title class="headline text-uppercase">
      <span>SWARFARM</span>
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <GlobalSearch />
  </v-app-bar>
</template>

<script>
import { mapMutations } from 'vuex';

import GlobalSearch from './GlobalSearch.vue';

export default {
  name: 'AppBar',
  components: {
    GlobalSearch,
  },
  methods: {
    ...mapMutations(['TOGGLE_DRAWER']),
  },
};
</script>
