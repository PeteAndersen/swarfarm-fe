<template>
  <v-snackbar :value="isPopulating && show" bottom right :timeout="0">Populating Bestiary...
    <v-btn color="pink" flat @click="show = false">Close</v-btn>
  </v-snackbar>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'PopulateBestiary',
  data() {
    return {
      show: true,
    };
  },
  computed: {
    ...mapState('bestiary', ['isPopulating']),
  },
};
</script>

<style scoped>
</style>