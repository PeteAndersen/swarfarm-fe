<template>
  <v-flex>
    <v-menu open-on-hover lazy :open-delay="350" max-width="350px">
      <div slot="activator" class="skill-box">
        <div class="subheader">{{skill.slot}}. {{skill.name}}</div>

        <v-avatar tile size="3em" class="skill-icon">
          <img :src="`/img/skills/${skill.icon_filename}`">
        </v-avatar>

        <v-avatar
          v-for="(effect, index) in skill.effects"
          :key="index"
          tile
          size="1.5em"
          slot="activator"
        >
          <img :src="`img/skill_effects/${effect.effect.icon_filename}`">
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
  computed: {},
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
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.skill-icon {
  float: left;
}
</style>
