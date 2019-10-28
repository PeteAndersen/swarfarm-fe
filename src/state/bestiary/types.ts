import {
  Monster,
  Archetype,
  Element,
  CraftMaterial,
  MonsterSource,
} from '@/services/monsters.types';
import {
  Skill,
  Effect,
  LeaderSkillArea,
  LeaderSkillAttribute,
} from '@/services/skills.types';

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
  name: string;
  element: Element[];
  base_stars: [number, number];
  awakened: AwakenedOptions;
  archetype: Archetype[];
  leader_skill_area: LeaderSkillArea[];
  leader_skill_attribute: LeaderSkillAttribute[];
  leader_skill_bonus: number;
}

export enum AwakenedOptions {
  BOTH = 'both',
  UNAWAKENED = 'unawakened',
  AWAKENED = 'awakened',
}

export interface BestiaryState {
  entities: BestiaryEntities;
  isPopulating: boolean;
  lastPopulated: number | null;
  filterDrawer: boolean;
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
