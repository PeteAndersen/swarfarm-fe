<template>
  <div>
    <FilterForm/>

    <v-container fluid>
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
import FilterForm from './components/FilterForm';
import MonstersInfoBar from './components/MonstersInfoBar';

export default {
  name: 'Monsters',
  created() {
    this.fetchBestiaryPage();
  },
  components: {
    FilterForm,
    MonstersInfoBar,
  },
  methods: {
    ...mapActions('bestiary', ['fetchBestiaryPage']),
  },
  computed: {
    ...mapGetters('bestiary', ['visibleMonsterList', 'filteredMonsterCount']),
    ...mapState('bestiary', ['pageSize']),
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