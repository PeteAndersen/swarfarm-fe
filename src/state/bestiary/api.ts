import api from '@/services/api';
import {
  MonsterListApiOptions,
  SkillListApiOptions,
  BestiaryFilters,
} from './types';

export async function fetchMonsters(params: MonsterListApiOptions = {}) {
  return await api.get('monsters/', { params });
}

export async function fetchSkills(params: SkillListApiOptions = {}) {
  return await api.get('skills/', { params });
}

export const orderToApiParams = (
  orderBy: string,
  orderDir: -1 | 1,
): MonsterListApiOptions => {
  return {
    order_by: `${orderDir === -1 ? '-' : ''}${orderBy},name`,
  };
};

export const filtersToApiParams = (
  params: BestiaryFilters,
): MonsterListApiOptions => {
  const apiParams: MonsterListApiOptions = {};
  // TODO: Fill this out further.
  return apiParams;
};
