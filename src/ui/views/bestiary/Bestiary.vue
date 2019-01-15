<template>
  <div>
    <router-view></router-view>
    <BestiaryPopulating/>
  </div>
</template>

<script>
import BestiaryPopulating from './BestiaryPopulating';
export default {
  name: 'Bestiary',
  components: {
    BestiaryPopulating,
  },
};
</script>

<style scoped>
</style>