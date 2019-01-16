<template>
  <v-list class="pt-1 pb-1">
    <skill-effect-list-item
      v-for="(effect, idx) in effects"
      :key="idx"
      :effect="effect"
      :icon="anyEffectHasIcon"
    />
  </v-list>
</template>

<script>
import SkillEffectListItem from './SkillEffectListItem';
import { some } from 'lodash';

export default {
  name: 'SkillEffectList',
  props: {
    effects: {
      required: true,
      type: Array,
    },
  },
  components: {
    SkillEffectListItem,
  },
  computed: {
    anyEffectHasIcon() {
      return some(this.effects, eff => Boolean(eff.effect.icon_filename));
    },
  },
};
</script>

<style scoped>
</style>
