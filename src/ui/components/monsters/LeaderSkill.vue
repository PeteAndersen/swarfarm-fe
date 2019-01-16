<template>
  <v-flex>
    <div class="subheader">Leader Skill</div>

    <v-avatar tile size="3em" class="skill-icon">
      <img :src="`/img/skills/leader/${imageFilename}`">
    </v-avatar>
  </v-flex>
</template>

<script>
export default {
  name: 'LeaderSkill',
  props: {
    skill: {
      type: Object,
      required: true,
    },
  },
  computed: {
    imageFilename() {
      let suffix;

      if (this.skill.area === 'Element') {
        suffix = `_${this.skill.element}`;
      } else if (this.skill.area === 'General') {
        suffix = '';
      } else {
        suffix = `_${this.skill.area}`;
      }

      return `leader_skill_${this.skill.attribute.replace(
        ' ',
        '_',
      )}${suffix}.png`;
    },
  },
};
</script>

<style scoped>
</style>