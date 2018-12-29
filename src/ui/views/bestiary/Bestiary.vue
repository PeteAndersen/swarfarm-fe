<template>
  <div>
    <router-view></router-view>
    <PopulateBestiary/>
  </div>
</template>

<script>
import PopulateBestiary from './components/PopulateBestiary';
export default {
  name: 'Bestiary',
  components: {
    PopulateBestiary,
  },
};
</script>

<style scoped>
</style>