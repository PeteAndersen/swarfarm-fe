<template>
  <v-layout row align-baseline class="pb-2">
    <v-flex>
      <v-btn @click="$store.commit('TOGGLE_DRAWER')" class="ml-0">
        <v-icon class="pr-1">menu</v-icon>Filters
      </v-btn>Sort By
      <v-menu>
        <v-btn text slot="activator" class="pl-1 pr-1">
          {{ orderByText }}
          <v-icon>arrow_drop_down</v-icon>
        </v-btn>
        <v-list>
          <v-list-tile
            dense
            v-for="(kvp, index) in Object.entries(orderbyOptions)"
            :key="index"
            @click="setOrderBy(kvp[0])"
          >
            <v-list-tile-title>{{ kvp[1] }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>

      <v-menu>
        <v-btn text slot="activator" class="pl-1 pr-1">
          {{ orderDirectionText }}
          <v-icon>arrow_drop_down</v-icon>
        </v-btn>
        <v-list>
          <v-list-tile
            dense
            v-for="(kvp, index) in Object.entries(orderDirOptions)"
            :key="index"
            @click="setOrderDir(kvp[0])"
          >
            <v-list-tile-title>{{ kvp[1] }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-flex>

    <v-spacer />

    <v-flex class="text-xs-right">{{ filteredMonsterCount }} of {{ totalMonsterCount }} Monsters</v-flex>
  </v-layout>
</template>

<script>
import { mapActions, mapGetters, mapState, mapMutations } from 'vuex';

export default {
  name: 'MonstersInfoBar',
  data() {
    return {
      orderbyOptions: {
        name: 'Name',
        element: 'Element',
        archetype: 'Archetype',
        family_id: 'Family',
        base_stars: 'Base Stars',
        maxLvlHp: 'HP',
        maxLvlAttack: 'ATK',
        maxLvlDefense: 'DEF',
        speed: 'SPD',
        criticalChance: 'Crit. Chance',
        criticalDamage: 'Crit. Dmg',
        accuracy: 'Accuracy',
        resistance: 'Resistance',
      },
      orderDirOptions: {
        ascending: 'Ascending',
        descending: 'Descending',
      },
    };
  },
  computed: {
    ...mapGetters('bestiary', ['filteredMonsterCount', 'totalMonsterCount']),
    ...mapState('bestiary', ['orderBy']),
    orderDir() {
      return this.$store.state.bestiary.orderDir === 1
        ? 'ascending'
        : 'descending';
    },
    orderByText() {
      return this.orderbyOptions[this.orderBy];
    },
    orderDirectionText() {
      return this.orderDirOptions[this.orderDir];
    },
  },
  methods: {
    setOrderBy(newKey) {
      this.$store.commit('bestiary/setOrderBy', newKey);
    },
    setOrderDir(direction) {
      this.$store.commit(
        'bestiary/setOrderDir',
        direction === 'ascending' ? 1 : -1,
      );
    },
  },
};
</script>

<style scoped>
</style>