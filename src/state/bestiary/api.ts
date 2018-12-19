import api from '@/services/api';
import { MonsterListApiOptions, BestiaryFilters } from './types';

export async function fetchMonsters(params: MonsterListApiOptions = {}) {
  return await api.get('monsters/', { params });
}

export const filtersToApiParams = (params: BestiaryFilters) => {
  const apiParams: MonsterListApiOptions = {};

  apiParams.obtainable = params.obtainable;

  return apiParams;
};
