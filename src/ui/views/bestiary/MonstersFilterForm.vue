<template>
  <v-navigation-drawer fixed temporary v-model="filterDrawer">
    <v-toolbar flat>
      <v-list>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="title">Filters</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" icon text @click="copyPermalink">
            <v-icon>link</v-icon>
          </v-btn>
        </template>
        Copy Permalink
      </v-tooltip>
    </v-toolbar>

    <v-container>
      <v-form ref="form" @submit="submit">
        <h3>Monster Attributes</h3>

        <v-text-field v-model="filters.name" label="Name" autocomplete="off" />

        <v-select
          v-model="filters.element"
          label="Element"
          :items="elementOptions"
          multiple
          item-text="name"
          item-value="value"
        >
          <template slot="item" slot-scope="data">
            <v-list-item-action>
              <v-checkbox v-model="data.tile.props.value" />
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title v-html="data.item.name"></v-list-item-title>
            </v-list-item-content>
            <v-list-item-avatar>
              <img :src="`/static/creatures/icon-${data.item.value}.png`" />
            </v-list-item-avatar>
          </template>
        </v-select>

        <v-select
          v-model="filters.archetype"
          label="Archetype"
          :items="archetypeOptions"
          multiple
          item-text="name"
          item-value="value"
        ></v-select>

        <v-select
          v-model="filters.awaken_level"
          label="Awakening"
          :items="awakenedOptions"
          multiple
          item-text="name"
          item-value="value"
        ></v-select>

        <v-range-slider
          v-model="filters.base_stars"
          label="Nat. Stars"
          :max="6"
          :min="1"
          thumb-label="always"
          thumb-size="20"
          always-dirty
        />

        <v-divider />
        <h3 class="pt-2">Leader Skill</h3>

        <v-select
          v-model="filters.leader_skill_attribute"
          label="Bonus Attribute"
          :items="leaderSkillAttributeOptions"
          multiple
          item-text="name"
          item-value="value"
        ></v-select>

        <v-select
          v-model="filters.leader_skill_area"
          label="Area of Effect"
          :items="leaderSkillAreaOptions"
          multiple
          item-text="name"
          item-value="value"
        ></v-select>

        <v-slider
          v-model="filters.leader_skill_bonus"
          label="Min. Bonus"
          :min="0"
          :max="55"
          thumb-label="always"
          thumb-size="20"
          always-dirty
        ></v-slider>

        <v-divider />

        <v-switch v-model="autoApply" label="Auto-Apply Filters"></v-switch>

        <v-btn type="submit" :disabled="autoApply">Apply</v-btn>
        <v-btn text @click="clear">Clear</v-btn>
      </v-form>
    </v-container>
  </v-navigation-drawer>
</template>

<script>
import { mapMutations } from 'vuex';
import { debounce } from 'lodash';

import { Element, Archetype } from '@/services/monsters.types';
import { LeaderSkillAttribute, LeaderSkillArea } from '@/services/skills.types';
import { defaultFilters } from '@/state/bestiary/store';
import { AwakenedOptions } from '@/state/bestiary/types';

const toOptionsList = opts =>
  Object.values(opts).map(opt => ({ name: opt, value: opt }));

export default {
  name: 'MonstersFilterForm',
  data() {
    return {
      autoApply: false,
      autoApplyDebounce: null,
      filters: { ...this.$store.state.bestiary.filters },
      awakenedOptions: [
        { name: 'Unawakened', value: 0 },
        { name: 'Awakened', value: 1 },
        { name: 'Second Awakening', value: 2 },
      ],
    };
  },
  computed: {
    filterDrawer: {
      get() {
        return this.$store.state.bestiary.filterDrawer;
      },
      set(value) {
        this.setFilterDrawer(value);
      },
    },
    permalinkURL() {
      const queryParams = Object.entries(this.$store.state.bestiary.filters)
        .reduce((accum, val) => {
          if (Array.isArray(val[1])) {
            if (val[1].length) {
              accum.push(`${val[0]}=${val[1].join(',')}`);
            }
          } else {
            if (val[1]) {
              accum.push(`${val[0]}=${val[1]}`);
            }
          }

          return accum;
        }, [])
        .join('&');
      return encodeURI(`${window.location.origin}?${queryParams}`);
    },
    elementOptions() {
      return toOptionsList(Element);
    },
    archetypeOptions() {
      return toOptionsList(Archetype);
    },
    leaderSkillAttributeOptions() {
      return toOptionsList(LeaderSkillAttribute);
    },
    leaderSkillAreaOptions() {
      return toOptionsList(LeaderSkillArea);
    },
  },
  methods: {
    ...mapMutations('bestiary', ['setFilterDrawer', 'setFilters']),
    submit(e) {
      if (e) {
        e.preventDefault();
      }
      this.setFilters({ ...this.filters });
    },
    clear() {
      this.filters = { ...defaultFilters };
    },
    copyPermalink() {
      const el = document.createElement('textarea');
      el.value = this.permalinkURL;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      this.$store.commit('ADD_TOAST', { message: 'Copied!', color: 'success' });
    },
  },
  created() {
    this.debouncedSetFilters = debounce(this.setFilters, 300);
  },
  watch: {
    filters: {
      handler(val, oldVal) {
        if (this.autoApply) {
          this.debouncedSetFilters({ ...val });
        }
      },
      deep: true,
    },
  },
};
</script>

<style scoped>
</style>
