<template>
  <v-flex v-bind="{ [`${colsize}`]: true }">
    <v-layout column align-content-center>
      <v-flex class="pb-0 stat font-weight-black">{{ abbreviation }}</v-flex>
      <v-flex class="pt-0">
        {{ value }}
        <template v-if="percentageStat">%</template>
      </v-flex>
    </v-layout>
  </v-flex>
</template>

<script>
const percentageStats = ['crit-rate', 'crit-dmg', 'resistance', 'accuracy'];
const abbreviations = {
  hp: 'HP',
  atk: 'ATK',
  def: 'DEF',
  speed: 'SPD',
  'crit-rate': 'CRI Rate',
  'crit-dmg': 'CRI Dmg',
  resistance: 'RES',
  accuracy: 'ACC',
};

export default {
  name: 'Stat',
  props: {
    stat: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
    colsize: {
      type: String,
      default: 'xs3',
    },
  },
  computed: {
    abbreviation() {
      return abbreviations[this.stat];
    },
    percentageStat() {
      return percentageStats.includes(this.stat);
    },
  },
};
</script>

<style scoped>
.stat {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
