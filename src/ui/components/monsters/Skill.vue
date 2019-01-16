<template>
  <v-flex>
    <v-menu open-on-hover lazy :open-delay="350" max-width="350px">
      <div slot="activator" class="skill-box">
        <div class="subheader text-truncate">{{skill.slot}}. {{skill.name}}</div>

        <v-avatar tile size="3em" class="skill-icon">
          <img :src="`/img/skills/${skill.icon_filename}`">
        </v-avatar>

        <v-avatar
          v-for="(effect, index) in effectsWithIcons"
          :key="index"
          tile
          size="1.5em"
          slot="activator"
          class="ml-1"
        >
          <img :src="`/img/skill_effects/${effect.effect.icon_filename}`">
        </v-avatar>
      </div>

      <SkillPanel :skill="skill"/>
    </v-menu>
  </v-flex>
</template>

<script>
import SkillPanel from './SkillPanel';

export default {
  name: 'Skill',
  components: {
    SkillPanel,
  },
  props: {
    skill: {
      type: Object,
      required: true,
    },
  },
  computed: {
    effectsWithIcons() {
      return this.skill.effects.reduce(
        (accum, eff) => (eff.effect.icon_filename ? [...accum, eff] : accum),
        [],
      );
    },
  },
};
</script>

<style scoped>
.v-menu {
  width: 100%;
}
.skill-box {
  white-space: normal;
  max-width: 100%;
}
.subheader {
  height: 2em;
}

.skill-icon {
  float: left;
}
</style>
