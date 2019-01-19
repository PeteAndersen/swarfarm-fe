import { LeaderSkill } from './skills.types';

export enum Element {
  FIRE = 'Fire',
  WATER = 'Water',
  WIND = 'Wind',
  LIGHT = 'Light',
  DARK = 'Dark',
}

// Union pureElement with Element if all 6 elements are needed
export enum pureElement {
  PURE = 'Pure',
}

export enum Archetype {
  ATTACK = 'Attack',
  DEFENSE = 'Defense',
  HP = 'HP',
  SUPPORT = 'Support',
  MATERIAL = 'Material',
}

export interface Monster {
  [key: string]: any;
  id: number;
  url: string;
  com2us_id: number;
  family_id: number;
  name: string;
  image_filename: string;
  element: Element;
  archetype: Archetype;
  base_stars: 1 | 2 | 3 | 4 | 5 | 6;
  obtainable: boolean;
  can_awaken: boolean;
  is_awakened: boolean;
  awaken_bonus: string;
  skills: number[];
  skill_ups_to_max: 7;
  leader_skill: LeaderSkill | null;
  homunculus_skills: number[];
  base_hp: number;
  base_attack: number;
  base_defense: number;
  speed: number;
  crit_rate: number;
  crit_damage: number;
  resistance: number;
  accuracy: number;
  raw_hp: number;
  raw_attack: number;
  raw_defense: number;
  max_lvl_hp: number;
  max_lvl_attack: number;
  max_lvl_defense: number;
  awakens_from: number;
  awakens_to: number;
  awaken_mats_fire_low: number;
  awaken_mats_fire_mid: number;
  awaken_mats_fire_high: number;
  awaken_mats_water_low: number;
  awaken_mats_water_mid: number;
  awaken_mats_water_high: number;
  awaken_mats_wind_low: number;
  awaken_mats_wind_mid: number;
  awaken_mats_wind_high: number;
  awaken_mats_light_low: number;
  awaken_mats_light_mid: number;
  awaken_mats_light_high: number;
  awaken_mats_dark_low: number;
  awaken_mats_dark_mid: number;
  awaken_mats_dark_high: number;
  awaken_mats_magic_low: number;
  awaken_mats_magic_mid: number;
  awaken_mats_magic_high: number;
  source: MonsterSource[];
  fusion_food: boolean;
  guide: Guide | null;
  homunculus: boolean;
  craft_cost: number | null;
  craft_materials: MonsterCraftRequirement[];
}

export interface MonsterSource {
  id: number;
  url: string;
  name: string;
  description: string;
  farmable_source: boolean;
}

export interface Guide {
  id: number;
  short_text: string;
  long_text: string;
  last_updated: Date;
}

export interface MonsterCraftRequirement {
  quantity: number;
  material: CraftMaterial;
}

export interface CraftMaterial {
  id: number;
  url: string;
  name: string;
  icon_filename: string;
}
