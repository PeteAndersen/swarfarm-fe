import Vue from 'vue';
import { Module, ActionTree, MutationTree, GetterTree } from 'vuex';
import { normalize, denormalize } from 'normalizr';
import * as api from './api';
import { RootState } from '@/state/types';
import { BestiaryState, BestiaryEntities, BestiaryFilters } from './types';
import { Monster } from '@/services/monsters.types';

import schema from './schema';

const bestiaryLifespan: number = 24 * 60 * 60 * 1000; // 24 hrs before repopulating
const defaultFilters: BestiaryFilters = {
  obtainable: true,
  name: '',
  element: '',
  nat_stars: [1, 5],
};

const bestiaryState: BestiaryState = {
  entities: {
    monsters: {},
    craftMaterials: {},
    sources: {},
    skills: {},
    effects: {},
  },
  isPopulating: false,
  lastPopulated: null,
  filters: defaultFilters,
  page: 1,
  pageSize: 40,
  orderBy: 'name',
  orderDir: 1,
};

const mutations: MutationTree<BestiaryState> = {
  setIsPopulating(state, value: BestiaryState['isPopulating']) {
    state.isPopulating = value;
  },
  setLastPopulated(state, value: BestiaryState['lastPopulated']) {
    state.lastPopulated = value;
  },
  setPage(state, page: BestiaryState['page']): void {
    state.page = page;
  },
  setOrderBy(state, orderKey: BestiaryState['orderBy']): void {
    state.orderBy = orderKey;
  },
  setOrderDir(state, dir: BestiaryState['orderDir']): void {
    state.orderDir = dir;
  },
  updateEntities(
    state,
    {
      entities,
    }: {
      entities: Partial<BestiaryEntities>;
    },
  ): void {
    // Iterate through payload entities and update state using vue.set to ensure reactivity
    Object.keys(entities).forEach((entityType: string) => {
      Object.values(entities[entityType]).forEach((entity: any) => {
        Vue.set(state.entities[entityType], entity.id, entity);
      });
    });
  },
};

const actions: ActionTree<BestiaryState, RootState> = {
  async populateBestiary({ state, commit, dispatch }) {
    if (
      state.lastPopulated &&
      state.lastPopulated > Date.now() - bestiaryLifespan
    ) {
      // Bestiary has been recently populated, no need to do again right now
      return;
    }

    commit('setIsPopulating', true);
    commit('setLastPopulated', null);

    // Fetch all monsters
    let page: number = 1;
    let isMore: boolean = true;

    do {
      const { data } = await api.fetchMonsters({
        page,
        ...api.filtersToApiParams(defaultFilters),
      });
      const normalized = normalize(data.results, [schema.monster]);
      commit('updateEntities', { entities: normalized.entities });

      isMore = data.next !== null;
      page++;
    } while (isMore);

    commit('setIsPopulating', false);
    commit('setLastPopulated', Date.now());
  },
};

const getters: GetterTree<BestiaryState, RootState> = {
  totalMonsterCount: state => Object.values(state.entities.monsters).length,
  filteredMonsters: state =>
    // Filtering is a TODO
    denormalize(
      Object.keys(state.entities.monsters),
      [schema.monster],
      state.entities,
    ),
  filteredMonsterCount: (state, { filteredMonsters }): number =>
    filteredMonsters.length,
  sortedMonsters: ({ orderBy, orderDir }, { filteredMonsters }): Monster[] =>
    filteredMonsters.sort((a: Monster, b: Monster) => {
      if (a[orderBy] === b[orderBy]) {
        // Secondary sort on name if first sort key matches, but always sort a-z
        return a.name > b.name ? 1 : -1;
      } else {
        return a[orderBy] > b[orderBy] ? orderDir : -orderDir;
      }
    }),
  visibleMonsterList: ({ page, pageSize }, { sortedMonsters }): Monster[] =>
    sortedMonsters.slice((page - 1) * pageSize, page * pageSize),
};

const bestiary: Module<BestiaryState, RootState> = {
  namespaced: true,
  state: bestiaryState,
  mutations,
  actions,
  getters,
};

export default bestiary;
