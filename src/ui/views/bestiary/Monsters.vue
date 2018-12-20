<template>
  <div>
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
import { mapActions, mapGetters, mapState } from 'vuex';
import MonstersInfoBar from './components/MonstersInfoBar';

export default {
  name: 'Monsters',
  created() {
    this.populateBestiary();
  },
  components: {
    MonstersInfoBar,
  },
  methods: {
    ...mapActions('bestiary', ['populateBestiary']),
  },
  computed: {
    ...mapGetters('bestiary', ['visibleMonsterList']),
    ...mapState('bestiary', ['pageSize']),

    page: {
      get() {
        return this.$store.state.bestiary.page;
      },
      set(newValue) {
        this.changeMonsterListPage(newValue);
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