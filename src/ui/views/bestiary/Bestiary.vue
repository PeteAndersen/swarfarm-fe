<template>
  <div>
    <router-view></router-view>
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