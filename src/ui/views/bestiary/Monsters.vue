<template>
  <div>
    <v-container fluid>
      <v-layout row align-baseline class="pb-2">
        <v-flex>
          <v-btn @click="$store.commit('TOGGLE_DRAWER')" class="ml-0">
            <v-icon class="pr-1">menu</v-icon>Filters
          </v-btn>Sort By
          <v-menu>
            <v-btn flat slot="activator" class="pl-1 pr-1">
              {{ orderByText }}
              <v-icon>arrow_drop_down</v-icon>
            </v-btn>
            <v-list>
              <v-list-tile
                dense
                v-for="(kvp, index) in Object.entries(sortByOptions)"
                :key="index"
                @click="changeCreatureListOrderKey(kvp[0])"
              >
                <v-list-tile-title>{{ kvp[1] }}</v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>

          <v-menu>
            <v-btn flat slot="activator" class="pl-1 pr-1">
              {{ orderDirectionText }}
              <v-icon>arrow_drop_down</v-icon>
            </v-btn>
            <v-list>
              <v-list-tile
                dense
                v-for="(kvp, index) in Object.entries(sortDirectionOptions)"
                :key="index"
                @click="changeCreatureListOrderDir(kvp[0])"
              >
                <v-list-tile-title>{{ kvp[1] }}</v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
        </v-flex>

        <v-spacer/>

        <v-flex class="text-xs-right">{{ totalMonsterCount }} of {{ totalMonsterCount }} Monsters</v-flex>
      </v-layout>

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

export default {
  name: 'Monsters',
  created() {
    this.populateBestiary();
  },
  data() {
    return {
      sortByOptions: {
        name: 'Name',
        'element,name': 'Element',
        'archetype,name': 'Archetype',
        'rank,name': 'Base Stars',
        maxLvlHp: 'HP',
        maxLvlAttack: 'ATK',
        maxLvlDefense: 'DEF',
        speed: 'SPD',
        criticalChance: 'Crit. Chance',
        criticalDamage: 'Crit. Dmg',
        accuracy: 'Accuracy',
        resistance: 'Resistance',
      },
      sortDirectionOptions: {
        '': 'Ascending',
        '-': 'Descending',
      },
    };
  },
  methods: {
    ...mapActions('bestiary', ['populateBestiary']),
  },
  computed: {
    ...mapGetters('bestiary', ['totalMonsterCount', 'visibleMonsterList']),
    ...mapState('bestiary', ['orderBy', 'orderDir', 'pageSize']),
    orderByText() {
      return this.sortByOptions[this.orderBy];
    },
    orderDirectionText() {
      return this.sortDirectionOptions[this.orderDir];
    },
    page: {
      get: function() {
        return this.$store.state.bestiary.page;
      },
      set: function(newValue) {
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