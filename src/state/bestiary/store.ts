import Vue from 'vue';
import { Module, ActionTree, MutationTree, GetterTree } from 'vuex';
import { normalize, denormalize } from 'normalizr';
import { AxiosResponse } from 'axios';

import { RootState } from '@/state/types';
import applyFilters from '@/services/filters';
import { Filter } from '@/services/filters.types';
import { Monster } from '@/services/monsters.types';
import {
  BestiaryState,
  BestiaryEntities,
  BestiaryFilters,
  AwakenedOptions,
} from './types';
import * as api from './api';
import schema from './schema';

const bestiaryLifespan: number = 24 * 60 * 60 * 1000; // 24 hrs before repopulating
export const defaultFilters: BestiaryFilters = {
  name: '',
  element: [],
  base_stars: [1, 6],
  awakened: AwakenedOptions.BOTH,
  archetype: [],
  leader_skill_area: [],
  leader_skill_attribute: [],
  leader_skill_bonus: 0,
};

const undefinedIfEmpty = (arry: any[]): any[] | undefined =>
  arry instanceof Array && arry.length > 0 ? arry : undefined;

const stateToFilters = (filters: BestiaryFilters): Filter => {
  // Convert local state to input format expected by filtering system
  let awakened;
  switch (filters.awakened) {
    case AwakenedOptions.AWAKENED:
      awakened = true;
      break;
    case AwakenedOptions.UNAWAKENED:
      awakened = false;
      break;
    case AwakenedOptions.BOTH:
    default:
      awakened = undefined;
      break;
  }

  const filterObj: Filter = {
    name__istartswith: filters.name,
    element__in: undefinedIfEmpty(filters.element),
    base_stars__gte: filters.base_stars[0],
    base_stars__lte: filters.base_stars[1],
    is_awakened: awakened,
    archetype__in: undefinedIfEmpty(filters.archetype),
    leader_skill__area__in: undefinedIfEmpty(filters.leader_skill_area),
    leader_skill__attribute__in: undefinedIfEmpty(
      filters.leader_skill_attribute,
    ),
    leader_skill__amount__gte: filters.leader_skill_bonus
      ? filters.leader_skill_bonus
      : undefined,
  };
  return filterObj;
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

export const mutations: MutationTree<BestiaryState> = {
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
  setFilters(state, filters: BestiaryFilters): void {
    state.filters = filters;
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
  async fetchBestiaryPage({ state, commit, dispatch }) {
    commit('LOADING', { value: true }, { root: true });

    // Fetch first page based on user filters in order to quickly display
    const {
      data: { count, results },
    } = await api.fetchMonsters({
      ...api.filtersToApiParams(state.filters),
      ...api.orderToApiParams(state.orderBy, state.orderDir),
    });

    // Commit received batch of entities for initial render
    commit('updateEntities', normalize(results, [schema.monster]));
    commit('LOADING', { value: false }, { root: true });

    dispatch('populateBestiary');
  },
  async populateBestiary({ state, commit, dispatch }) {
    // Retrieve all bestiary entities for client side filtering/sorting
    if (
      state.lastPopulated &&
      state.lastPopulated > Date.now() - bestiaryLifespan
    ) {
      // Bestiary has been recently populated, no need to do again right now
      return;
    }

    commit('setIsPopulating', true);
    commit('setLastPopulated', null);

    const populateEntities = dispatch('populateEntities', {
      apiEndpoint: api.fetchMonsters,
      entitySchema: schema.monster,
    });
    const populateSkills = dispatch('populateEntities', {
      apiEndpoint: api.fetchSkills,
      entitySchema: schema.skill,
    });

    await Promise.all([populateEntities, populateSkills]);

    commit('setIsPopulating', false);
    commit('setLastPopulated', Date.now());
  },
  async populateEntities({ commit }, { apiEndpoint, entitySchema }) {
    // Get first page so page count can be determined
    const {
      data: { count, results },
    } = await apiEndpoint();

    // Request all remaining pages
    const pageCount: number = Math.ceil(count / results.length);
    const apiRequests = [];

    for (let i = 2; i <= pageCount; i++) {
      apiRequests.push(
        apiEndpoint({
          page: i,
        }),
      );
    }

    const allEntityResults: AxiosResponse[] = await Promise.all(apiRequests);

    commit('updateEntities', normalize(results, [entitySchema]));
    allEntityResults.forEach(({ data: { results: entities } }) => {
      commit('updateEntities', normalize(entities, [entitySchema]));
    });
  },
};

const getters: GetterTree<BestiaryState, RootState> = {
  allMonsters: state =>
    applyFilters(
      { obtainable: true },
      denormalize(
        Object.keys(state.entities.monsters),
        [schema.monster],
        state.entities,
      ),
    ),
  totalMonsterCount: (state, { allMonsters }) => allMonsters.length,
  filteredMonsters: (state, { allMonsters }) =>
    applyFilters(stateToFilters(state.filters), allMonsters),
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
