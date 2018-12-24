<template>
  <v-navigation-drawer clipped fixed app v-model="drawer">
    <v-snackbar color="success" v-model="permalinkCopied" absolute top :timeout="2000">Copied!</v-snackbar>

    <v-toolbar flat>
      <v-list>
        <v-list-tile>
          <v-list-tile-title class="title">Filters</v-list-tile-title>
        </v-list-tile>
      </v-list>
      <v-tooltip bottom>
        <v-btn icon flat slot="activator" @click="copyPermalink">
          <v-icon>link</v-icon>
        </v-btn>Copy Permalink
      </v-tooltip>
    </v-toolbar>

    <v-container>
      <v-form ref="form" @submit="submit">
        <h3>Monster Attributes</h3>

        <v-text-field v-model="filters.name" label="Name" browser-autocomplete="off"/>

        <v-select
          v-model="filters.element"
          label="Element"
          :items="elementOptions"
          multiple
          item-text="name"
          item-value="value"
        >
          <template slot="item" slot-scope="data">
            <v-list-tile-action>
              <v-checkbox v-model="data.tile.props.value"/>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title v-html="data.item.name"></v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-avatar>
              <img :src="`/static/creatures/icon-${data.item.value}.png`">
            </v-list-tile-avatar>
          </template>
        </v-select>

        <v-range-slider
          v-model="filters.base_stars"
          label="Nat. Stars"
          :max="5"
          :min="1"
          thumb-label="always"
          thumb-size="20"
          always-dirty
        />

        <v-switch v-model="autoApply" label="Auto-Apply Filters"></v-switch>

        <v-btn type="submit" :disabled="autoApply">Apply</v-btn>
        <v-btn flat @click="clear">Clear</v-btn>
      </v-form>
    </v-container>
  </v-navigation-drawer>
</template>

<script>
import { mapActions, mapState } from 'vuex';

import { elements } from '@/services/monsters';

const initialFilters = {
  name: '',
  element: '',
  base_stars: [1, 5],
};

export default {
  name: 'FilterForm',
  data() {
    return {
      permalinkCopied: false,
      autoApply: false,
      filters: { ...initialFilters },
    };
  },
  computed: {
    drawer: {
      get() {
        return this.$store.state.drawer;
      },
      set(value) {
        this.$store.commit('DRAWER', { value });
      },
    },
    permalinkURL() {
      const query_params = Object.entries(this.$store.state.bestiary.filters)
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
      return encodeURI(`${window.location.origin}?${query_params}`);
    },
    elementOptions() {
      return elements.map(el => ({ name: el, value: el }));
    },
  },
  methods: {
    submit(e) {
      if (e) {
        e.preventDefault();
      }

      console.log(this.filters);
    },
    clear() {
      const autoApplyMem = this.autoApply;
      this.filters = { ...initialFilters };
    },
    copyPermalink() {
      const el = document.createElement('textarea');
      el.value = this.permalinkURL;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      this.permalinkCopied = true;
    },
  },
};
</script>

<style scoped>
</style>
