<template>
  <v-card height="100%">
    <v-card-title primary-title class="pb-1 pt-2">
      <v-avatar tile class="mr-2">
        <img :src="`/img/skills/${skill.icon_filename}`">
      </v-avatar>
      <span class="headline">
        <template v-if="showSlot">{{ skill.slot }}.</template>
        {{ skill.name }}
      </span>
    </v-card-title>

    <v-divider/>

    <v-card-text v-if="skill.multiplier_formula" class="pt-1 pb-1">{{ skill.multiplier_formula }}</v-card-text>

    <v-divider/>

    <SkillEffectList v-if="effects.length" :effects="effects"/>

    <v-divider v-if="effects.length"/>

    <v-card-text class="pt-1 pb-1">{{ skill.description }}</v-card-text>
    <v-card-text v-if="skill.cooltime > 1" class="pt-1 pb-1">Cooldown: {{ skill.cooltime }} turns</v-card-text>

    <v-divider/>

    <v-card-text
      class="pt-1"
      v-if="skill.level_progress_description && skill.level_progress_description.length"
    >
      <h4 class="pb-1">Upgrades</h4>
      <ol>
        <li v-for="(upgrade, index) in skill.level_progress_description" :key="index">{{ upgrade }}</li>
      </ol>
    </v-card-text>
  </v-card>
</template>

<script>
import SkillEffectList from './SkillEffectList';

export default {
  name: 'skillPanel',
  props: {
    skill: {
      type: Object,
      required: true,
    },
    showSlot: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  components: {
    SkillEffectList,
  },
  computed: {
    effects() {
      // Bubble effects with icons to the top, then alphabetically
      return this.skill.effects.sort((a, b) => {
        // Display icons first, other effects last
        if (
          (a.effect.icon_filename !== '' && b.effect.icon_filename !== '') ||
          (a.effect.icon_filename === '' && b.effect.icon_filename === '')
        ) {
          // Sort alphabetically
          return a.effect.name.toLowerCase() < b.effect.name.toLowerCase()
            ? -1
            : 1;
        } else {
          // Sort by which one has an icon
          return a.effect.icon_filename ? -1 : 1;
        }
      });
    },
  },
};
</script>

<style scoped>
</style>
