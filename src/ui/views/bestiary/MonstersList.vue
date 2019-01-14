<template>
  <v-container fluid grid-list-lg class="pa-0">
    <v-layout row wrap>
      <MonstersListCard v-for="monster in monsters" :key="monster.id" :monster="monster"/>
    </v-layout>
  </v-container>
</template>

<script>
import MonstersListCard from './MonstersListCard';

export default {
  name: 'MonstersList',
  props: {
    monsters: {
      type: Array,
      required: true,
    },
  },
  components: {
    MonstersListCard,
  },
};
</script>

<style scoped>
</style>
