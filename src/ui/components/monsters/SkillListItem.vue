<template>
  <v-menu open-on-hover lazy :open-delay="350" max-width="350px">
    <v-list-item slot="activator">
      <v-list-item-avatar>
        <img :src="`/static/spells/${spell.image}.png`" />
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title>{{ spell.slot }}. {{ spell.title }}</v-list-item-title>
        <v-list-item-sub-title>
          <v-avatar v-for="(effect, index) in effects" :key="index" tile size="1.5em">
            <img :src="effect.icon" />
          </v-avatar>
        </v-list-item-sub-title>
      </v-list-item-content>
    </v-list-item>

    <SpellPanel :spell="spell" />
  </v-menu>
</template>

<script>
import { effect_definitions } from '@/services/creatures.js';
import SpellPanel from '@/ui/components/creatures/SpellPanel.vue';

export default {
  name: 'Spell',
  components: {
    SpellPanel,
  },
  props: {
    spell: {
      type: Object,
      required: true,
    },
  },
  computed: {
    effects() {
      return this.spell.effects.reduce((accum, effect) => {
        const definition = effect_definitions[effect.effect];

        if (definition && definition.icon) {
          accum.push({
            title: definition.title,
            icon: `/static/effects/${definition.icon}.png`,
          });
        }
        return accum;
      }, []);
    },
  },
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
