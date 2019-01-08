import {
  Monster,
  Skill,
  CraftMaterial,
  Effect,
  MonsterSource,
} from '@/services/monsters.types';

export interface BestiaryEntities {
  [key: string]: any;
  monsters: {
    [key: number]: Monster;
  };
  craftMaterials: {
    [key: number]: CraftMaterial;
  };
  sources: {
    [key: number]: MonsterSource;
  };
  skills: {
    [key: number]: Skill;
  };
  effects: {
    [key: number]: Effect;
  };
}

export interface BestiaryFilters {
  obtainable: boolean;
  name: string;
  element: string[] | null;
  nat_stars: [number, number];
}

export interface BestiaryState {
  entities: BestiaryEntities;
  isPopulating: boolean;
  lastPopulated: number | null;
  filters: BestiaryFilters;
  page: number;
  pageSize: number;
  orderBy: string;
  orderDir: -1 | 1;
}

export interface MonsterListApiOptions {
  page?: number;
  page_size?: number;
  order_by?: string;
  obtainable?: boolean;
}

export interface SkillListApiOptions {
  page?: number;
  page_size?: number;
}
