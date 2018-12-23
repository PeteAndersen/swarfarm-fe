<template>
  <div>
    <populating-bestiary v-if="isPopulating && lastPopulated === null"/>
    <v-container v-else fluid>
      <monsters-info-bar/>

      <ul>
        <li v-for="monster in visibleMonsterList" :key="monster.id">{{monster.name}}</li>
      </ul>

      <div class="text-xs-center">
        <v-pagination v-if="numPages > 1" class="pt-2" v-model="page" :length="numPages"/>
      </div>
    </v-container>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import MonstersInfoBar from './components/MonstersInfoBar';
import PopulatingBestiary from './components/PopulatingBestiary';

export default {
  name: 'Monsters',
  created() {
    this.populateBestiary();
  },
  components: {
    MonstersInfoBar,
    PopulatingBestiary,
  },
  methods: {
    ...mapActions('bestiary', ['populateBestiary']),
  },
  computed: {
    ...mapGetters('bestiary', ['visibleMonsterList', 'filteredMonsterCount']),
    ...mapState('bestiary', ['pageSize', 'isPopulating', 'lastPopulated']),
    page: {
      get() {
        return this.$store.state.bestiary.page;
      },
      set(newValue) {
        this.$store.commit('bestiary/setPage', newValue);
      },
    },
    numPages() {
      return Math.ceil(this.filteredMonsterCount / this.pageSize);
    },
  },
};
</script>

<style scoped>
</style>