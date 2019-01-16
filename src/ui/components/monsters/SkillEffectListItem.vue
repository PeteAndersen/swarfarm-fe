<template>
  <v-list-tile>
    <v-list-tile-avatar v-if="icon || effect.effect.icon_filename" tile>
      <img
        v-if="effect.effect.icon_filename"
        :src="`/img/skill_effects/${effect.effect.icon_filename}`"
      >
    </v-list-tile-avatar>

    <v-list-tile-content>
      <v-list-tile-title>{{ effect.effect.name }}</v-list-tile-title>
      <v-list-tile-sub-title>{{ effectDetail }}</v-list-tile-sub-title>
    </v-list-tile-content>
  </v-list-tile>
</template>

<script>
export default {
  props: {
    effect: {
      type: Object,
      required: true,
    },
    icon: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  computed: {
    effectDetail() {
      const extraEffects = [];

      if (this.effect.quantity) {
        if (this.effect.effect.icon_filename) {
          // Effect is applied to monsters, quantity indicates turn duration
          extraEffects.push(
            `${this.effect.quantity} turn${
              this.effect.quantity > 1 ? 's' : ''
            }`,
          );
        } else if (this.effect.all) {
          extraEffects.push('All');
        } else {
          // For other effects, quantity may refer to other values
          // If quantity is small, it is most likely a count and not a percentage.
          let quantity = `${this.effect.quantity}${
            this.effect.quantity > 8 ? '%' : ''
          }`;

          if (this.effect.self_hp) {
            quantity += ' of Self HP';
          }
          if (this.effect.target_hp) {
            quantity += ' of Target HP';
          }
          if (this.effect.damage) {
            quantity += ' of Damage';
          }

          extraEffects.push(quantity);
        }
      }

      if (this.effect.aoe) {
        extraEffects.push('AOE');
      }
      if (this.effect.self_effect) {
        extraEffects.push('Self Effect');
      }
      if (this.effect.chance) {
        extraEffects.push(`${this.effect.chance}% Chance`);
      }
      if (this.effect.on_death) {
        extraEffects.push('On Death');
      }
      if (this.effect.on_crit) {
        extraEffects.push('On Crit');
      }
      if (this.effect.random) {
        extraEffects.push('Random');
      }

      return extraEffects.join(' - ');
    },
  },
};
</script>

<style scoped>
</style>