<template>
  <v-flex>
    <v-menu open-on-hover lazy :open-delay="350" max-width="350px">
      <div slot="activator" class="spell-box">
        <div class="subheader">{{spell.slot}}. {{spell.name}}</div>

        <v-avatar size="3em" class="skill-icon">
          <img :src="`/img/skills/${spell.icon_filename}.png`">
        </v-avatar>

        <v-avatar
          v-for="(effect, index) in spell.effects"
          :key="index"
          tile
          size="1.5em"
          slot="activator"
        >
          <img :src="effect.effect.icon_filename">
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
.spell-box {
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
