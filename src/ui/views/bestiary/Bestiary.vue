<template>
  <div>
    <router-view></router-view>
    <v-snackbar :value="isPopulating" bottom right :timeout="0">Loading Bestiary...</v-snackbar>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Bestiary',
  computed: {
    ...mapState('bestiary', ['isPopulating']),
  },
};
</script>

<style scoped>
</style>