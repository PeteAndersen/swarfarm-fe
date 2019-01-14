<template>
  <v-card height="100%">
    <v-card-title primary-title class="pb-1 pt-2">
      <v-avatar class="mr-2">
        <img :src="`/static/spells/${spell.image}.png`">
      </v-avatar>
      <span class="headline">
        <template v-if="showSlot">{{ spell.slot }}.</template>
        {{ spell.title }}
      </span>

      <v-spacer></v-spacer>

      <v-tooltip bottom>
        <v-avatar slot="activator">
          <img :src="`/static/spells/${spell.type_image}.png`">
        </v-avatar>
        {{spellTypeIcon}}
      </v-tooltip>
    </v-card-title>

    <v-divider/>

    <v-card-text v-if="attacks.length" class="pt-1 pb-1">
      <template v-for="(attack, index) in attacks">
        <div :key="index">
          {{ attack.target }}
          <span
            v-if="attack.probability && attacks.length > 1"
          >({{ Math.round(attack.probability * 100) }}% Chance)</span>
          :
          {{ attack.formula }}
        </div>
      </template>
    </v-card-text>

    <v-divider/>

    <v-list v-if="effects.length" dense class="pt-1 pb-1">
      <v-list-tile v-for="(effect, index) in effects" :key="index">
        <v-list-tile-avatar v-if="effectHasIcon" tile>
          <img v-if="effect.effect.icon" :src="`/static/effects/${effect.effect.icon}.png`">
        </v-list-tile-avatar>

        <v-list-tile-content>
          <v-list-tile-title>{{ effect.effect.title }}</v-list-tile-title>

          <v-list-tile-sub-title>
            <!-- TODO: Construct this sub title in a method using an array of strings joined by ' - ' -->
            {{ effect.target }}
            <template v-if="effect.params.length || effect.probability || effect.condition.length">-</template>
            <span v-if="effect.probability">
              {{ Math.round(effect.probability * 100) }}% Chance
              <template v-if="effect.params.length || effect.condition.length">-</template>
            </span>
            <span v-if="effect.condition">
              If {{ effect.condition }}
              <template v-if="effect.params.length">-</template>
            </span>
            <span v-for="(param, paramIdx) in effect.params" :key="paramIdx">
              {{ param }}
              <template v-if="paramIdx < effect.params.length - 1">-</template>
            </span>
          </v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>

    <v-divider v-if="effects.length"/>

    <v-card-text class="pt-1 pb-1" v-html="description"></v-card-text>
    <v-card-text v-if="spell.turns > 1" class="pt-1 pb-1">Cooldown: {{ spell.turns }} turns</v-card-text>

    <v-divider/>

    <v-card-text class="pt-1" v-if="spell.upgrades && spell.upgrades.length">
      <h4 class="pb-1">Upgrades</h4>
      <ol>
        <li v-for="(upgrade, index) in spell.upgrades" :key="index">
          {{ upgrade.description }}
          <template v-if="upgrade.is_percentage">+{{ Math.round(upgrade.amount * 100) }}%</template>
          <template v-else>
            <template v-if="upgrade.amount > 0">+</template>
            {{ upgrade.amount }}
          </template>
        </li>
      </ol>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'SpellPanel',
  props: {
    spell: {
      type: Object,
      required: true,
    },
    showSlot: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  computed: {},
};
</script>

<style scoped>
</style>
